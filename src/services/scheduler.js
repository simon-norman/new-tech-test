const cron = require('node-cron');

class Scheduler {
  constructor(customerDbService) {
    this.customerDbService = customerDbService;
  }

  scheduleSortTransactions() {
    console.log('ABOUT TO SCHEDULE');
    cron.schedule('0 1 * * wed', () => {
      this.customerDbService.sortRecentTransactions();
    }, {
      scheduled: true,
      timezone: 'Europe/London'
    });
  }
}

const createScheduler = (customerDbService) => new Scheduler(customerDbService);

module.exports = createScheduler;