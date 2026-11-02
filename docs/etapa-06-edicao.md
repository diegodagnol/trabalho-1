# Etapa 6 — Edição de contatos

> Status: **concluída**

## Objetivo
Permitir editar um contato: carregar seus dados no formulário, indicar o modo de edição e salvar ou cancelar.

## O que será feito
- Botão "Editar" em cada card (com `data-id`), tratado por delegação de eventos.
- `iniciarEdicao(id)`:
  - Preenche o formulário com os dados do contato.
  - Coloca o `id` no campo oculto `#contato-id`.
  - Muda o rótulo do botão principal para **"Salvar"** e exibe o botão **"Cancelar"**.
  - Muda o título do painel para "Editar contato" (indicação visual do modo).
- Handler de `submit` passa a verificar `#contato-id`:
  - Vazio → cria novo contato (Etapa 4).
  - Preenchido → `editarContato(id)` atualiza o objeto no array, salva e re-renderiza.
- `cancelarEdicao()`:
  - Limpa o formulário, esvazia `#contato-id`, restaura o rótulo "Adicionar", oculta "Cancelar" e o título volta a "Novo contato".

## Regras
- O estado principal continua no array; o formulário é apenas entrada.
- Após salvar a edição: persistir e re-renderizar; voltar ao modo "novo".

## Como testar
Editar um contato, salvar e confirmar a alteração na lista e após recarregar. Testar o botão Cancelar (não deve alterar nada).

## Resultado
Implementado em `app.js`:
- `iniciarEdicao(id)` — preenche o formulário, grava o id em `#contato-id`, muda o título para "Editar contato", o botão para "Salvar" e exibe "Cancelar".
- `editarContato(id, dados)` — atualiza o objeto no array (sem criar novo), salva e re-renderiza.
- `cancelarEdicao()` — limpa o formulário e restaura o modo "Novo contato" / botão "Adicionar" / Cancelar oculto.
- `aoEnviarFormulario()` passou a bifurcar: com `#contato-id` preenchido → `editarContato()`; vazio → `adicionarContato()`.
- `aoClicarNaLista()` ganhou o ramo da ação "editar" (delegação).
- `removerContato()` chama `cancelarEdicao()` se o contato removido estava em edição.
- Listener do botão "Cancelar" registrado em `iniciar()`.

### Teste funcional (navegador)
- Iniciar edição: form preenchido, título "Editar contato", botão "Salvar", Cancelar visível. ✅
- Salvar: atualiza o contato existente (total de cards permanece o mesmo — não cria duplicata) e volta ao modo "novo". ✅
- Edição persiste no Local Storage após recarregar a página. ✅
- Cancelar: limpa o formulário sem alterar os dados. ✅
- Remover um contato que está em edição: formulário volta ao modo "novo" automaticamente. ✅

## Entregáveis
- `iniciarEdicao()`, `editarContato()`, `cancelarEdicao()` em `app.js`. ✅
- Esta documentação atualizada com o resultado. ✅
