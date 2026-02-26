# 🚀 Qualyra

### Intelligent Quality Management Platform

![Status](https://img.shields.io/badge/status-alpha-orange)
![Frontend](https://img.shields.io/badge/frontend-vite-blue)
![Backend](https://img.shields.io/badge/backend-springboot-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0--alpha-informational)
![License](https://img.shields.io/badge/license-proprietary-red)

> Transformando controle de qualidade em inteligência estratégica.

Qualyra é uma plataforma SaaS projetada para centralizar, estruturar e monitorar processos de qualidade em empresas de qualquer setor.

🔗 **Versão Alpha (Preview)**  
https://qasystem-alpha.vercel.app/

🔖 **Roadmap**  
Veja o plano de evolução por versões em [`ROADMAP.md`](./ROADMAP.md).

🧭 **Guia de Contribuição**  
Padrões de branches, commits e PRs em [`CONTRIBUTING.md`](./CONTRIBUTING.md).

📐 **Arquitetura Técnica**  
Detalhes de decisões técnicas em [`docs/architecture.md`](./docs/architecture.md).

---

# 📚 Sumário

- [💡 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Diferenciais](#-diferenciais)
- [🏗 Arquitetura](#-arquitetura)
- [🏢 Modelo SaaS](#-modelo-saas)
- [🔐 Segurança](#-segurança)
- [📦 MVP v0.1.0-alpha](#-mvp-v010-alpha)
- [🔄 Development Workflow](#-development-workflow)
- [🛠 Tecnologias](#-tecnologias)
- [🧩 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Executando Localmente](#-executando-localmente)
- [🌍 Deploy](#-deploy)
- [💼 Modelo de Negócio](#-modelo-de-negócio)
- [👨‍💻 Fundadores](#-fundadores)
- [📌 Status](#-status)

---

# 💡 Sobre o Projeto

A Qualyra nasce com o objetivo de ser uma plataforma completa de Gestão de Qualidade Empresarial, atendendo:

- Indústrias
- Clínicas
- Empresas de tecnologia
- Empresas de serviços
- Times internos de controle de qualidade

A arquitetura foi planejada desde o início como produto SaaS multi-tenant escalável.

---

# ✨ Diferenciais

- 🔹 Arquitetura multi-organização (multi-tenant)
- 🔹 RBAC (controle de acesso por função)
- 🔹 JWT + Segurança centralizada
- 🔹 Estrutura escalável
- 🔹 Fluxo profissional de desenvolvimento
- 🔹 Roadmap estruturado por versões

---

# 🏗 Arquitetura

## 🔹 Backend

- Java 21
- Spring Boot 3+
- PostgreSQL
- JWT (Access Token)
- BCrypt
- RBAC (OWNER, ADMIN, MEMBER)
- Soft Delete
- Multi-tenant por `organization_id`

## 🔹 Frontend

- Vite
- JavaScript (Vanilla)
- Arquitetura modular
- Sistema de rotas próprio
- Integração com API REST
- Controle de sessão via JWT

---

# 🏢 Modelo SaaS

Cada organização possui:

- Usuários próprios
- Não conformidades próprias
- Controle de plano (Free / Pro / Enterprise)

Isolamento de dados garantido por `organization_id`.

---

# 🔐 Segurança

- Autenticação JWT
- Criptografia BCrypt
- Controle de acesso por Role
- Endpoints protegidos
- Validação de transição de status
- Filtro multi-tenant obrigatório

---

# 📦 MVP v0.1.0-alpha

## Base Arquitetural

- Setup Spring Boot
- Entidade Organization
- Entidade User + Roles
- Autenticação JWT

## Core do Produto

- Entidade NonConformity
- CRUD completo
- Workflow de Status:
  - OPEN
  - IN_PROGRESS
  - RESOLVED
  - CLOSED

## Interface

- Tela de Login integrada
- Layout principal (Sidebar + Header)
- Listagem de NonConformities
- Criação
- Edição
- Mudança de status

Objetivo: Entregar primeiro módulo funcional demonstrável.

---

# 🔄 Development Workflow

Qualyra segue fluxo baseado em Git Flow simplificado:

## Branches

- `main` → Produção
- `develop` → Integração
- `feature/*` → Desenvolvimento
- `hotfix/*` → Correções críticas

## Fluxo

```text
feature → develop → main
```

Regras:

- Pull Request obrigatório
- Code review antes de merge
- Sem commit direto na main
- Versionamento por tag (`v0.1.0-alpha`, `v0.2.0`, etc.)

---

# 🛠 Tecnologias

## Frontend

- Vite
- JavaScript

## Backend

- Java
- Spring Boot
- PostgreSQL

## Infra

- Vercel (Frontend)
- Cloud Provider (Backend)
- Banco gerenciado PostgreSQL

---

# 🧩 Estrutura do Projeto

```text
src/
├── core/
├── modules/
├── services/
├── router/
└── config/
```

---

# 🚀 Executando Localmente

```bash
npm install
npm run dev
```

---

# 🌍 Deploy

- Frontend: Vercel
- Backend: Cloud + PostgreSQL

---

# 💼 Modelo de Negócio

- **Free** – Uso individual com limitações
- **Pro** – Pequenas e médias empresas
- **Enterprise** – Uso corporativo avançado

---

# 👨‍💻 Fundadores

- **Guilherme Uriarte** – Frontend & Product Strategy
- **Paulo Batista** – Backend Engineer & System Architecture

---

# 📌 Status

🟠 Em desenvolvimento ativo (Alpha).
