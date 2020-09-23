const fs = require('fs');

class Database {
  constructor(path) {
    this.path = path;
  }

  async load() {
    const file = await fs.readFile(this.path);

    return JSON.parse(file);
  }

  async findAll() {
    return this.load();
  }
}

module.exports = Database;