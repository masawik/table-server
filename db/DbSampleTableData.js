const tableColumnsMap = {
  id: 'id',
  date: 'date',
  name: 'name',
  count: 'count',
  distance: 'distance',
};

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

  select(queryParams) {
    const { limit, offset, sortBy, sortDesc } = queryParams;
    const sortDirection = sortDesc ? 'DESC' : 'ASC';
    const orderBy = tableColumnsMap[sortBy] ?? 'ROWID';

    const query = `
      SELECT *
      from sampleTableData
      order by ${orderBy} ${sortDirection}
      limit ?, ?
    `;

    return this.dao.all(query, [offset, limit]);
  }

  getCountOfPagesByQueryParams(queryParams) {
    const { limit } = queryParams;

    const query = `
    SELECT count('ROWID') / ? as 'pages'
    from sampleTableData
    order by count ASC
    `;

    return this.dao.get(query, [limit]);
  }
}

module.exports = DbSampleTableData