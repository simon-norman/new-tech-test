const testCustomerData = [
  {
    id: 1,
    first_name: 'Jon',
    last_name: 'Doe',
    address: {
      country: 'UK',
      city: 'London',
      street: {
        street_name: 'Fake',
        street_suffix: 'Road',
        street_number: '7319'
      },
      coordinates: {
        longitude: 113.767529,
        latitude: 26.207631
      }
    },
    email: 'stephen@liveinternet.ru',
    gender: 'Male',
    uid: 'a00c9ddd-c983-4580-9385-5997243f15fd',
    last_transactions: [
      {
        date: '11/15/2016',
        amount: '4393.01'
      },
      {
        date: '10/29/2012',
        amount: '8647.28'
      },
      {
        date: '10/29/2014',
        amount: '8647.28'
      },
    ]
  },
  {
    id: 2,
    first_name: 'Lucy',
    last_name: 'Thompson',
    address: {
      country: 'UK',
      city: 'Newcastle',
      street: {
        street_name: 'New Road',
      },
      coordinates: {
        longitude: 101.5326734,
        latitude: 3.0100681
      }
    },
    email: 'lucy@mtv.com',
    gender: 'Female',
    uid: '853f9ca8-fd64-45a1-8c5a-b5a7765dabab',
    last_transactions: [
      {
        date: '07/29/2015',
        amount: '7653.97'
      },
      {
        date: '05/13/2017',
        amount: '3460.26'
      }
    ]
  },
  {
    id: 4,
    first_name: 'Virgilio',
    last_name: 'Domelow',
    address: {
      country: 'Colombia',
      city: 'Río Viejo',
      street: {
        street_name: 'Golf',
        street_suffix: 'Hill',
        street_number: '813'
      },
      coordinates: {
        longitude: -73.840258,
        latitude: 8.588397
      }
    },
    email: 'vdomelowa@java.com',
    gender: 'Male',
    uid: 'ccbc1d52-c1df-4cdf-927a-a6d29fb07101',
    last_transactions: [
      {
        date: '06/18/2018',
        amount: '8357.49'
      },
      {
        date: '06/01/2016',
        amount: '1796.02'
      },
      {
        date: '09/13/2015',
        amount: '2705.31'
      },
      {
        date: '01/10/2014',
        amount: '121.21'
      },
      {
        date: '09/10/2010',
        amount: '5663.74'
      }
    ]
  }
];

module.exports = testCustomerData;