const request = require('supertest');
const createApp = require('../src/create_app');
const createCustomerDbService = require('../src/data/customer_db_service');
const createProductDbService = require('../src/data/product_db_service');
const testCustomerData = require('./customer_test_data');
const testInventoryData = require('./inventory_test_data');
const dateTime = require('luxon');
const createCustomerRequestsDbService = require('../src/data/customer_requests_db_service');

jest.mock('../src/services/authentication.js', () => (request, response, next) => {
  next();
});

const mockDate = '10/12/2019';
jest.mock('luxon');
dateTime.DateTime.utc.mockImplementation(() => mockDate);

describe('Customer orders', () => {
  let customerDbService;
  let customerWriteSpy;
  let productDbService;
  let productWriteSpy;
  let customerRequestsService;
  let requestWriteSpy;

  beforeEach(() => {
    customerDbService = createCustomerDbService('/fake-path');
    jest.spyOn(customerDbService, 'read').mockImplementation(async () => testCustomerData);
    customerWriteSpy = jest.spyOn(customerDbService, 'write').mockImplementation(async () => {});

    productDbService = createProductDbService('/fake-path');
    jest.spyOn(productDbService, 'read').mockImplementation(async () => testInventoryData);
    productWriteSpy = jest.spyOn(productDbService, 'write').mockImplementation(async () => {});

    customerRequestsService = createCustomerRequestsDbService('/fake-path');
    jest.spyOn(customerRequestsService, 'read').mockImplementation(async () => []);
    requestWriteSpy = jest.spyOn(customerRequestsService, 'write').mockImplementation(async () => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('When customer 4 purchases 12 dolphins and 4 truffles', () => {
    let dolphin;
    let truffles;

    beforeEach(async () => {
      const orders = [
        { item: 'dolphin', amount: 12 },
        { item: 'truffles', amount: 4 },
      ];

      const app = createApp({ customerDbService, productDbService, customerRequestsService });

      await request(app)
        .post('/customers/4/orders')
        .send(orders);
    });
    
    test('updates last transaction of the customer', async () => {
      const dolphin = testInventoryData.find((product) => product.item === 'dolphin');
      const truffles = testInventoryData.find((product) => product.item === 'truffles');
      const expectedTotal = (12 * dolphin.details.price) + (4 * truffles.details.price);
      const customerId = 4;
      
      const dataPassedToDb = customerWriteSpy.mock.calls[0][0];
      const updatedCustomer = dataPassedToDb.find((customer) => customer.id === customerId);
      expect(updatedCustomer.last_transactions[0]).toEqual({ amount: expectedTotal, date: mockDate });
    });

    test('updates last ordered date of those products', async () => {
      const dataPassedToDb = productWriteSpy.mock.calls[0][0];
      const relevantProducts = dataPassedToDb.filter((product) => product.item === 'dolphin' || product.item === 'truffles');
      relevantProducts.map((product) => {
        expect(product.details.last_purchased).toBe(mockDate);
      });
    });

    test('inserts new customer request into DB', async () => {
      const dataPassedToDb = requestWriteSpy.mock.calls[0][0];
      expect(dataPassedToDb[0]).toEqual({
        date: mockDate,
        customer_first_name: 'Virgilio',
        customer_last_name: 'Domelow',
        customer_id: 4,
      });
    });
  });

  describe('When customer 1 purchases 1 helicopter, 5 AK47s and 3 cocaines', () => {
    let orders; 

    beforeEach(async () => {
      orders = [
        { item: 'helicopter', amount: 1 },
        { item: 'cocaine', amount: 3 },
        { item: 'AK47', amount: 3 }
      ];

      const app = createApp({ customerDbService, productDbService, customerRequestsService });

      await request(app)
        .post('/customers/1/orders')
        .send(orders);
    });
    
    test('updates last transaction of the customer', async () => {
      const cocaine = testInventoryData.find((product) => product.item === 'cocaine');
      const ak47 = testInventoryData.find((product) => product.item === 'AK47');
      const helicopter = testInventoryData.find((product) => product.item === 'helicopter');
      const expectedTotal = (3 * cocaine.details.price) + (1 * helicopter.details.price) + (3 * ak47.details.price);
      const customerId = 1;
      
      const dataPassedToDb = customerWriteSpy.mock.calls[0][0];
      const updatedCustomer = dataPassedToDb.find((customer) => customer.id === customerId);
      expect(updatedCustomer.last_transactions[0]).toEqual({ amount: expectedTotal, date: mockDate });
    });

    test('updates last ordered date of those products', async () => {
      const dataPassedToDb = productWriteSpy.mock.calls[0][0];
      const productNames = orders.map((order) => order.item);
      const relevantProducts = dataPassedToDb.filter((product) => productNames.includes(product.item));
      relevantProducts.map((product) => {
        expect(product.details.last_purchased).toBe(mockDate);
      });
    });

    test('inserts new customer request into DB', async () => {
      const dataPassedToDb = requestWriteSpy.mock.calls[0][0];
      expect(dataPassedToDb[0]).toEqual({
        date: mockDate,
        customer_first_name: 'Jon',
        customer_last_name: 'Doe',
        customer_id: 1,
      });
    });
  });
});