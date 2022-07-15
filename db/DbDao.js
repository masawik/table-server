import sqlite3 from 'sqlite3';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const DATABASE_PATH = `${dirname(fileURLToPath(import.meta.url))}/sample.db`;
console.log(DATABASE_PATH);

//todo вынести обработку ошибок
//todo проблема с путями к файлу бд
class DbDao {
  constructor(dbFilePath = DATABASE_PATH) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) console.log('Could not connect to database', err);
      else console.log('Connected to database');
    });
  }

  run(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function(err) {
        if (err) {
          console.log('Error running query ' + query);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  runMany(queries) {
    queries.forEach(async (query) => {
      await this.run(query);
    });
  }

  all(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          console.log('Error running query: ' + query);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default DbDao;

