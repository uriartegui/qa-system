# 🚀 Qualyra

### Intelligent Quality Management Platform

![Status](https://img.shields.io/badge/status-alpha-orange)
![Frontend](https://img.shields.io/badge/frontend-vite-blue)
![Backend](https://img.shields.io/badge/backend-springboot-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0--alpha-informational)
![License](https://img.shields.io/badge/license-proprietary-red)

> Transformando controle de qualidade em inteligência estratégica.

Qualyra é uma plataforma SaaS que ajuda equipes de qualidade a sair do “excel caótico” e passar a ter processos padronizados, rastreáveis e mensuráveis em um único lugar.

🔗 **Versão Alpha (Preview Produção)**  
https://qasystem-alpha.vercel.app/

🧪 **Ambiente de Desenvolvimento (branch `develop`)**  
https://qualyra-46ow.vercel.app/

🔖 **Roadmap** – veja a evolução por versões em [`ROADMAP.md`](./ROADMAP.md).  
🧭 **Guia de Contribuição** – fluxo de trabalho e padrões em [`CONTRIBUTING.md`](./CONTRIBUTING.md).  
📐 **Arquitetura Técnica** – detalhes para devs em [`docs/architecture.md`](./docs/architecture.md).

---

# 💡 O que o Qualyra resolve

Gestores de qualidade hoje lidam com:

- Não conformidades espalhadas em planilhas, e-mails e grupos de mensagem.
- Falta de visibilidade sobre prazos, responsáveis e ações corretivas.
- Dificuldade para comprovar a eficácia do sistema de qualidade em auditorias.
- Repetição de erros por falta de histórico centralizado.

Qualyra centraliza tudo em uma plataforma única, permitindo acompanhar a jornada completa da não conformidade até o fechamento, com responsabilidade clara e histórico completo.

---

# 🎯 Benefícios principais

- ✅ **Menos retrabalho** – cada não conformidade tem responsável, prazo e plano de ação definidos.
- ✅ **Visão em tempo real** – dashboards e listas mostram o que está aberto, atrasado ou em risco.
- ✅ **Padronização de processos** – workflows configurados para seguir as políticas da organização.
- ✅ **Rastreabilidade total** – histórico de status, comentários e ações tomadas em cada caso.
- ✅ **Pronto para auditorias** – informações organizadas para responder rapidamente a exigências de órgãos reguladores e certificações.
- ✅ **Escalável por unidade/cliente** – múltiplas organizações na mesma plataforma, com dados isolados.

---

# 👥 Para quem é

Qualyra foi pensado para:

- Gestores de qualidade em **clínicas, hospitais e instituições de saúde**.
- Times de QA em **indústrias e serviços**.
- Empresas de tecnologia que precisam de trilhas claras de não conformidade e melhoria contínua.
- Times internos de **compliance e operações** que precisam de rastreabilidade.

---

# 🧩 O que você consegue fazer hoje (MVP v0.1.0-alpha)

- Cadastrar organizações e usuários com diferentes perfis de acesso.
- Registrar não conformidades com dados estruturados.
- Acompanhar o fluxo de status:
  - OPEN → IN_PROGRESS → RESOLVED → CLOSED.
- Visualizar a lista de não conformidades em uma interface única.
- Manter login seguro e isolamento de dados por organização.

Objetivo do MVP: oferecer um primeiro módulo funcional para gestão de não conformidades que já possa ser usado em ambiente real ou piloto.

---

# 🔐 Confidencialidade e segurança em linha com QA

- Acesso controlado por perfis (OWNER, ADMIN, MEMBER).
- Autenticação segura com tokens.
- Isolamento de dados por organização, evitando vazamento entre clientes/unidades.
- Registro de ações críticas para apoiar conformidade e auditorias internas.

---

# 🌍 Como o Qualyra é entregue

- Modelo **SaaS** (software como serviço), acessado via navegador.
- Diferentes planos (Free / Pro / Enterprise) para se adaptar a times pequenos ou grandes.
- Multi-tenant: várias organizações na mesma base, cada uma com seus próprios usuários e dados.

---

# 🛠 Para times técnicos

Se você é dev ou responsável pela implantação:

- **Frontend:** Vite + JavaScript.
- **Backend:** Java 21 + Spring Boot 3, PostgreSQL.
- **Infra:** Frontend em Vercel; backend em cloud com banco PostgreSQL gerenciado.

Mais detalhes técnicos, endpoints e decisões de arquitetura estão documentados em [`docs/architecture.md`](./docs/architecture.md).

---

# 🚀 Executando localmente (dev)

```bash
npm install
npm run dev
```

(Consulte a documentação do backend em `docs/architecture.md` para subir a API e o banco.)

---

# 👨‍💻 Fundadores

- **Guilherme Uriarte** – Product & Frontend.
- **Paulo Batista** – Backend & System Architecture.

📌 Status: 🟠 Em desenvolvimento ativo (Alpha).
