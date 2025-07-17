// src/pages/Assinatura.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssinaturaPage() {
  const [etapa, setEtapa] = useState(1);

  const proximaEtapa = () => setEtapa((prev) => Math.min(prev + 1, 4));
  const etapaAnterior = () => setEtapa((prev) => Math.max(prev - 1, 1));
  const navigate = useNavigate();

  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);
  const [formaPagamento, setFormaPagamento] = useState<string | null>(null);
  const [dadosClinica, setDadosClinica] = useState({
    nome: "",
    cnpj: "",
    dominio: "",
  });
  const [admin, setAdmin] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const finalizarCadastro = async () => {
    try {
      const payload = {
        plano: planoSelecionado,
        formaPagamento,
        clinica: dadosClinica,
        admin,
      };

      console.log("Enviando dados...", payload); // para debug

      // Envia os dados ao backend
      const response = await axios.post<{ subdominio: string }>(
        "http://localhost:8000/api/registro-clinica",
        payload
      );
      // Supondo que o backend responda com o subdomínio criado
      const { subdominio } = response.data;

      // Redireciona para o subdomínio
      window.location.href = `https://${subdominio}.drclin.com`;
    } catch (error) {
      console.error("Erro ao finalizar cadastro:", error);
      alert("Erro ao finalizar. Tente novamente.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Adquira seu plano Dr.Clin
      </h1>

      {/* Etapas */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className={etapa === 1 ? "font-bold text-blue-600" : ""}>
            Plano
          </span>
          <span className={etapa === 2 ? "font-bold text-blue-600" : ""}>
            Pagamento
          </span>
          <span className={etapa === 3 ? "font-bold text-blue-600" : ""}>
            Clínica
          </span>
          <span className={etapa === 4 ? "font-bold text-blue-600" : ""}>
            Administrador
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(etapa - 1) * 33.33 + 1}%` }}
          />
        </div>
      </div>

      {/* Conteúdo da Etapa */}
      <div className="border rounded-xl p-6 bg-white shadow">
        {etapa === 1 && (
          <EtapaPlano
            planoSelecionado={planoSelecionado}
            setPlanoSelecionado={setPlanoSelecionado}
          />
        )}
        {etapa === 2 && (
          <EtapaPagamento
            formaPagamento={formaPagamento}
            setFormaPagamento={setFormaPagamento}
          />
        )}
        {etapa === 3 && (
          <EtapaClinica
            dadosClinica={dadosClinica}
            setDadosClinica={setDadosClinica}
          />
        )}
        {etapa === 4 && <EtapaAdmin admin={admin} setAdmin={setAdmin} />}
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6 items-center">
        <div className="flex gap-2">
          <Button
            onClick={etapaAnterior}
            disabled={etapa === 1}
            variant="outline"
          >
            Voltar
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-black bor hover:text-red-600"
          >
            Cancelar
          </Button>
        </div>
        <Button
          onClick={etapa === 4 ? finalizarCadastro : proximaEtapa}
          disabled={
            (etapa === 1 && !planoSelecionado) ||
            (etapa === 2 && !formaPagamento) ||
            (etapa === 3 && (!dadosClinica.nome || !dadosClinica.dominio)) ||
            (etapa === 4 && (!admin.nome || !admin.email || !admin.senha))
          }
        >
          {etapa === 4 ? "Finalizar" : "Avançar"}
        </Button>
      </div>
    </div>
  );
}

// Componentes fictícios por enquanto:
function EtapaPlano({
  planoSelecionado,
  setPlanoSelecionado,
}: {
  planoSelecionado: string | null;
  setPlanoSelecionado: (plano: string) => void;
}) {
  const planos = [
    {
      id: "lite",
      nome: "Lite",
      preco: "R$ 59/mês",
      descricao: "Ideal para pequenas clínicas com até 1 profissional.",
    },
    {
      id: "professional",
      nome: "Professional",
      preco: "R$ 129/mês",
      descricao: "Para clínicas com múltiplos profissionais e agenda cheia.",
    },
    {
      id: "premium",
      nome: "Premium",
      preco: "R$ 199/mês",
      descricao: "Solução completa com suporte prioritário e personalizações.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {planos.map((plano) => {
        const selecionado = plano.id === planoSelecionado;

        return (
          <button
            key={plano.id}
            onClick={() => setPlanoSelecionado(plano.id)}
            className={`rounded-xl border p-6 text-left shadow-sm transition-all duration-300 ${
              selecionado
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <h3 className="text-xl font-bold text-blue-700">{plano.nome}</h3>
            <p className="text-2xl font-semibold my-2">{plano.preco}</p>
            <p className="text-gray-600 text-sm">{plano.descricao}</p>
          </button>
        );
      })}
    </div>
  );
}

