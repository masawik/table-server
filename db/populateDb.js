import randomWords from 'random-words';

import DbDao from './DbDao.js';
import DbSampleTableData from './DbSampleTableData.js';
import { randInt } from '../helpers/randInt.js';

const populateDb = async (count) => {
  const dao = new DbDao();
  const std = new DbSampleTableData(dao);
  await std.initTable();
  for (let i = 0; i < count; i++) {
    const randomDate = new Date((randInt(15000, 16579) * (10 ** 8)));
    const randomName = randomWords(3).join(' ');
    const randomCount = randInt(0, 1000);
    const randomDistance = randInt(0, 10000);

    await std.create(randomDate, randomName, randomCount, randomDistance);
  }
  dao.db.close();
};

populateDb(450);