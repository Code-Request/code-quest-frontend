import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import MissionPage from "./pages/MissionPage";
import ProfilePage from "./pages/ProfilePage";
import RankingPage from "./pages/RankingPage";
import WorldSelectionPage from "./pages/WorldSelectionPage";

function RequireAuth({ children }: { children: ReactNode }) {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function Layout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/login"
          element={<HomePage />}
        />

        <Route
          path="/"
          element={
            <RequireAuth>
              <WorldSelectionPage />
            </RequireAuth>
          }
        />

        <Route
          path="/mission/:worldId"
          element={
            <RequireAuth>
              <MissionPage />
            </RequireAuth>
          }
        />

        <Route
          path="/ranking"
          element={
            <RequireAuth>
              <RankingPage />
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
