import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home, Login, Register } from "../pages";
import { useGlobalHook } from "../context/AuthContext";

const AnimatedRoutes = () => {
  const { currentUser } = useGlobalHook();
  console.log(currentUser);

  const location = useLocation();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
