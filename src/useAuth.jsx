import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("isLoggedIn");
      if (token) {
        // 토큰이 있으면 로그인 상태로 판단
        setIsLoggedIn(true);
      } else {
        // 토큰이 없으면 로그아웃 상태로 판단
        setIsLoggedIn(false);
      }
    }, []);

  return {
    isLoggedIn,
    setIsLoggedIn,
  };
}