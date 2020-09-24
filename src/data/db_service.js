const fs = require('fs').promises;
const path = require('path');

class DbService {
  constructor(filename) {
    this.path = path.join(__dirname, filename);
  }

  async read() {
    const file = await fs.readFile(this.path);

    return JSON.parse(file);
  }

  async write(data) {
    const dataAsJson = JSON.stringify(data);
    await fs.writeFile(this.path, dataAsJson);
  }

  async findMany() {
    return this.read();
  }

  async updateMany(data) {
    await this.write(data);
  }
}

module.exports = DbService;