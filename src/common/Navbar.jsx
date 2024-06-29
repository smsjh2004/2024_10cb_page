import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('username');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: '#00008B' }}>
      <Navbar.Brand onClick={() => navigate("/dashboard")} style={{ marginLeft: '20px' }}>관리 시스템</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/users")}>인원관리</Nav.Link>
          <Nav.Link href="#competition">대회관리</Nav.Link>
          <Nav.Link href="#records">전적관리</Nav.Link>
          {role === '민성' && <Nav.Link onClick={() => navigate("/users/add")}>인원추가(관리자)</Nav.Link>}
        </Nav>
        <Nav>
          <NavDropdown title={<Image src="" roundedCircle width="30" height="30" />} id="basic-nav-dropdown" align="end">
            <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
