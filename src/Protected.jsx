import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./useAuth";

const Protected = ({ element, option }) => {
  const { isLoggedIn } = useAuth();

  // 토큰이 들어온 후에 비교해야 하므로, isLoggedIn이 true이고 option이 false인 경우에는 /dashboard로 리다이렉트
  if (isLoggedIn && !option) {
    return <Navigate to="/dashboard" />;
  }
  // 토큰이 들어온 후에 비교해야 하므로, isLoggedIn이 false이고 option이 true인 경우에는 /login으로 리다이렉트
  if (!isLoggedIn && option) {
    return <Navigate to="/login" />;
  }

  // 그 외의 경우에는 원래의 element를 반환
  return element;
};

export default Protected;