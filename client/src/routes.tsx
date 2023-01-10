import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import CatApi from "./screens/catApi/CatApi";
import Login from "./screens/login/Login";
import ListUser from "./screens/users/ListUsers";

const Teste = () => {
  return <Login />;
};
export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Teste />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gatosHTTP" element={<CatApi />} />
        <Route path="/usuários" element={<ListUser />} />
      </Routes>
    </AuthProvider>
  );
}
