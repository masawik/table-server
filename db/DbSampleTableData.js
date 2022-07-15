class DbSampleTableData {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const query = `CREATE TABLE IF NOT EXISTS 'sampleTableData' (
      'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      'date' DATE NOT NULL,
      'name' TEXT NOT NULL,
      'count' INTEGER NOT NULL,
      'distance' INTEGER NOT NULL);`;

    return this.dao.run(query);
  }

  createIndexes() {
    const queries = [
      'CREATE INDEX IF NOT EXISTS idx_name ON sampleTableData(name);',
      'CREATE INDEX IF NOT EXISTS idx_count ON sampleTableData(count)',
      'CREATE INDEX IF NOT EXISTS idx_distance ON sampleTableData(distance);',
    ];
    return this.dao.runMany(queries);
  }

  async initTable() {
    await this.createTable();
    await this.createIndexes();
  }

  create(date, name, count, distance) {
    return this.dao.run(
      'INSERT INTO sampleTableData (date, name, count, distance) VALUES (?,?,?,?)',
      [date, name, count, distance]);
  }
}

export default DbSampleTableData;