import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ValidarClinicaPage() {
  const { clinica } = useParams<{ clinica: string }>();
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const verificarClinica = async () => {
      try {
        await axios.get(`http://localhost:8000/clinicas/${clinica}`);
        navigate(`/${clinica}/login`);
      } catch (error) {
        console.error("Erro ao validar clínica:", error);
        setErro(true);
        setTimeout(() => {
          navigate("/clinica-nao-encontrada", { replace: true });
        }, 2000);
      }
    };

    verificarClinica();
  }, [clinica, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 text-lg">
        {erro ? "Clínica não encontrada. Redirecionando..." : "Verificando clínica..."}
      </p>
    </div>
  );
}
