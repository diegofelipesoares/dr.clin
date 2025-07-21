import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function ValidarClinicaPage() {
  const { clinica } = useParams<{ clinica: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const verificarClinica = async () => {
      try {
        await axios.get(`http://localhost:8000/clinicas/${clinica}`);
        navigate(`/${clinica}/login`);
      } catch {
        window.location.href = "http://localhost:5174";
      }
    };

    verificarClinica();
  }, [clinica, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 text-lg">Verificando clínica...</p>
    </div>
  );
}
