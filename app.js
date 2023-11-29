const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(logger('dev')); // Ведения журналов для регистрации HTTP-запросов на консоли.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Промежуточное программное обеспечение для анализа файлов cookie.

app.use('/uploads', express.static("uploads"));

app.use('/api/user', require("./routes/users"));
app.use('/api/posts', require("./routes/posts"));
app.use('/api/tags', require("./routes/tags"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});