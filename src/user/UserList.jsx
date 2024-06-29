// src/components/UserList.jsx

import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/Api';
import { Table, Container, Alert, Spinner, Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');

  const navigate = useNavigate();

    useEffect(() => {
      const userRole = localStorage.getItem('userRole');
      if (userRole) {
        setRole(userRole);
      }
    }, []);

    function roleformat(role) {
        if(role === "admin") {
            return "관리자";
        } else if (role === "user") {
            return "사용자";
        } else if (role === "guest") {
            return "게스트";
        } else return "?"
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers();
                console.log(usersData);
                setUsers(usersData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <h1 className="my-4">인원 관리</h1>
            {role === "admin" && <Button variant="primary" className="mb-3" onClick={() => navigate('/users/add')}>Add User</Button>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>닉네임</th>
                        <th>티어</th>
                        <th>주종</th>
                        <th>부종</th>
                        <th>부부종</th>
                        <th>권한</th>
                        <th>가입일자(홈페이지)</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td onClick={()=>navigate(`/users/edit/${user.id}`)}>{user.name}</td>
                            <td>{user.tier}</td>
                            <td>{user.race}</td>
                            <td>{user.second_race}</td>
                            <td>{user.third_race}</td>
                            <td>{roleformat(user.role)}</td>
                            <td>{dayjs(user.invitedAt).format('YYYY-MM-DD')}</td> {/* dayjs로 포맷팅 */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserList;
