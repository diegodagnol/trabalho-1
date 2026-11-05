# Etapa 8 — Funcionalidade adicional e revisão final

> Status: **concluída** (restando apenas o CSS da Etapa 2, adiado)

## Objetivo
Implementar pelo menos uma funcionalidade adicional e fazer a revisão final do projeto, incluindo o `README.md`.

## Funcionalidades adicionais planejadas
(escolhidas do rol de exemplos do enunciado — confirmar quais manter)
1. **Favoritos** — marcar/desmarcar contato como favorito (campo `favorito` já previsto no modelo); favoritos aparecem primeiro e/ou com destaque.
2. **Ordenação alfabética** — ordenar a lista por nome (A→Z).
3. **Contador de contatos** — total exibido em `#contador` (e, durante a busca, "X de Y").

> Mínimo exigido pelo enunciado: **uma** funcionalidade adicional. As três acima tornam o trabalho mais completo.

## O que será feito
- Botão/ícone de favorito em cada card; `alternarFavorito(id)` atualiza o array e persiste.
- Ordenação aplicada na renderização (favoritos primeiro, depois ordem alfabética).
- Contador atualizado em todas as operações.

## Revisão final
- Conferir todos os requisitos obrigatórios (cadastro, listagem, persistência, remoção, edição, busca, estado vazio).
- Revisar organização do JS (funções com responsabilidade única).
- Revisar responsividade e usabilidade.
- Escrever `README.md` com: descrição, funcionalidades, como executar, estrutura de arquivos e tecnologias.
- (Opcional) Commit e push para o repositório no GitHub.

## Como testar
Checklist completo dos requisitos do enunciado em `index.html`, em desktop e em tela pequena.

## Resultado
Implementado em `app.js`:
- **Favoritos:** botão ★/☆ em cada card (ação por delegação), `alternarFavorito(id)` alterna o campo `favorito`, persiste e re-renderiza. O card ganha a classe `favorito` (para estilização futura).
- **Ordenação:** `ordenarContatos(lista)` coloca favoritos primeiro e ordena por nome com `localeCompare("pt-BR")`; aplicada em `renderizarLista()` sobre uma cópia (não altera a ordem do array original).
- **Contador aprimorado:** `atualizarContador(visiveis)` mostra o total ("N contatos") e, durante uma busca que filtra a lista, exibe "X de Y".

### Teste funcional (navegador)
- Ordenação alfabética automática (Ana, Bruno, Carlos). ✅
- Marcar favorito move o contato para o topo (★ + classe `favorito`); vários favoritos ficam ordenados entre si. ✅
- Desmarcar retorna o contato à ordem alfabética (☆). ✅
- Contador: "1 de 3 contatos" durante a busca, "3 contatos" sem busca. ✅
- Favorito persiste no Local Storage após recarregar. ✅

## Revisão dos requisitos obrigatórios
- Cadastro, listagem, persistência (JSON + Local Storage), remoção, edição, busca/filtro e estado vazio: todos implementados e testados (Etapas 1, 3–7).
- Organização do JS em funções com responsabilidade única; array como fonte de verdade.

## Pendência
- **CSS (Etapa 2)** — adiado propositalmente; é o passo que falta para concluir o visual/responsividade.

## Entregáveis
- Funcionalidades extras em `app.js`. ✅
- `README.md`. ✅
- Esta documentação atualizada com o resultado. ✅
