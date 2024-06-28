// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');  // cors 모듈 추가
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const port = 5000;

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: '10cb'
});


// MySQLStore 설정
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000, // 세션 만료 확인 주기 (ms) - 기본값: 900000 (15분)
  expiration: 86400000, // 세션 만료 시간 (ms) - 기본값: 86400000 (1일)
  createDatabaseTable: true, // 세션 테이블 자동 생성 여부
  schema: {
      tableName: 'sessions', // 세션 테이블 이름
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }
}, connection); // MySQL 연결 객체 전달

module.exports = sessionStore;

app.use(session({
    secret: '10cb10cb10cb',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 세션 유효 기간 설정 (예: 1일)
        httpOnly: true, // 클라이언트에서 쿠키 접근 제한
        secure: false, // HTTPS가 아닌 환경에서도 사용할 수 있도록 설정
        sameSite: 'strict' // CSRF 공격 방지를 위한 SameSite 설정
    }
}));

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ', err);
  } else {
    console.log('MySQL 데이터베이스 연결 성공');
  }
});

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`);
});


// 로그인
app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
  connection.query(query, [name, password], (err, results) => {
      if (err) {
          console.error('Error executing login query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length > 0) {
          // 사용자가 존재하면 세션에 사용자 정보 저장
          req.session.user = results[0];
          return res.status(200).json({ message: 'Login successful' });
      } else {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
  });
});








// 사용자 추가
app.post('/users', (req, res) => {
  const { name, password, role, tier, race, second_race, third_race } = req.body;
  const query = `INSERT INTO users (name, password, invitedAt, role, tier, race, second_race, third_race) 
                 VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)`;
  connection.query(query, [name, password, role, tier, race, second_race, third_race], (err, results) => {
      if (err) {
          console.error('Error inserting user:', err);
          res.status(500).send('Error inserting user');
      } else {
          res.status(201).send(`User added with ID: ${results.insertId}`);
      }
  });
});

// 사용자 조회
app.get('/users', (req, res) => {
  const query = 'SELECT id, name, invitedAt, role, tier, race, second_race, third_race FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
    } else {
      res.status(200).json(results);
    }
  });
});

// 사용자 상세 조회
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, name, invitedAt, role, tier, race, second_race, third_race FROM users WHERE id = ?';
  connection.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          res.status(500).send('Error fetching user');
      } else if (results.length === 0) {
          res.status(404).send('User not found');
      } else {
          res.status(200).json(results[0]);
      }
  });
});
