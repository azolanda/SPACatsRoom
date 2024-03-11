const express = require('express');
const app = express();

let data, searchValue, searchData;

app.use(express.static('./'));
app.use(express.json());

const mysql = require('mysql');
const dbConfig = require("./config/db.config.js");

const con = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

con.query("SELECT * FROM sql6682960.about_cats",
  function (err, results, fields) {
    data = results;
  });

app.get('/info/:dynamic', (req, res) => {
  const {
    dynamic
  } = req.params;
  const {
    key
  } = req.query;

  res.status(200).json({
    info: data
  });
});

// ====================FOR SEARCH=========================
// POST
const getDataFromDB = (searchValueStr) => {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM sql6682960.about_cats WHERE `name` LIKE ? OR `about` LIKE ?", [`%${searchValueStr}%`, `%${searchValueStr}%`],
      function (err, results, fields) {
        searchData = results;
        resolve(results);
      });
  })
}

app.post('/', (req, res) => {
  searchValue = req.body.searchValue;

  if (!searchValue) {
    return res.status(400).send({
      status: 'failed'
    });
  }

  res.status(200).send({
    status: 'received'
  });
});

app.get('/search/:dynamic', (req, res) => {
  const {
    dynamic
  } = req.params;
  const {
    key
  } = req.query;

  getDataFromDB(searchValue).then((result) => {
    searchData = result;

    res.status(200).json({
      info: result
    });
  });
});

// ====================SEND MAIL POST=========================
const multer = require('multer');
const upload = multer();

let formDataFields = null;

app.post('/sendmail', upload.none(), (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: 'failed'
    });
  }

  const {
    name,
    email,
    comments,
    check,
    company_field
  } = req.body;

  if (company_field.length > 0) {
    return res.status(400).send({
      message: 'failed'
    });
  }

  formDataFields = {
    'name': name,
    'email': email,
    'comments': comments,
    'check': check,
  }

  sendEmail()
    .then(result => {
      return res.status(200).send({
        message: 'received'
      });
    })
    .catch(err => {
      console.error;
      return res.status(400).send({
        message: 'failed'
      });
    });
});

// ====================SEND MAIL FUNCTION=========================
const nodemailer = require('nodemailer');
const mailConfig = require("./config/mail.config.js");

async function sendEmail() {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: mailConfig.HOST,
    service: mailConfig.SERVICE,
    port: mailConfig.PORT,
    secure: true, // enforcing secure transfer
    auth: {
      user: mailConfig.USER,
      pass: mailConfig.PASSWORD,
    }
  });

  // Set up email data
  let mailOptions = {
    from: mailConfig.USER,
    to: mailConfig.RECEIVER,
    subject: 'сообщение из приложения CatsRoom',
    text: `Имя пользователя: ${formDataFields.name} \ne-mail: ${formDataFields.email} \nКомментарий: ${formDataFields.comments} \nСогласие на обработку персональных данных: ${formDataFields.check}`
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

app.get('/sendmail', (req, res) => {
  res.send('Sending mail..')
});
// =============================================

const port = process.env.PORT || 8383;
const server = app.listen(port, () => console.log(`Server has started on port: ${port}`));

// listen for INT signal e.g. Ctrl-C
// обрабатываем сигнал прерывания (Ctrl+C) с терминала
process.on('SIGINT', () => {
  server.close(() => {
    con.end(); // завершаем подключение к БД
    console.log("Server has stopped")
  });
});

//exit event 
process.on('exit', () => {
  server.close(() => {
    con.end(); // завершаем подключение к БД
    console.log("Server has stopped")
  });
});