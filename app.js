// ============================================================
// Gestão de Contatos — app.js
// Etapa 3: camada de dados e persistência (Local Storage)
// Etapa 4: cadastro, listagem dinâmica e estado vazio
// Etapa 5: remoção de contatos (delegação de eventos)
// Etapa 6: edição de contatos (modo editar / cancelar)
// Etapa 7: busca e filtro em tempo real por nome e e-mail
// Etapa 8: favoritos, ordenação e contador aprimorado
// ============================================================

// Chave usada para guardar os contatos no Local Storage.
const CHAVE_STORAGE = "contatos";

// Estado da aplicação: fonte de verdade (array de objetos).
// A interface é sempre gerada a partir deste array; o DOM não é o estado.
let contatos = [];

// ------------------------------------------------------------
// Referências do DOM
// ------------------------------------------------------------
const form = document.getElementById("form-contato");
const campoId = document.getElementById("contato-id");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const campoBusca = document.getElementById("busca");
const listaEl = document.getElementById("lista-contatos");
const estadoVazioEl = document.getElementById("estado-vazio");
const contadorEl = document.getElementById("contador");
const tituloFormEl = document.getElementById("titulo-formulario");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

// ------------------------------------------------------------
// Persistência
// ------------------------------------------------------------

/**
 * Lê os contatos do Local Storage e converte de JSON para array.
 * Retorna [] quando não há nada salvo ou se o conteúdo estiver inválido.
 */
function carregarContatos() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);
        if (!dados) return [];
        const lista = JSON.parse(dados);
        return Array.isArray(lista) ? lista : [];
    } catch (erro) {
        console.error("Erro ao carregar contatos do Local Storage:", erro);
        return [];
    }
}

/**
 * Salva o array de contatos no Local Storage usando JSON.
 */
function salvarContatos() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(contatos));
}

// ------------------------------------------------------------
// Utilitários
// ------------------------------------------------------------

/**
 * Gera um identificador único para cada contato.
 * Usa crypto.randomUUID() quando disponível; senão, um fallback baseado no tempo.
 */
function gerarId() {
    if (window.crypto && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ------------------------------------------------------------
// Renderização (a interface é gerada a partir do array)
// ------------------------------------------------------------

/**
 * Cria o elemento <li> (card) de um contato.
 * Usa textContent para os dados do usuário (evita injeção de HTML).
 */
function criarCardContato(contato) {
    const item = document.createElement("li");
    item.className = "card-contato";
    if (contato.favorito) item.classList.add("favorito");
    item.dataset.id = contato.id;

    const info = document.createElement("div");
    info.className = "card-info";

    const nome = document.createElement("h3");
    nome.className = "card-nome";
    nome.textContent = contato.nome;

    const email = document.createElement("p");
    email.className = "card-email";
    email.textContent = contato.email;

    const telefone = document.createElement("p");
    telefone.className = "card-telefone";
    telefone.textContent = contato.telefone;

    info.append(nome, email, telefone);

    const acoes = document.createElement("div");
    acoes.className = "card-acoes";

    const btnFavorito = document.createElement("button");
    btnFavorito.type = "button";
    btnFavorito.className = "botao botao-favorito";
    btnFavorito.dataset.acao = "favorito";
    btnFavorito.textContent = contato.favorito ? "★" : "☆";
    btnFavorito.title = contato.favorito ? "Desmarcar favorito" : "Marcar como favorito";
    btnFavorito.setAttribute("aria-label", btnFavorito.title);
    btnFavorito.setAttribute("aria-pressed", String(!!contato.favorito));

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "botao botao-editar";
    btnEditar.dataset.acao = "editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "botao botao-remover";
    btnRemover.dataset.acao = "remover";
    btnRemover.textContent = "Remover";

    acoes.append(btnFavorito, btnEditar, btnRemover);
    item.append(info, acoes);
    return item;
}

/**
 * Ordena a lista: favoritos primeiro, depois em ordem alfabética por nome.
 * Retorna uma cópia (não altera a ordem do array original).
 */
function ordenarContatos(lista) {
    return [...lista].sort((a, b) => {
        if (a.favorito !== b.favorito) return a.favorito ? -1 : 1;
        return a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });
    });
}

/**
 * Renderiza a lista de contatos recebida (por padrão, todos).
 * Limpa o container e recria os cards a partir dos dados.
 */
function renderizarLista(lista = filtrarContatos(campoBusca.value)) {
    const ordenada = ordenarContatos(lista);
    listaEl.innerHTML = "";
    ordenada.forEach((contato) => listaEl.appendChild(criarCardContato(contato)));
    atualizarEstadoVazio(ordenada);
    atualizarContador(ordenada.length);
}

/**
 * Mostra/oculta a mensagem de estado vazio e ajusta o texto.
 * (A mensagem de "busca sem resultados" é refinada na Etapa 7.)
 */
function atualizarEstadoVazio(lista) {
    const vazio = lista.length === 0;
    estadoVazioEl.hidden = !vazio;
    if (vazio) {
        estadoVazioEl.textContent = contatos.length === 0
            ? "Nenhum contato cadastrado ainda."
            : "Nenhum contato encontrado.";
    }
}

/**
 * Atualiza o contador. Mostra o total de contatos cadastrados e,
 * quando há uma busca ativa filtrando a lista, exibe "X de Y".
 */
