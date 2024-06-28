import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
Chart.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
  // Mock data for demonstration
  const mockData = [
    {
      totalPeople: 1000,
      peopleByTier: {
        챌린저: 20,
        그마: 20,
        마스터: 20,
        다이아: 20,
        플레: 20,
        골드: 20,
        실버: 20,
        브론즈: 20,
      },
      peopleByRace: {
        프로토스: 600,
        테란: 200,
        저그: 100,
      },
      mostPlayedMaps: ['Map A', 'Map B', 'Map C', 'Map D', 'Map E'],
      mostPlayedMapsData: [20, 15, 10, 8, 5] // Example data for most played maps
    }
  ];

  // Data for pie chart (people by tier)
  const tierData = {
    labels: Object.keys(mockData[0].peopleByTier), // Extract tier labels
    datasets: [
      {
        data: Object.values(mockData[0].peopleByTier), // Extract tier data
        backgroundColor: [
          '#FFFF00',     // 노란색
          '#8B0000',     // 어두운 빨간색
          '#8A2BE2',     // 자주색
          '#1E90FF',     // 파란색
          '#20B2AA',     // 에메랄드색
          '#FFD700',     // 금색
          '#C0C0C0',     // 은색
          '#B87333'      // 동색
        ],
        hoverBackgroundColor: [
          '#FFFF00',
          '#8B0000',
          '#8A2BE2',
          '#1E90FF',
          '#20B2AA',
          '#FFD700',
          '#C0C0C0',
          '#B87333'
        ],
      }
    ]
  };

  // Data for pie chart (people by race)
  const raceData = {
    labels: Object.keys(mockData[0].peopleByRace),
    datasets: [
      {
        data: Object.values(mockData[0].peopleByRace),
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
      }
    ]
  };

  // Data for bar chart (most played maps)
  const mapsData = {
    labels: mockData[0].mostPlayedMaps,
    datasets: [
      {
        label: '플레이 횟수',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
        data: mockData[0].mostPlayedMapsData
      }
    ]
  };

  return (
    <Container className="mt-4" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h2>대시보드</h2>
      <Row className="mt-4">
        {/* Total People */}
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>총 인원</Card.Title>
              <h3>{mockData[0].totalPeople}</h3>
            </Card.Body>
          </Card>
        </Col>

        {/* People by Tier */}
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>티어별 인원</Card.Title>
              <Doughnut data={tierData} />
            </Card.Body>
          </Card>
        </Col>

        {/* People by Race */}
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>종족별 인원</Card.Title>
              <Doughnut data={raceData} />
            </Card.Body>
          </Card>
        </Col>

        {/* Most Played Maps */}
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>자주하는 맵</Card.Title>
              <Doughnut data={mapsData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
