import express from 'express';
import tableItemsRouter from './routes/tableItems.js';

const PORT = process.env.PORT ?? 3010;

const app = express();

app.use(tableItemsRouter);

app.listen(PORT, () => {
  console.log(`server successfully started on port ${PORT}...`);
});