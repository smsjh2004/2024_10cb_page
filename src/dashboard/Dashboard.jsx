// Dashboard.jsx

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
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
      Human: 600,
      Elf: 200,
      Dwarf: 100,
      Orc: 50,
      Undead: 50
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
            '#20B2AA',     // 에매랄드색
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


//   // Data for pie chart (people by race)
//   const raceData = {
//     labels: Object.keys(mockData.peopleByRace),
//     datasets: [
//       {
//         data: Object.values(mockData.peopleByRace),
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
//       }
//     ]
//   };

//   // Data for bar chart (most played maps)
//   const mapsData = {
//     labels: mockData.mostPlayedMaps,
//     datasets: [
//       {
//         label: '플레이 횟수',
//         backgroundColor: '#36A2EB',
//         borderColor: '#36A2EB',
//         borderWidth: 1,
//         hoverBackgroundColor: '#36A2EB',
//         hoverBorderColor: '#36A2EB',
//         data: mockData.mostPlayedMapsData
//       }
//     ]
//   };

  return (
    <Container className="mt-4">
      <h2>대시보드</h2>
      <Row className="mt-4">
        {/* Total People */}
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>총 인원</Card.Title>
              <h3>{mockData[0].totalPeople}</h3>
            </Card.Body>
          </Card>
        </Col>

        {/* People by Tier */}
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>티어별 인원</Card.Title>
              <Doughnut data={tierData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
