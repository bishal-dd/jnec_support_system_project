import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedWorkerRoute({ user }) {
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "worker") {
    navigate("/login");
    return null;
  } else {
    return <Outlet />;
  }
}
