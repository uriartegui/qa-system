# 🤝 Contributing to Qualyra

Obrigado por contribuir com o Qualyra! Este guia descreve como trabalhamos no repositório.

## 📌 Branch Strategy

- `main` → Produção
- `develop` → Integração (deploy automático em ambiente de desenvolvimento)
- `feature/*` → Novas funcionalidades
- `hotfix/*` → Correções críticas em produção

## 🔄 Workflow

1. Criar branch a partir de `develop` (`feature/minha-feature` ou `hotfix/ajuste-critico`)
2. Desenvolver a feature/correção
3. Garantir que testes e lint passam localmente
4. Atualizar documentação relevante (README, ROADMAP, docs/...) se aplicável
5. Abrir Pull Request para `develop`
6. Passar por revisão obrigatória
7. Fazer merge após aprovação

## ✅ Definition of Done (DoD)

Uma mudança só é considerada **concluída** quando:

- Código foi revisado por pelo menos 1 pessoa
- Testes relacionados passam (quando existirem)
- Não há erros críticos conhecidos
- **Documentação afetada foi atualizada**  
  (ex.: README, `ROADMAP.md`, `docs/architecture.md`, docs de fluxo de negócio)
- Descrição do PR explica claramente o que mudou e como testar

## 🚫 Regras

- Nunca commitar direto na `main`
- Sempre usar Pull Request
- Sempre descrever claramente a mudança
- Manter código limpo, legível e coeso com o restante do projeto

## 🧾 Padrão de Commit

- `feat:` nova funcionalidade
- `fix:` correção
- `refactor:` melhoria estrutural
- `docs:` documentação
- `chore:` tarefas de manutenção / ajustes menores

Exemplos:

- `feat: adicionar filtro por status em non conformities`
- `fix: corrigir validação de transição de status`
- `docs: atualizar roadmap com v0.1.0-alpha entregue`
