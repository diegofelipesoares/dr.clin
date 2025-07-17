import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CriarClinica from "./pages/CriarClinica";
import AssinaturaPage from "./pages/Assinatura";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<CriarClinica />} />
      <Route path="/planos" element={<AssinaturaPage />} />
    </Routes>
  );
}
