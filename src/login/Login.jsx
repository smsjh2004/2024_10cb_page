// Login.js

import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { name, password });
      navigate('/dashboard');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', name);      
      window.location.reload();
      
      console.log(response.data.message, "test"); // 로그인 성공 또는 실패 메시지 출력
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">로그인</h2>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="이메일을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" >
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
