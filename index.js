const express = require('express');
const path = require('path');
const tableItemsRouter = require('./routes/tableItems.js');

const PORT = process.env.PORT || 3010;

const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use(tableItemsRouter);

app.listen(PORT, () => {
  console.log(`server successfully started on port ${PORT}...`);
});