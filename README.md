# 🚀 Qualyra

### Plataforma SaaS de Gestão e Controle de Qualidade

![Status](https://img.shields.io/badge/status-alpha-orange)
![Frontend](https://img.shields.io/badge/frontend-vite-blue)
![Backend](https://img.shields.io/badge/backend-springboot-brightgreen)
![License](https://img.shields.io/badge/license-proprietary-red)

Qualyra é uma plataforma SaaS desenvolvida para centralizar, organizar e monitorar processos de qualidade em empresas de qualquer setor.

A solução permite registrar não conformidades, acompanhar ações corretivas, analisar indicadores estratégicos e garantir rastreabilidade completa das operações internas.

🔗 **Acesse a versão Alpha**
[https://qasystem-alpha.vercel.app/](https://qasystem-alpha.vercel.app/)

---

## 💡 Por que Qualyra?

Empresas precisam de controle, rastreabilidade e métricas claras.

A Qualyra foi criada para oferecer:

* Controle estruturado de não conformidades
* Gestão de ações corretivas
* Indicadores de desempenho (KPIs)
* Auditoria completa de operações
* Arquitetura escalável para múltiplas organizações

---

## 🏗 Arquitetura

### 🔹 Frontend

* Vite
* JavaScript (Vanilla)
* Arquitetura modular
* Sistema de rotas próprio
* Integração com API REST
* Controle de autenticação

### 🔹 Backend (em desenvolvimento)

* Java + Spring Boot
* API REST
* PostgreSQL
* JWT + Refresh Token
* Multi-tenant (múltiplas organizações)
* RBAC (Role Based Access Control)

---

## 🏢 Modelo SaaS (Multi-Tenant)

Qualyra opera em arquitetura multi-organização, permitindo:

* Isolamento total de dados por empresa
* Controle de usuários por organização
* Planos e limites por assinatura

Cada entidade do sistema é vinculada a uma organização, garantindo segurança e separação de dados.

---

## 🔐 Segurança

* Autenticação via JWT
* Senhas criptografadas com BCrypt
* Controle de permissões por role (OWNER, ADMIN, MEMBER)
* Validações centralizadas no backend
* Estrutura preparada para auditoria e logs

---

## 📦 MVP – Funcionalidades Iniciais

* Cadastro de organização
* Cadastro de usuários
* Login autenticado
* Registro de não conformidades
* Dashboard inicial
* Controle por plano (Free / Pro / Enterprise)

---

## 📊 Roadmap

### V1 – MVP Comercial

* Autenticação completa
* Multi-organização
* CRUD de não conformidades
* Dashboard básico

### V2

* Indicadores avançados
* Auditoria completa
* Relatórios exportáveis

### V3

* Integrações externas
* API pública
* Automação de fluxos

---

## 🧩 Estrutura do Projeto (Frontend)

```
src/
├── core/
├── modules/
├── services/
├── router/
└── config/
```

---

## 🚀 Executando Localmente

```bash
npm install
npm run dev
```

---

## 🌍 Deploy

* Frontend: Vercel
* Backend: Cloud (Spring Boot + PostgreSQL)

---

## 💼 Modelo de Negócio

Qualyra será oferecida como SaaS com três planos:

* **Free** – Uso individual com limitações
* **Pro** – Pequenas e médias empresas
* **Enterprise** – Uso corporativo com recursos avançados

---

## 👨‍💻 Fundadores

* **Guilherme Uriarte** – Frontend & Product Strategy
* **Paulo Batista** – Backend Engineer & System Architecture

---

## 📌 Status do Projeto

Em desenvolvimento ativo (Alpha).

Arquitetura planejada para escalar como produto comercial.
