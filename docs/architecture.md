# 🏗 Qualyra Architecture

## 🧠 Arquitetura Geral

Frontend → API REST → PostgreSQL

## 🏢 Multi-Tenant

Todas as entidades possuem `organization_id`.

Isolamento obrigatório por organização.

## 👤 RBAC

Roles:

- OWNER
- ADMIN
- MEMBER

Controle de acesso aplicado no backend.

## 🔐 Segurança

- JWT para autenticação
- BCrypt para criptografia de senha
- Endpoints protegidos
- Soft delete para registros críticos

## 📦 Core Entity – NonConformity

Campos principais:

- title
- description
- severity
- status
- createdBy
- assignedTo
- dueDate
- organizationId
