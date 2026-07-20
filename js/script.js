
// Início Menu Hambúrguer


const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', function () {
    menu.classList.toggle('ativo');
    menuToggle.classList.toggle('ativo');
});

const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        menu.classList.remove('ativo');
        menuToggle.classList.remove('ativo');
    });
});

// Fim Menu Hambúrguer


// Início Consulta de CEP (API ViaCEP)

const formCep = document.getElementById('formCep');
const cepInput = document.getElementById('cepInput');
const cepDica = document.getElementById('cepDica');
const cepDicaTexto = document.getElementById('cepDicaTexto');

const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');

formCep.addEventListener('submit', async function (e) {
    e.preventDefault(); 

    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        mostrarDica('CEP inválido. Digite os 8 números do CEP.', 'erro');
        return;
    }

    mostrarDica('Buscando endereço...', 'carregando');

    try {

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) {
            mostrarDica('CEP não encontrado. Verifique e tente novamente.', 'erro');
            limparCampos();
            return;
        }


        ruaInput.value = dados.logradouro || '---';
        bairroInput.value = dados.bairro || '---';
        cidadeInput.value = dados.localidade || '---';
        estadoInput.value = dados.uf || '---';

        mostrarDica('Endereço encontrado com sucesso!', 'sucesso');

    } catch (erro) {

        mostrarDica('Erro ao buscar o CEP. Tente novamente.', 'erro');
    }
});

function mostrarDica(mensagem, tipo) {
    cepDicaTexto.textContent = mensagem;

    cepDica.classList.remove('dica-erro', 'dica-sucesso', 'dica-carregando');

    if (tipo === 'erro') {
        cepDica.classList.add('dica-erro');
    } else if (tipo === 'sucesso') {
        cepDica.classList.add('dica-sucesso');
    } else if (tipo === 'carregando') {
        cepDica.classList.add('dica-carregando');
    }
}

function limparCampos() {
    ruaInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    estadoInput.value = '';
}

// Fim Consulta de CEP (API ViaCEP)