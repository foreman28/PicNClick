const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

// Добавьте middleware для CORS
app.use(cors());

// Добавьте middleware для логгера
app.use(logger('dev'));

// Добавьте middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Добавьте middleware для анализа файлов cookie
app.use(cookieParser());

// Добавьте middleware для статических файлов (если требуется)
app.use('/uploads', express.static("uploads"));

// Маршруты
app.use('/api/user', require("./routes/users"));
app.use('/api/posts', require("./routes/posts"));
app.use('/api/tags', require("./routes/tags"));
app.use('/api/likes', require("./routes/likes"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});