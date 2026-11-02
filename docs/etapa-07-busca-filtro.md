# Etapa 7 — Busca e filtro em tempo real

> Status: **concluída**

## Objetivo
Filtrar a lista em tempo real conforme o usuário digita, considerando pelo menos nome e e-mail, ignorando maiúsculas/minúsculas.

## O que foi feito
- `filtrarContatos(termo)` — retorna os contatos cujo **nome** ou **e-mail** contêm o termo.
  - Normaliza com `.toLowerCase()` (e `.trim()` no termo) para ignorar caixa.
- Listener de `input` no campo `#busca`:
  - A cada alteração, chama `renderizarLista()`, que filtra os contatos pelo valor atual do campo.
  - Cadastro e remoção também reaplicam o filtro atual ao renderizar a lista.
- Integração com o estado vazio:
  - Busca sem resultados → mensagem "Nenhum contato encontrado." (diferente de "Nenhum contato cadastrado ainda.").
- O contador mantém o total de contatos cadastrados durante a busca.

## Regras
- A busca não altera o array; apenas a visualização é filtrada.
- Operações de editar/remover continuam funcionando sobre os cards filtrados (usam `id`).

## Como testar
Com vários contatos, digitar parte de um nome ou e-mail em diferentes caixas (maiúscula/minúscula) e verificar o filtro instantâneo. Buscar algo inexistente e ver a mensagem de "sem resultados".

Limpar o campo ou digitar apenas espaços deve exibir todos os contatos. Cadastrar ou remover durante uma busca deve manter o filtro aplicado. A busca não deve alterar os dados no Local Storage.

## Entregáveis
- `filtrarContatos()` e o listener de busca em `app.js`.
- Esta documentação atualizada com o resultado.
