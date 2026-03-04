# 📋 QA Flows – Non Conformities

Este documento descreve o fluxo de gestão de não conformidades dentro do Qualyra.

## 1. Abertura de Não Conformidade

- Quem pode abrir: ADMIN, MEMBER.
- Quando abrir: sempre que for identificado um desvio de processo, falha, incidente ou oportunidade de melhoria.
- Passos:
  - Acessar a tela de "Não Conformidades".
  - Clicar em "Nova não conformidade".
  - Preencher: título, descrição, gravidade, setor/área (se existir), prazo desejado.
  - Salvar.

Resultado: registro criado com status **OPEN**, vinculado à organização do usuário.

## 2. Análise e Tratativa

- Responsável: normalmente ADMIN ou responsável designado.
- Ações possíveis:
  - Definir/alterar `assignedTo`.
  - Revisar severidade.
  - Registrar comentários com contexto da investigação.

Regras de status:
- **OPEN → IN_PROGRESS**: quando alguém assume a tratativa.
- **IN_PROGRESS**: etapa em que ações corretivas/preventivas estão sendo executadas.

## 3. Resolução

- Quando usar **RESOLVED**:
  - Ações corretivas foram executadas.
  - Evidências foram registradas (ex.: comentários, anexos futuros).
- Passos:
  - Atualizar status para **RESOLVED**.
  - Ajustar prazo real se necessário.
  - Registrar resumo da solução.

## 4. Fechamento

- Quem fecha: normalmente ADMIN ou OWNER.
- Quando usar **CLOSED**:
  - Não há mais ações pendentes.
  - Resultado validado (ex.: em reunião de qualidade ou auditoria interna).

Resultado: a não conformidade fica registrada como histórico, disponível para relatórios e auditorias.

## 5. Regras gerais

- Todo registro pertence a uma única `organizationId`.
- Apenas usuários da mesma organização podem ver/editar a NC.
- Transições de status inválidas são bloqueadas no backend.
- Campos obrigatórios e prazos devem seguir as políticas de cada organização.

Este fluxo é a base do MVP e pode ser estendido com planos de ação detalhados, anexos e métricas em versões futuras.
