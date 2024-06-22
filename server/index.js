// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');  // cors 모듈 추가

const app = express();
const port = 5000;

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: '10cb'
});

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

// 로그인 API 엔드포인트
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  // MySQL 쿼리 실행
  const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
  connection.query(sql, [name, password], (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).json({ message: '서버 오류' });
      return;
    }

    if (results.length > 0) {
      // 사용자 정보가 일치하는 경우
      res.json({ success: true, message: '로그인 성공' });
    } else {
      // 사용자 정보가 일치하지 않는 경우
      res.status(401).json({ success: false, message: '이름 또는 비밀번호가 일치하지 않습니다' });
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`);
});
