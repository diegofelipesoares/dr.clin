import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* CONTAINER CENTRALIZADOR GERAL */}
      <div className="max-w-7xl mx-auto px-20">
        {/* CABEÇALHO COM MENU */}
        <header className="flex items-center justify-between py-4 ">
          <div className="flex items-center gap-4">
            <img
              src="/logo/logo_DrClin.svg"
              alt="Dr.Clin - Logo"
              className="h-10"
            />
            <h1 className="text-2xl font-bold text-blue-600">Dr.Clin</h1>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#">Recursos</a>
            <Link
              to="/planos"
              className="py-2 hover:text-blue-600 transition-colors"
            >
              Planos
            </Link>
            <a href="#">Contato</a>
            <Button
              onClick={() => navigate("/cadastro")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Começar Agora
            </Button>
          </nav>
        </header>

        {/* HERO SECTION */}
        <section className="flex flex-col-reverse md:flex-row items-center py-20 gap-10">
          {/* TEXTO À ESQUERDA */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Simplifique a gestão da sua clínica
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Plataforma que te ajuda a otimizar agendamentos, prontuários,
              faturamento e muito mais.
            </p>
            <div className="flex justify-center md:justify-start gap-2">
              <Button
                onClick={() => navigate("/cadastro")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Começar Agora
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  // futuro: abrir modal ou redirecionar para vídeo
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Ver demonstração
              </Button>
            </div>
          </div>

          {/* IMAGEM À DIREITA */}
          <div className="flex-1 max-w-sm mx-auto">
            <img
              src="/img/DraPortalDrClin.jpg"
              alt="Médica sorrindo"
              className="w-full h-auto object-contain"
            />
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Calendar className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Agendamento de Consultas
            </h3>
            <p className="text-gray-600">
              Gerencie facilmente os atendimentos e reduza faltas.
            </p>
          </div>
          <div>
            <FileText className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Prontuários de Pacientes
            </h3>
            <p className="text-gray-600">
              Armazene e acesse informações de forma segura.
            </p>
          </div>
          <div>
            <CreditCard className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Faturamento Médico</h3>
            <p className="text-gray-600">
              Automatize cobranças e o processo de pagamento.
            </p>
          </div>
        </section>
      </div>

      {/* RODAPÉ FORA DO CONTAINER (FULL WIDTH, MAS PODE CENTRALIZAR TAMBÉM SE QUISER) */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600 mt-10">
        © {new Date().getFullYear()} Dr.Clin — Todos os direitos reservados.
      </footer>
    </div>
  );
}
