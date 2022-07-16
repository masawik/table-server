import DbSampleTableData from '../db/DbSampleTableData.js';
import DbDao from '../db/DbDao.js';

const DEFAULT_ROWS_PER_PAGE = 20;
const MAX_ROWS_PER_PAGE = 40;

const dao = new DbDao();
const sampleTableData = new DbSampleTableData(dao);

//todo при пагинации с фильтрами использовать метод передачи последнего значения вместо страницы

export const getAll = async (req, res) => {
  const clientPerPage = req.query['per_page'] ?? DEFAULT_ROWS_PER_PAGE;
  const perPage = Math.min(clientPerPage, MAX_ROWS_PER_PAGE);

  const page = (req.query['page'] ?? 0) * perPage;
  const sortBy = req.query['sort_key'];

  const sortDescNumber = Number(req.query['sort_desc']);
  const sortDesc = Boolean(isNaN(sortDescNumber) ? 0 : sortDescNumber);

  const queryParams = { limit: perPage, offset: page, sortBy, sortDesc };

  const resultData =
    await sampleTableData.select(queryParams);
  const totalCountOfPages =
    await sampleTableData.getCountOfPagesByQueryParams(queryParams);

  const result = {
    data: resultData,
    //todo возможно, убирать пустую последнюю страницу нужно в другом месте
    totalPages: totalCountOfPages['pages'] - 1,
  };

  res.status(200).json(result);
};