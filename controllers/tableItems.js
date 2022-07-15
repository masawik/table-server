import DbSampleTableData from '../db/DbSampleTableData.js';
import DbDao from '../db/DbDao.js';

export const getAll = async (req, res) => {
  const dao = new DbDao();
  const sampleTableData = new DbSampleTableData(dao);

  const perPage = req.query['per_page'] ?? 20;
  const page = (req.query['page'] ?? 0) * perPage;

  const result = await sampleTableData.select(perPage, page)
  res.status(200).json(result);
};