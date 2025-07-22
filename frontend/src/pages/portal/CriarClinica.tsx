import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CriarClinica() {
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    endereco: '',
    dominio: '',
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const isValid = () => {
    return (
      form.nome &&
      form.cnpj.length === 14 &&
      form.dominio &&
      form.nome.length > 2
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (logo) {
      data.append('logo', logo);
    }

    try {
      await axios.post('http://localhost:8000/clinicas', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Clínica cadastrada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar clínica:', error);
      alert('Erro ao cadastrar clínica. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          Cadastrar Nova Clínica
        </h2>

        <input
          name="nome"
          type="text"
          placeholder="Nome da Clínica"
          value={form.nome}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          name="cnpj"
          type="text"
          placeholder="CNPJ (somente números)"
          value={form.cnpj}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          name="telefone"
          type="text"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          name="endereco"
          type="text"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          name="dominio"
          type="text"
          placeholder="Domínio (ex: flor.drclin.com)"
          value={form.dominio}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <div>
          <label className="block font-medium mb-1">Logo da clínica</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Pré-visualização da logo"
              className="mt-3 h-24 object-contain border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar Clínica
        </button>
      </form>
    </div>
  );
}
