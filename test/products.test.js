// const request = require('supertest');
// const createApp = require('../src/create_app');
// const createCustomerDbService = require('../src/data/customer_db_service');
// const createProductDbService = require('../src/data/product_db_service');
// const testCustomerData = require('./customer_test_data');

// describe('Given that there is a product in the database', () => {
//   let customerDbService;
//   let productDbService;
//   let writeSpy;

//   beforeEach(() => {
//     customerDbService = createCustomerDbService('/fake-path');
//     productDbService = createProductDbService('/fake-path');
//     jest.spyOn(productDbService, 'read').mockImplementation(async () => testCustomerData);
//     jest.spyOn(productDbService, 'write').mockImplementation(async () => {});
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
  
//   test('returns core details of customers when list customers called', async () => {
//     const extractListCustomerData = ({ first_name, last_name, email }) => ({ first_name, last_name, email});
//     const expectedData = testCustomerData.map(extractListCustomerData);

//     const app = createApp(customerDbService);

//     const { body } = await request(app)
//       .get('/customers');
//     expect(body.length).toBe(2);
//     expect(body).toEqual(expectedData);
//   });

//   test('sorts last transactions by date, most recent first', async () => {
//     await customerDbService.sortRecentTransactions();

//     expect(writeSpy.mock.calls[0][0][0].last_transactions[0].date).toEqual('11/15/2016');
//     expect(writeSpy.mock.calls[0][0][0].last_transactions[2].date).toEqual('10/29/2012');
//     expect(writeSpy.mock.calls[0][0][1].last_transactions[0].date).toEqual('05/13/2017');
//     expect(writeSpy.mock.calls[0][0][1].last_transactions[1].date).toEqual('07/29/2015');
//   });
  
//   test('returns distance between specified customer and specified distance', async () => {
//     const app = createApp(customerDbService);

//     const { body } = await request(app)
//       .get('/customers/1/distance')
//       .query({ location: { latitude: 0.13, longitude: 0.111 }});
//     expect(body).toEqual({ distance: 12360789 })
//   });
// });