# Plano do Trabalho 01 — Gestão de Contatos (Local Storage)

Aplicação web de página única (SPA) para gerenciar contatos usando **HTML, CSS e JavaScript nativo**, com persistência em **Local Storage**.

## Tecnologias e restrições
- HTML5 semântico, CSS puro, JavaScript nativo (sem frameworks).
- Sem banco de dados e sem servidor.
- Persistência via `localStorage` com `JSON.stringify()` / `JSON.parse()`.
- Estado da aplicação mantido num **array de objetos**; o DOM reflete os dados, não é a fonte de estado.

## Estrutura de arquivos prevista
```
trabalho-1/
├── index.html        # estrutura da página
├── styles.css        # estilos e responsividade
├── app.js            # lógica (estado, persistência, render, eventos)
├── README.md         # documentação final de uso
└── docs/             # documentação de cada etapa
    ├── plano.md
    ├── etapa-01-estrutura-html.md
    ├── etapa-02-css.md
    └── ...
```

## Etapas
Cada etapa é desenvolvida e documentada separadamente em `docs/etapa-XX-*.md`.
Legenda de status: ✅ concluída · ⏳ planejada.

| # | Etapa | Status | Documentação | Entrega |
|---|-------|--------|--------------|---------|
| 1 | **Estrutura + HTML semântico** | ✅ | [etapa-01](etapa-01-estrutura-html.md) | `index.html` com formulário (nome, e-mail, telefone), área de busca, área de listagem e estado vazio. |
| 2 | **CSS e responsividade** | ⏳ (adiada p/ o final) | [etapa-02](etapa-02-css.md) | `styles.css`: layout, espaçamento, botões de ação, comportamento em telas menores. |
| 3 | **Dados + persistência** | ✅ | [etapa-03](etapa-03-dados-localstorage.md) | `app.js`: modelo de contato com ID único, funções `carregarContatos()` / `salvarContatos()` usando JSON + Local Storage. |
| 4 | **Cadastro + listagem + estado vazio** | ✅ | [etapa-04](etapa-04-cadastro-listagem.md) | Cadastrar via formulário, renderizar a lista a partir do array, mensagem de estado vazio. |
| 5 | **Remoção** | ✅ | [etapa-05](etapa-05-remocao.md) | Ação de remover em cada contato; atualiza array, Local Storage e interface. |
| 6 | **Edição** | ⏳ | [etapa-06](etapa-06-edicao.md) | Carregar contato no formulário, modo de edição, salvar ou cancelar. |
| 7 | **Busca e filtro** | ✅ | [etapa-07](etapa-07-busca-filtro.md) | Filtro em tempo real por nome e e-mail, ignorando maiúsculas/minúsculas; mensagem quando não há resultados. |
| 8 | **Funcionalidade adicional + revisão** | ⏳ | [etapa-08](etapa-08-extra-revisao.md) | Extras (favoritos, ordenação alfabética, contador de contatos), revisão geral e `README.md`. |

## Organização do JavaScript (responsabilidades)
- `carregarContatos()` / `salvarContatos()` — persistência.
- `renderizarLista(lista)` — desenha a interface a partir dos dados.
- `adicionarContato()`, `editarContato()`, `removerContato()` — operações.
- `filtrarContatos(termo)` — busca.
- Handlers de eventos chamam essas funções (lógica não concentrada num único handler).

## Como testar
Abrir `index.html` no navegador (nenhum servidor necessário). A cada etapa, o estado anterior salvo no Local Storage deve ser recuperado automaticamente.
