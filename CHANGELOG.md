# 📜 Changelog – Qualyra

Formato baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.1.0-alpha] – 2026-03-04

### Added
- Arquitetura multi-tenant com `organization_id`.
- RBAC com papéis OWNER, ADMIN, MEMBER.
- Autenticação JWT e armazenamento de senha com BCrypt.
- Entidade `NonConformity` com workflow de status (OPEN, IN_PROGRESS, RESOLVED, CLOSED).
- Interface inicial:
  - Login
  - Layout principal (Sidebar + Header)
  - Listagem, criação, edição e mudança de status de não conformidades.
- Deploy frontend:
  - Produção (alpha): https://qasystem-alpha.vercel.app/
  - Desenvolvimento (`develop`): https://qualyra-46ow.vercel.app/

### Changed
- README atualizado com foco em benefícios para gestores de qualidade.

### Planned
- Dashboards com métricas.
- Auditoria de ações (logs).
- Relatórios exportáveis.
- Gestão de planos (Free / Pro / Enterprise).
