const express = require('express');
const tableItemsRouter = require('./routes/tableItems.js');

const PORT = process.env.PORT ?? 3010;

const app = express();

app.use(tableItemsRouter);

app.listen(PORT, () => {
  console.log(`server successfully started on port ${PORT}...`);
});