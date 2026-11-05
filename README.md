# Gestão de Contatos

Aplicação web de página única (SPA) para gerenciar contatos, feita com **HTML, CSS e JavaScript nativo**. Os dados são mantidos em um **array de objetos** e persistidos no **Local Storage** do navegador (via `JSON.stringify` / `JSON.parse`) — sem banco de dados, sem servidor e sem frameworks.

> Trabalho 01 — Desenvolvimento Web.

## Funcionalidades

### Requisitos obrigatórios
- **Cadastro** de contatos (nome, e-mail e telefone) com campos obrigatórios e tipos HTML adequados (`text`, `email`, `tel`).
- **Listagem** dinâmica dos contatos em cards, gerada a partir do array.
- **Persistência** no Local Storage: os contatos são recuperados automaticamente ao recarregar/reabrir a página.
- **Remoção** de contatos (com confirmação), atualizando array, Local Storage e interface.
- **Edição** de contatos: carrega os dados no formulário, com modo de edição (salvar/cancelar).
- **Busca e filtro** em tempo real por nome e e-mail, ignorando maiúsculas/minúsculas.
- **Estado vazio**: mensagens distintas para "nenhum contato cadastrado" e "nenhum contato encontrado".

### Funcionalidades adicionais
- **Favoritos** — marcar/desmarcar contatos (★/☆); favoritos aparecem primeiro.
- **Ordenação alfabética** — a lista é ordenada por nome (favoritos primeiro, depois A→Z).
- **Contador de contatos** — mostra o total e, durante uma busca, "X de Y".

## Como executar
Como é um projeto estático, basta **abrir o `index.html` no navegador**.

Opcionalmente, para evitar restrições de `file://`, pode servir a pasta localmente:
```bash
python -m http.server 5502
```
e acessar `http://localhost:5502/index.html`.

## Estrutura de arquivos
```
trabalho-1/
├── index.html        # estrutura da página (HTML semântico)
├── styles.css        # estilos (em desenvolvimento)
├── app.js            # lógica: estado, persistência, render e eventos
├── README.md
└── docs/             # documentação de cada etapa do desenvolvimento
```

## Organização do código (`app.js`)
O JavaScript é dividido em funções com responsabilidades claras:
- **Persistência:** `carregarContatos()`, `salvarContatos()`.
- **Renderização:** `renderizarLista()`, `criarCardContato()`, `ordenarContatos()`, `atualizarEstadoVazio()`, `atualizarContador()`.
- **Operações:** `adicionarContato()`, `editarContato()`, `removerContato()`, `alternarFavorito()`.
- **Busca:** `filtrarContatos()`.
- **Formulário/edição:** `obterDadosFormulario()`, `iniciarEdicao()`, `cancelarEdicao()`, `limparFormulario()`.
- **Eventos:** handlers (`aoEnviarFormulario`, `aoClicarNaLista` com delegação de eventos) que chamam as funções acima.

O **array `contatos` é a fonte de verdade**; a interface é sempre gerada a partir dele. Cada contato tem um `id` único (`crypto.randomUUID()` com fallback) usado nas operações de edição e remoção.

## Tecnologias
- HTML5 semântico
- CSS3
- JavaScript (ES6+) nativo
- Web Storage API (Local Storage)
