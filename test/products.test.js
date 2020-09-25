const request = require('supertest');
const createApp = require('../src/create_app');
const createCustomerDbService = require('../src/data/customer/customer_db_service');
const createProductDbService = require('../src/data/product/product_db_service');
const testCustomerData = require('./customer_test_data');
const testInventoryData = require('./inventory_test_data');

jest.mock('../src/services/authentication.js', () => (request, response, next) => {
  next();
});

describe('Given that there are no products in the database', () => {
  let customerDbService;
  let productDbService;
  let productWriteSpy;

  beforeEach(() => {
    customerDbService = createCustomerDbService('/fake-path');
    jest.spyOn(customerDbService, 'read').mockImplementation(async () => testCustomerData);
    
    productDbService = createProductDbService('/fake-path');
    jest.spyOn(productDbService, 'read').mockImplementation(async () => []);
    productWriteSpy = jest.spyOn(productDbService, 'write').mockImplementation(async () => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test('Inserts new product into DB when posted', async () => {
    const newProduct = { 
      item: 'hand_sanitizer',
      details: {
        price: 10.00,
        amount: 500,
        color: 'green',
        color_hex: '#302'
      },
      supplier_details: {
        country: 'Indonesia',
        country_code: 'ID',
        currency: 'IDR',
        contact: {
          phone: '771-667-3249',
          email: 'cchiversf@kickstarter.com'
        }
      }
    };

    const app = createApp({ customerDbService, productDbService });

    const response = await request(app)
      .post('/products')
      .send(newProduct);

    expect(productWriteSpy.mock.calls[0][0]).toEqual([newProduct]);
    expect(response.body).toEqual(newProduct);
  });
});