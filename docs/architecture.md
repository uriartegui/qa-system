# 🏗 Qualyra Architecture

## 🧠 Visão Geral

O Qualyra é uma aplicação SaaS multi-tenant composta por:

- **Frontend** (Vite + JavaScript) consumindo
- **API REST** (Java + Spring Boot)
- **PostgreSQL** como banco relacional principal

O foco da arquitetura é garantir isolamento por organização, segurança de acesso e rastreabilidade das não conformidades.

---

## 🏢 Multi-Tenant

- Todas as entidades de negócio relevantes possuem o campo `organization_id`.
- Toda consulta sensível é filtrada por `organization_id`, garantindo isolamento lógico entre clientes.
- Usuários estão sempre associados a uma organização, e o contexto da organização é derivado do usuário autenticado.

Isso permite atender múltiplas empresas na mesma instância, mantendo dados separados.

---

## 👤 RBAC (Role-Based Access Control)

Papéis suportados:

- `OWNER` – administração global da organização (configurações, usuários, planos).
- `ADMIN` – gestão operacional (não conformidades, usuários, relatórios).
- `MEMBER` – uso operacional do dia a dia (registro e tratamento de não conformidades).

O controle de acesso é aplicado no backend, combinando:

- Papel do usuário.
- Organização ativa (via `organization_id`).
- Regras de permissão por endpoint/ação.

---

## 🔐 Segurança

- Autenticação via **JWT** (access token), emitido após login.
- Senhas armazenadas com **BCrypt**.
- Endpoints protegidos por middleware/filtros que:
  - Validam o token.
  - Recuperam usuário e organização.
  - Aplicam filtro multi-tenant obrigatório.
- **Soft delete** em registros críticos, preservando histórico para auditoria.

---

## 📦 Core Entity – `NonConformity`

Entidade central do MVP, representando uma não conformidade registrada pela organização.

Campos principais (conceituais):

- `title` – título curto da não conformidade.
- `description` – descrição detalhada do problema.
- `severity` – gravidade (ex.: baixa, média, alta, crítica).
- `status` – estado no workflow (OPEN, IN_PROGRESS, RESOLVED, CLOSED).
- `createdBy` – usuário que registrou.
- `assignedTo` – responsável atual pela tratativa.
- `dueDate` – prazo para resolução.
- `organizationId` – organização proprietária do registro.

O fluxo de negócio da `NonConformity` é implementado como um workflow de status controlado, com validações no backend para evitar transições inválidas.
