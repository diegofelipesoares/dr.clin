import React from 'react';

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HERO SECTION */}
      <header className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Tecnologia de Ponta para sua Clínica
        </h1>
        <p className="text-lg md:text-xl mb-6">
          O sistema de gestão mais moderno para clínicas médicas e odontológicas
        </p>
        <Button
          onClick={() => navigate("/cadastro")}
          className="text-lg px-8 py-4 rounded-full"
        >
          Experimente Agora
        </Button>
      </header>

      {/* BENEFÍCIOS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Por que escolher o Dr.Clin?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Automatize a Gestão",
              desc: "Controle financeiro, agendamentos, pacientes e mais em um só lugar."
            },
            {
              title: "Portal Personalizado",
              desc: "Cada clínica ganha seu próprio site com domínio e login para clientes."
            },
            {
              title: "100% Online e Seguro",
              desc: "Acesse de onde estiver, com segurança e performance garantida."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-6 rounded-xl shadow text-center"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-16 bg-gray-100 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          O que dizem nossos clientes
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              nome: "Clínica Saúde+",
              texto:
                "O Dr.Clin revolucionou nossa rotina! Agendamentos mais rápidos e zero papelada."
            },
            {
              nome: "OdontoMais",
              texto:
                "A integração com o portal da clínica e o design limpo conquistou nossos pacientes."
            }
          ].map((depo, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow">
              <p className="italic text-gray-700 mb-4">"{depo.texto}"</p>
              <p className="text-right font-semibold">- {depo.nome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-blue-600 text-white py-8 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Dr.Clin — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
