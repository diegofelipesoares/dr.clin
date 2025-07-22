import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

type Clinica = {
  id: number;
  nome: string;
  dominio: string;
};

export default function SelecionarClinica() {
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/clinicas")
      .then((res) => setClinicas(res.data))
      .catch(() => alert("Erro ao carregar clínicas"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Acesse sua Clínica</h1>
        <p className="text-gray-600 text-sm">
          Escolha abaixo a clínica que deseja acessar.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando clínicas...</p>
      ) : (
        <div className="grid w-full max-w-2xl gap-4">
          {clinicas.map((clinica) => (
            <div
              key={clinica.id}
              className="flex items-center justify-between bg-white shadow-sm border rounded-lg px-5 py-4 hover:shadow-md transition"
            >
              <div>
                <h2 className="text-lg font-medium text-gray-800">{clinica.nome}</h2>
                <p className="text-sm text-gray-500">{clinica.dominio}.drclin.com</p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate(`/${clinica.dominio}/login`)}
                className="flex gap-2 items-center"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Botão de voltar para a home */}
        <div className="mt-10">
        <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800"
        >
            Voltar para o início
        </Button>
        </div>
    </div>
  );
}