function EtapaPagamento({
  formaPagamento,
  setFormaPagamento,
}: {
  formaPagamento: string | null;
  setFormaPagamento: (forma: string) => void;
}) {
  const opcoes = [
    {
      id: "cartao",
      titulo: "Cartão de Crédito",
      descricao: "Pague com cartão e tenha ativação imediata.",
    },
    {
      id: "pix",
      titulo: "Pix",
      descricao: "Envie o comprovante e ative em até 24h.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {opcoes.map((opcao) => {
        const ativo = opcao.id === formaPagamento;

        return (
          <button
            key={opcao.id}
            onClick={() => setFormaPagamento(opcao.id)}
            className={`rounded-xl border p-6 text-left shadow-sm transition-all duration-300 ${
              ativo
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <h3 className="text-lg font-semibold text-blue-700">
              {opcao.titulo}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{opcao.descricao}</p>
          </button>
        );
      })}
    </div>
  );
}

function EtapaClinica({
  dadosClinica,
  setDadosClinica,
}: {
  dadosClinica: { nome: string; cnpj: string; dominio: string };
  setDadosClinica: (dados: typeof dadosClinica) => void;
}) {
  const atualizarCampo = (campo: keyof typeof dadosClinica, valor: string) => {
    setDadosClinica({ ...dadosClinica, [campo]: valor });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Nome da clínica *</label>
        <input
          type="text"
          value={dadosClinica.nome}
          onChange={(e) => atualizarCampo("nome", e.target.value)}
          className="w-full border rounded-md px-4 py-2"
          placeholder="Ex: Clínica São José"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">CNPJ (opcional)</label>
        <input
          type="text"
          value={dadosClinica.cnpj}
          onChange={(e) => atualizarCampo("cnpj", e.target.value)}
          className="w-full border rounded-md px-4 py-2"
          placeholder="00.000.000/0000-00"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Endereço do subdomínio desejado *
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={dadosClinica.dominio}
            onChange={(e) => {
              const valor = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, ""); // remove espaços e caracteres inválidos
              atualizarCampo("dominio", valor);
            }}
            className="w-full border rounded-md px-4 py-2"
            placeholder="ex: endwebclinica"
            required
          />
          <span className="text-gray-600 text-sm">.drclin.com</span>
        </div>
      </div>
    </div>
  );
}

function EtapaAdmin({
  admin,
  setAdmin,
}: {
  admin: { nome: string; email: string; senha: string };
  setAdmin: (dados: typeof admin) => void;
}) {
  const atualizarCampo = (campo: keyof typeof admin, valor: string) => {
    setAdmin({ ...admin, [campo]: valor });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Nome completo *</label>
        <input
          type="text"
          value={admin.nome}
          onChange={(e) => atualizarCampo("nome", e.target.value)}
          className="w-full border rounded-md px-4 py-2"
          placeholder="Ex: João da Silva"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">E-mail *</label>
        <input
          type="email"
          value={admin.email}
          onChange={(e) => atualizarCampo("email", e.target.value)}
          className="w-full border rounded-md px-4 py-2"
          placeholder="joao@email.com"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Senha *</label>
        <input
          type="password"
          value={admin.senha}
          onChange={(e) => atualizarCampo("senha", e.target.value)}
          className="w-full border rounded-md px-4 py-2"
          placeholder="Mínimo 6 caracteres"
          required
        />
      </div>
    </div>
  );
}
