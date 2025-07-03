# 🩺 Dr.Clin - Sistema de Gestão para Clínicas

O **Dr.Clin** é um sistema completo de gestão para clínicas médicas e odontológicas. Desenvolvido como uma **SPA (Single Page Application)** em React com backend em **FastAPI**, o sistema oferece funcionalidades essenciais como agendamentos, controle de pacientes, médicos e planos, com autenticação JWT e arquitetura preparada para o modelo SaaS.

## 📦 Tecnologias Utilizadas

### 🧠 Backend (API)

- [FastAPI](https://fastapi.tiangolo.com/)
- PostgreSQL
- SQLAlchemy
- Autenticação com JWT (`fastapi-jwt-auth`)
- Alembic (migração de banco de dados)

### 🎨 Frontend

- React (com Vite)
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form + Zod
- Shadcn/ui

### 🛠️ DevOps & Infra (planejado)

- Docker
- CI/CD (GitHub Actions)
- Deploy em nuvem (DigitalOcean, Railway ou Render)

## 🧩 Estrutura do Projeto

```bash
dr.clin/
│
├── backend/                # FastAPI + PostgreSQL
│   ├── app/
│   │   ├── api/            # Rotas organizadas por módulo
│   │   ├── core/           # Configs de auth, segurança, settings
│   │   ├── db/             # Models, schemas e session
│   │   └── main.py         # Ponto de entrada da API
│   └── alembic/            # Migrações
│
├── frontend/               # React + Tailwind SPA
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── layout/         # Layouts e estrutura geral
│   │   ├── hooks/          # Hooks customizados
│   │   ├── services/       # Axios configs e chamadas à API
│   │   └── App.tsx         # Arquivo principal
│   └── public/
│
└── README.md
```

### ✅ Funcionalidades (MVP)

- Autenticação com JWT (login e logout)
- Layout responsivo com Sidebar
- Cadastro e listagem de médicos
- Página de agendamentos
- Gestão de pacientes
- Dashboard inicial com indicadores

### 🚧 Funcionalidades Futuras

- Sistema multi-clínica (modelo SaaS)
- Permissões por tipo de usuário (admin, recepção, médico)
- Pagamento integrado (ex: Stripe)
- Agenda integrada com calendários externos
- Inteligência artificial para sugestões de horários

### 🔧 Como Rodar Localmente

- Pré-requisitos
- Node.js
- Python 3.11+
- ostgreSQL
- (Opcional) Docker

### 🔌 Backend

- cd backend
- python -m venv venv
- source venv/bin/activate # Linux/Mac
- venv\Scripts\activate # Windows

- pip install -r requirements.txt

# Configure o .env com suas credenciais do banco

alembic upgrade head
uvicorn app.main:app --reload

### 💻 Frontend

- cd frontend
- npm install
- npm run dev
  A aplicação estará disponível em: http://localhost:5173

### 🔐 Autenticação

- Login via e-mail e senha
- Tokens JWT armazenados com segurança no frontend
- Middleware para rotas protegidas

### 🧪 Testes

- Testes unitários com Pytest (API)
- Testes de integração
- Testes e2e com Cypress (frontend)

### 📄 Licença

📢 Aviso Legal
Este software é proprietário. Todos os direitos reservados.
Não é permitida a cópia, redistribuição ou uso não autorizado sem permissão prévia do autor.

Desenvolvido por Diego Soares
