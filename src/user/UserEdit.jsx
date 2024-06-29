// src/components/UserEdit.js
import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import RaceSelector from './RaceSelector';
import { fetchEditUser, updateUser } from '../api/Api';

const UserEdit = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await fetchEditUser(userId);
                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        loadUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(userId, user);
            navigate('/users');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleRaceChange = (selectedRace, selectorNumber) => {
        switch (selectorNumber) {
            case 1:
                setUser({ ...user, race: selectedRace, second_race: '', third_race: '' });
                break;
            case 2:
                setUser({ ...user, second_race: selectedRace, third_race: '' });
                break;
            case 3:
                setUser({ ...user, third_race: selectedRace });
                break;
            default:
                break;
        }
    };

    const handleReset = () => {
        setUser({ ...user, race: '', second_race: '', third_race: '' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container className="mt-5">
            <h2 className="text-center">사용자 수정</h2>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        name="name"
                        value={user.name || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        name="password"
                        value={user.password || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicRole">
                    <Form.Label>역할</Form.Label>
                    <Form.Control as="select" name="role" value={user.role || ''} onChange={handleChange}>
                        <option value="admin">관리자</option>
                        <option value="user">사용자</option>
                        <option value="guest">게스트</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicTier">
                    <Form.Label>티어</Form.Label>
                    <Form.Control as="select" name="tier" value={user.tier || ''} onChange={handleChange}>
                        <option value="">선택하세요</option>
                        <option value="챌린저">챌린저</option>
                        <option value="그마">그랜드마스터</option>
                        <option value="마스터">마스터</option>
                        <option value="다이아">다이아몬드</option>
                        <option value="플레">플래티넘</option>
                        <option value="골드">골드</option>
                        <option value="실버">실버</option>
                        <option value="브론즈">브론즈</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="race">
                    <Form.Label>주종</Form.Label>
                    <RaceSelector
                        selectedRace={user.race}
                        onSelectRace={(selected) => handleRaceChange(selected, 1)}
                        excludeRaces={[user.second_race, user.third_race]}
                        disabled={false}
                    />
                </Form.Group>

                <Form.Group controlId="secondRace">
                    <Form.Label>부종</Form.Label>
                    <RaceSelector
                        selectedRace={user.second_race}
                        onSelectRace={(selected) => handleRaceChange(selected, 2)}
                        excludeRaces={[user.race, user.third_race]}
                        disabled={!user.race}
                    />
                </Form.Group>

                <Form.Group controlId="thirdRace">
                    <Form.Label>부부종</Form.Label>
                    <RaceSelector
                        selectedRace={user.third_race}
                        onSelectRace={(selected) => handleRaceChange(selected, 3)}
                        excludeRaces={[user.race, user.second_race]}
                        disabled={!user.race || !user.second_race}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    수정
                </Button>

                <Button variant="secondary" onClick={handleReset}>
                    초기화
                </Button>
            </Form>
        </Container>
    );
};

export default UserEdit;
