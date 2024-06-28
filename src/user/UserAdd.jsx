import React, { useState } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RaceSelector from './RaceSelector';

const UserAdd = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [tier, setTier] = useState('');
    const [race, setRace] = useState('');
    const [secondRace, setSecondRace] = useState('');
    const [thirdRace, setThirdRace] = useState('');
    const navigate = useNavigate();

    const handleRaceChange = (selectedRace, selectorNumber) => {
        switch (selectorNumber) {
          case 1:
            if (race !== selectedRace) {
              setRace(selectedRace);
              setSecondRace('');
              setThirdRace('');
            }
            break;
          case 2:
            if (secondRace !== selectedRace) {
              setSecondRace(selectedRace);
              setThirdRace('');
            }
            break;
          case 3:
            if (thirdRace !== selectedRace) {
              setThirdRace(selectedRace);
            }
            break;
          default:
            break;
        }
      };

      const handleReset = () => {
        setRace('');
        setSecondRace('');
        setThirdRace('');
      };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/users', {
                name,
                password,
                role,
                tier,
                race,
                second_race: secondRace,
                third_race: thirdRace
            });
            navigate('/users');
        } catch (error) {
            console.error('사용자 추가 오류:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">사용자 추가</h2>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicRole">
                    <Form.Label>역할</Form.Label>
                    <Form.Control as="select" value={role} onChange={handleRoleChange}>
                        <option value="admin">관리자</option>
                        <option value="user">사용자</option>
                        <option value="guest">게스트</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicTier">
                    <Form.Label>티어</Form.Label>
                    <Form.Control as="select" value={tier} onChange={(e) => setTier(e.target.value)}>
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
                        selectedRace={race}
                        onSelectRace={(selected) => handleRaceChange(selected, 1)}
                        excludeRaces={[secondRace, thirdRace]}
                        disabled={false}
                    />
                </Form.Group>

                <Form.Group controlId="secondRace">
                    <Form.Label>부종</Form.Label>
                    <RaceSelector
                        selectedRace={secondRace}
                        onSelectRace={(selected) => handleRaceChange(selected, 2)}
                        excludeRaces={[race, thirdRace]}
                        disabled={!race}
                    />
                </Form.Group>

                <Form.Group controlId="thirdRace">
                    <Form.Label>부부종</Form.Label>
                    <RaceSelector
                        selectedRace={thirdRace}
                        onSelectRace={(selected) => handleRaceChange(selected, 3)}
                        excludeRaces={[race, secondRace]}
                        disabled={!race || !secondRace}
                    />
                </Form.Group>


                <Button variant="primary" type="submit">
                    추가
                </Button>

                <Button variant="secondary" onClick={handleReset}>
          초기화
        </Button>
            </Form>
        </Container>
    );
};

export default UserAdd;
