# 🚀 Deploy Guide – Qualyra

## Ambientes

- **Produção (Alpha)**  
  - Branch: `main`  
  - Frontend: Vercel  
  - URL: https://qasystem-alpha.vercel.app/  
  - Uso: demonstrações, pilotos controlados.

- **Desenvolvimento**  
  - Branch: `develop`  
  - Frontend: Vercel  
  - URL: https://qualyra-46ow.vercel.app/  
  - Uso: testes internos, validação de features antes de ir para produção.

## Fluxo de Deploy

1. Desenvolver em `feature/*` a partir de `develop`.
2. Abrir PR → `develop`.
3. Após merge em `develop`, o deploy em ambiente de desenvolvimento é disparado automaticamente.
4. Quando estável, abrir PR de `develop` → `main`.
5. Após merge em `main`, o deploy em produção (alpha) é disparado.

## Variáveis de Ambiente (exemplo)

- `API_BASE_URL` – URL da API Backend.
- `NEXT_PUBLIC_*` / `VITE_*` – variáveis expostas no frontend.
- Credenciais sensíveis configuradas diretamente na Vercel / provedor de cloud (nunca commitadas).

> Qualquer mudança em endpoints ou configuração deve ser refletida neste arquivo e no README.
