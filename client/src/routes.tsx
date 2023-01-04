
import { Routes, Route, BrowserRouter} from "react-router-dom";

const Teste = () => {
    return (
        <>
        asdoaspdkaspodkas
        </>
    )
}
function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Teste />} />
            <Route path="/teste" element={<Teste />}/>
        </Routes>
      </BrowserRouter>
    )
};

export default AppRoutes;