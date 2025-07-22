import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ClinicaNaoEncontrada() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="w-20 h-20 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Clínica não encontrada</h1>
        <p className="text-gray-600 text-lg">
          O endereço acessado não corresponde a nenhuma clínica cadastrada no sistema Dr.Clin.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-md"
        >
          Voltar para o início
        </Button>
      </div>
    </div>
  );
}
