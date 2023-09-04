const express = require("express");
const app = express();
const { PORT, connectWithDB } = require("./config/database");

app.listen(PORT, () => {
  console.log(`Server started successfully on ${PORT}`);
  connectWithDB();
});