function atualizarContador(visiveis = contatos.length) {
    const total = contatos.length;
    const rotulo = total === 1 ? "contato" : "contatos";
    const buscando = campoBusca.value.trim() !== "";
    contadorEl.textContent = buscando && visiveis !== total
        ? `${visiveis} de ${total} ${rotulo}`
        : `${total} ${rotulo}`;
}

// ------------------------------------------------------------
// Operações
// ------------------------------------------------------------

/**
 * Filtra os contatos por nome ou e-mail sem alterar os dados cadastrados.
 * Ignora maiúsculas, minúsculas e espaços nas extremidades do termo.
 */
function filtrarContatos(termo) {
    const busca = termo.trim().toLowerCase();
    return contatos.filter((contato) =>
        contato.nome.toLowerCase().includes(busca)
        || contato.email.toLowerCase().includes(busca)
    );
}

/**
 * Cria um novo contato a partir dos dados do formulário e salva.
 */
function adicionarContato(dados) {
    const novo = {
        id: gerarId(),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        favorito: false, // usado na Etapa 8
    };
    contatos.push(novo);
    salvarContatos();
    renderizarLista();
}

/**
 * Remove o contato com o id informado, atualizando array,
 * Local Storage e interface.
 */
function removerContato(id) {
    // Se o contato removido estava em edição, volta ao modo "novo".
    if (campoId.value === id) {
        cancelarEdicao();
    }
    contatos = contatos.filter((contato) => contato.id !== id);
    salvarContatos();
    renderizarLista();
}

/**
 * Marca/desmarca um contato como favorito, persistindo e re-renderizando.
 */
function alternarFavorito(id) {
    const contato = contatos.find((c) => c.id === id);
    if (!contato) return;
    contato.favorito = !contato.favorito;
    salvarContatos();
    renderizarLista();
}

/**
 * Atualiza os dados do contato em edição e volta ao modo "novo".
 */
function editarContato(id, dados) {
    const contato = contatos.find((c) => c.id === id);
    if (!contato) return;
    contato.nome = dados.nome;
    contato.email = dados.email;
    contato.telefone = dados.telefone;
    salvarContatos();
    renderizarLista();
}

// ------------------------------------------------------------
// Eventos da lista (delegação)
// ------------------------------------------------------------

/**
 * Um único listener no container trata os cliques dos cards,
 * identificando o contato pelo data-id e a ação pelo data-acao.
 * (A ação "editar" é tratada na Etapa 6.)
 */
function aoClicarNaLista(evento) {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const card = botao.closest(".card-contato");
    const id = card?.dataset.id;
    if (!id) return;

    if (botao.dataset.acao === "remover") {
        const contato = contatos.find((c) => c.id === id);
        const nome = contato ? contato.nome : "este contato";
        if (confirm(`Remover ${nome}?`)) {
            removerContato(id);
        }
    } else if (botao.dataset.acao === "editar") {
        iniciarEdicao(id);
    } else if (botao.dataset.acao === "favorito") {
        alternarFavorito(id);
    }
}

// ------------------------------------------------------------
// Formulário
// ------------------------------------------------------------

/**
 * Lê e valida os campos do formulário.
 * Retorna um objeto com os dados ou null se algo estiver inválido.
 */
function obterDadosFormulario() {
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const telefone = campoTelefone.value.trim();

    if (!nome || !email || !telefone) {
        alert("Preencha nome, e-mail e telefone.");
        return null;
    }
    if (!campoEmail.checkValidity()) {
        alert("Informe um e-mail válido.");
        return null;
    }
    return { nome, email, telefone };
}

/**
 * Limpa o formulário e o volta ao modo "novo contato".
 */
function limparFormulario() {
    form.reset();
    campoId.value = "";
}

/**
 * Carrega os dados do contato no formulário e entra no modo de edição:
 * guarda o id, troca o rótulo do botão, mostra "Cancelar" e ajusta o título.
 */
function iniciarEdicao(id) {
    const contato = contatos.find((c) => c.id === id);
    if (!contato) return;

    campoId.value = contato.id;
    campoNome.value = contato.nome;
    campoEmail.value = contato.email;
    campoTelefone.value = contato.telefone;

    tituloFormEl.textContent = "Editar contato";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = false;
    campoNome.focus();
}

/**
 * Sai do modo de edição, limpando o formulário e restaurando o estado "novo".
 */
function cancelarEdicao() {
    limparFormulario();
    tituloFormEl.textContent = "Novo contato";
    btnSalvar.textContent = "Adicionar";
    btnCancelar.hidden = true;
}

/**
 * Trata o envio do formulário.
 * Decide entre cadastrar (sem id) ou salvar edição (com id em #contato-id).
 */
function aoEnviarFormulario(evento) {
    evento.preventDefault();
    const dados = obterDadosFormulario();
    if (!dados) return;

    const id = campoId.value;
    if (id) {
        editarContato(id, dados);
        cancelarEdicao();
    } else {
        adicionarContato(dados);
        limparFormulario();
        campoNome.focus();
    }
}

// ------------------------------------------------------------
// Inicialização
// ------------------------------------------------------------

function iniciar() {
    contatos = carregarContatos();
    renderizarLista();
    form.addEventListener("submit", aoEnviarFormulario);
    listaEl.addEventListener("click", aoClicarNaLista);
    campoBusca.addEventListener("input", () => renderizarLista());
    btnCancelar.addEventListener("click", cancelarEdicao);
}

document.addEventListener("DOMContentLoaded", iniciar);
