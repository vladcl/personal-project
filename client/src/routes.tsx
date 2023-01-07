import { Routes, Route } from "react-router-dom";
import ScreenSkeleton from "./components/ScreenSkeleton";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./screens/login/Login";

const Teste = () => {
  return <Login />;
};
export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Teste />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}
