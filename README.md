# 🚀 Qualyra

### Intelligent Quality Management Platform

![Status](https://img.shields.io/badge/status-alpha-orange)
![Frontend](https://img.shields.io/badge/frontend-vite-blue)
![Backend](https://img.shields.io/badge/backend-springboot-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0-informational)
![License](https://img.shields.io/badge/license-proprietary-red)

> Transformando controle de qualidade em inteligência estratégica.

Qualyra é uma plataforma SaaS projetada para centralizar, estruturar e monitorar processos de qualidade em empresas de qualquer setor.

A solução permite registrar não conformidades, acompanhar ações corretivas, analisar indicadores estratégicos (KPIs) e garantir rastreabilidade completa das operações.

🔗 **Versão Alpha (Preview)**
[https://qasystem-alpha.vercel.app/](https://qasystem-alpha.vercel.app/)

---

# 📚 Sumário

* [💡 Sobre o Projeto](#-sobre-o-projeto)
* [✨ Diferenciais](#-diferenciais)
* [🏗 Arquitetura](#-arquitetura)
* [🏢 Modelo SaaS](#-modelo-saas)
* [🔐 Segurança](#-segurança)
* [📦 Funcionalidades](#-funcionalidades)
* [📊 Roadmap](#-roadmap)
* [🛠 Tecnologias](#-tecnologias)
* [🧩 Estrutura do Projeto](#-estrutura-do-projeto)
* [🚀 Executando Localmente](#-executando-localmente)
* [🌍 Deploy](#-deploy)
* [💼 Modelo de Negócio](#-modelo-de-negócio)
* [👨‍💻 Fundadores](#-fundadores)
* [📌 Status](#-status)

---

# 💡 Sobre o Projeto

Empresas precisam de controle, rastreabilidade e métricas claras para manter padrões de qualidade elevados.

A Qualyra nasce com o objetivo de ser uma plataforma completa de Gestão de Qualidade Empresarial, atendendo:

* Indústrias
* Clínicas e área da saúde
* Empresas de tecnologia
* Empresas de serviços
* Times internos de controle de qualidade

A arquitetura foi planejada desde o início para operar como produto SaaS (Software as a Service).

---

# ✨ Diferenciais

* 🔹 Arquitetura preparada para multi-organização
* 🔹 Controle estruturado de não conformidades
* 🔹 Gestão de ações corretivas
* 🔹 Dashboard estratégico com indicadores
* 🔹 RBAC (controle de acesso por função)
* 🔹 Estrutura escalável para crescimento comercial

---

# 🏗 Arquitetura

## 🔹 Frontend

* Vite
* JavaScript (Vanilla)
* Arquitetura modular
* Sistema de rotas próprio
* Integração com API REST
* Controle de autenticação

## 🔹 Backend (em desenvolvimento)

* Java + Spring Boot
* API REST
* PostgreSQL
* JWT + Refresh Token
* Multi-tenant
* RBAC (Role Based Access Control)

---

# 🏢 Modelo SaaS

A Qualyra opera em arquitetura multi-tenant, permitindo:

* Isolamento total de dados por organização
* Controle de usuários por empresa
* Planos e limites por assinatura

Cada entidade do sistema é vinculada a uma organização, garantindo segurança e separação de dados.

---

# 🔐 Segurança

* Autenticação via JWT
* Senhas criptografadas com BCrypt
* Controle de permissões por role (OWNER, ADMIN, MEMBER)
* Validações centralizadas no backend
* Estrutura preparada para logs e auditoria

---

# 📦 Funcionalidades

### MVP (V1)

* Cadastro de organização
* Cadastro de usuários
* Login autenticado
* Registro de não conformidades
* Dashboard inicial
* Controle de plano

---

# 📊 Roadmap

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

# 🛠 Tecnologias

**Frontend**

* Vite
* JavaScript

**Backend**

* Java
* Spring Boot
* PostgreSQL

**Infraestrutura**

* Vercel (Frontend)
* Cloud Provider (Backend + Banco)

---

# 🧩 Estrutura do Projeto

```
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

* Frontend: Vercel
* Backend: Ambiente cloud com PostgreSQL gerenciado

---

# 💼 Modelo de Negócio

Qualyra será oferecida como SaaS com três planos:

* **Free** – Uso individual com limitações
* **Pro** – Pequenas e médias empresas
* **Enterprise** – Uso corporativo com recursos avançados

---

# 👨‍💻 Fundadores

* **Guilherme Uriarte** – Frontend & Product Strategy
* **Paulo Batista** – Backend Engineer & System Architecture

---

# 📌 Status

🟠 Em desenvolvimento ativo (Alpha).

Arquitetura planejada para escalar como produto comercial.
