import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./screens/login/Login";
import ListUser from "./screens/login/users/ListUsers";

const Teste = () => {
  return <Login />;
};
export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Teste />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuários" element={<ListUser />} />
      </Routes>
    </AuthProvider>
  );
}
