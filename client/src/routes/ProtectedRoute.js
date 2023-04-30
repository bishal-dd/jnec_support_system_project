import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user }, props) {
  const navigate = useNavigate();

  console.log(user);
  console.log(props.serverUrl);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  } else {
    return <Outlet />;
  }
}
