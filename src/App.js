import Login from "./login/Login"
import { Dashboard } from "./dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Protected from "./Protected";

function App() {

  const LoginRoutes = [
    { path: "/dashboard", component: <Dashboard /> },
  ];

  const LogoutRoutes = [
    { path: "/login", component: <Login /> },
  ];


  return (
    <BrowserRouter>
      <Routes>
        {LogoutRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={<Protected element={component} option={false} />}
          />
        ))}
        {LoginRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={<Protected element={component} option={true} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
