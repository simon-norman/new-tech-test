const request = require('supertest');
const createApp = require('../src/create_app');
const Database = require('./../src/data/database');
const testCustomerData = require('./customer_test_data');

describe('Given that there are two customers in the database', () => {
  test('returns both customers when called', async () => {
    const unwrap = ({ first_name, last_name, email }) => ({ first_name, last_name, email});
    const expectedData = testCustomerData.map(unwrap);

    const customerDbService = new Database('/fake-path');
    jest.spyOn(customerDbService, 'load').mockImplementation(async () => testCustomerData);

    const app = createApp(customerDbService);

    const { body } = await request(app)
      .get('/customers');
    expect(body.length).toBe(2);
    expect(body).toEqual(expectedData);
  });
});