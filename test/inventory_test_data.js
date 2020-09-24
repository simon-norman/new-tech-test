const inventoryTestData = [
  {
    item: 'oyster',
    details: {
      price: '5453.37',
      amount: 57,
      last_purchased: '08/22/2016',
      color: 'Maroon',
      color_hex: '#12c'
    },
    supplier_details: {
      country: 'Grenada',
      country_code: 'GD',
      currency: 'XCD',
      contact: {
        phone: '864-800-0466',
        email: 'mbrunton0@chronoengine.com'
      }
    }
  },
  {
    item: 'sword',
    details: {
      price: '5402.03',
      amount: 86,
      last_purchased: '11/14/2012',
      color: 'Red',
      color_hex: '#55c'
    },
    supplier_details: {
      country: 'Latvia',
      country_code: 'LV',
      currency: 'E',
      contact: {
        phone: '306-989-1673',
        email: 'mrapps1@go.com'
      }
    }
  },
  {
    item: 'inkjet_printer_fluid',
    details: {
      price: '8636.89',
      amount: 72,
      last_purchased: '10/27/2013',
      color: 'Yellow',
      color_hex: '#6f5'
    },
    supplier_details: {
      country: 'Mauritius',
      country_code: 'MU',
      currency: 'Rupee',
      contact: {
        phone: '702-131-1947',
        email: 'sledbury2@mapy.cz'
      }
    }
  },
  {
    item: 'laser',
    details: {
      price: '9346.09',
      amount: 77,
      last_purchased: '05/25/2015',
      color: 'Crimson',
      color_hex: '#8ab'
    },
    supplier_details: {
      country: 'Finland',
      country_code: 'FI',
      currency: 'EUR',
      contact: {
        phone: '853-210-6448',
        email: 'dleathlay3@symantec.com'
      }
    }
  },
  {
    item: 'watermelon',
    details: {
      price: '2720.92',
      amount: 48,
      last_purchased: '08/22/2019',
      color: 'Purple',
      color_hex: '#7f0'
    },
    supplier_details: {
      country: 'Afghanistan',
      country_code: 'AF',
      currency: 'AFA',
      contact: {
        phone: '175-984-2586',
        email: 'rjakaway4@geocities.jp'
      }
    }
  },
  {
    item: 'dolphin',
    details: {
      price: '8682.89',
      amount: 67,
      last_purchased: '05/24/2019',
      color: 'Red',
      color_hex: '#a75'
    },
    supplier_details: {
      country: 'Mongolia',
      country_code: 'MN',
      currency: 'MNT',
      contact: {
        phone: '415-823-6977',
        email: 'gstpaul5@amazon.co.jp'
      }
    }
  },
  {
    item: 'cocaine',
    details: {
      price: '3324.80',
      amount: 91,
      last_purchased: '01/12/2015',
      color: 'Blue',
      color_hex: '#ad8'
    },
    supplier_details: {
      country: 'China',
      country_code: 'CN',
      currency: 'CNY',
      contact: {
        phone: '450-542-5087',
        email: 'plyne6@ustream.tv'
      }
    }
  },
  {
    item: 'caviar',
    details: {
      price: '2212.55',
      amount: 11,
      last_purchased: '08/19/2010',
      color: 'Crimson',
      color_hex: '#c3c'
    },
    supplier_details: {
      country: 'China',
      country_code: 'CN',
      currency: 'CNY',
      contact: {
        phone: '599-732-1043',
        email: 'mcurtoys7@mozilla.org'
      }
    }
  },
  {
    item: 'soup',
    details: {
      price: '6569.21',
      amount: 33,
      last_purchased: '09/21/2015',
      color: 'Goldenrod',
      color_hex: '#cc2'
    },
    supplier_details: {
      country: 'China',
      country_code: 'CN',
      currency: 'CNY',
      contact: {
        phone: '611-863-2201',
        email: 'lmacgeaney8@berkeley.edu'
      }
    }
  },
  {
    item: 'longboard',
    details: {
      price: '3233.35',
      amount: 92,
      last_purchased: '03/04/2013',
      color: 'Crimson',
      color_hex: '#c66'
    },
    supplier_details: {
      country: 'Thailand',
      country_code: 'TH',
      currency: 'THB',
      contact: {
        phone: '463-725-6750',
        email: 'pbeggan9@microsoft.com'
      }
    }
  },
  {
    item: 'helicopter',
    details: {
      price: '4156.08',
      amount: 27,
      last_purchased: '04/22/2014',
      color: 'Maroon',
      color_hex: '#08c'
    },
    supplier_details: {
      country: 'Iran',
      country_code: 'IR',
      currency: 'IRR',
      contact: {
        phone: '575-892-4814',
        email: 'aabbea@nydailynews.com'
      }
    }
  },
  {
    item: 'labrador',
    details: {
      price: '4876.08',
      amount: 41,
      last_purchased: '08/06/2011',
      color: 'Khaki',
      color_hex: '#6be'
    },
    supplier_details: {
      country: 'China',
      country_code: 'CN',
      currency: 'CNY',
      contact: {
        phone: '372-262-6080',
        email: 'drodgerb@wikimedia.org'
      }
    }
  },
  {
    item: 'AK47',
    details: {
      price: '6598.81',
      amount: 24,
      last_purchased: '05/15/2017',
      color: 'Goldenrod',
      color_hex: '#516'
    },
    supplier_details: {
      country: 'Russia',
      country_code: 'RU',
      currency: 'RUB',
      contact: {
        phone: '769-843-5035',
        email: 'rzavattieroc@pagesperso-orange.fr'
      }
    }
  },
  {
    item: 'truffles',
    details: {
      price: '4502.10',
      amount: 4,
      last_purchased: '12/23/2014',
      color: 'Yellow',
      color_hex: '#586'
    },
    supplier_details: {
      country: 'Philippines',
      country_code: 'PH',
      currency: 'PHP',
      contact: {
        phone: '300-862-2237',
        email: 'crobertuccid@prnewswire.com'
      }
    }
  },
  {
    item: 'grenade',
    details: {
      price: '7071.83',
      amount: 98,
      last_purchased: '07/02/2016',
      color: 'Green',
      color_hex: '#a2d'
    },
    supplier_details: {
      country: 'China',
      country_code: 'CN',
      currency: 'CNY',
      contact: {
        phone: '857-201-6705',
        email: 'hbraccoe@ed.gov'
      }
    }
  },
  {
    item: 'toilet_paper',
    details: {
      price: '7029.01',
      amount: 31,
      last_purchased: '01/09/2017',
      color: 'Maroon',
      color_hex: '#b12'
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
  },
  {
    item: 'ivory',
    details: {
      price: '5705.85',
      amount: 39,
      last_purchased: '09/03/2018',
      color: 'Green',
      color_hex: '#302'
    },
    supplier_details: {
      country: 'Malaysia',
      country_code: 'MY',
      currency: 'RM',
      contact: {
        phone: '304-956-6680',
        email: 'tnuthg@blogs.com'
      }
    }
  },
  {
    item: 'bubblegum',
    details: {
      price: '3615.10',
      amount: 23,
      last_purchased: '08/23/2011',
      color: 'Mauv',
      color_hex: '#620'
    },
    supplier_details: {
      country: 'China',
      country_code: 'CN',
      currency: 'CNY',
      contact: {
        phone: '776-422-5321',
        email: 'ddewdneyh@nih.gov'
      }
    }
  },
  {
    item: 'iPhone',
    details: {
      price: '3114.42',
      amount: 69,
      last_purchased: '09/16/2015',
      color: 'Blue',
      color_hex: '#e49'
    },
    supplier_details: {
      country: 'Colombia',
      country_code: 'CO',
      currency: 'COP',
      contact: {
        phone: '875-859-3453',
        email: 'mshemilti@sina.com.cn'
      }
    }
  },
  {
    item: 'testIphone',
    details: {
      price: null,
      amount: 69,
      last_purchased: '09/16/2015',
      color: 'Blue',
      color_hex: '#e49'
    },
    supplier_details: {
      country: 'Colombia',
      country_code: 'CO',
      currency: 'COP',
      contact: {
        phone: '875-859-3453',
        email: 'mshemilti@sina.com.cn'
      }
    }
  },
  {
    item: 'whale',
    details: {
      price: '19.64',
      amount: 80,
      last_purchased: '11/23/2014',
      color: 'Puce',
      color_hex: '#d63'
    },
    supplier_details: {
      country: 'Taiwan',
      country_code: 'TW',
      currency: 'TWD',
      contact: {
        phone: '300-638-6158',
        email: 'adelortj@cbc.ca'
      }
    }
  }
];

module.exports = inventoryTestData;