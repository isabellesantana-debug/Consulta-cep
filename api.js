// Função assíncrona responsável por buscar os dados de endereço pelo CEP.
async function buscarCEP() {

    // Obtém o valor digitado pelo usuário no campo identificado pelo id "cep".
    const cep = document.getElementById("cep").value;

    // Obtém a área da página onde os dados do endereço serão exibidos.
    const resultados = document.getElementById("resultados");

    // Oculta os resultados enquanto uma nova consulta está sendo realizada.
    resultados.style.display = "none";

    // Monta a URL da API ViaCEP usando o CEP informado pelo usuário.
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {

        // Aguarda a resposta da requisição HTTP enviada à API.
        const resposta = await fetch(url);

        // Verifica se a resposta HTTP indicou algum erro, como serviço indisponível.
        if (!resposta.ok) {
            throw new Error("Erro na consulta.");
        }

        // Aguarda e converte o conteúdo recebido pela API para um objeto JavaScript.
        const dados = await resposta.json();

        console.log(dados);

        // Quando o ViaCEP não encontra o CEP, ele retorna a propriedade "erro".
        if (dados.erro) {
            throw new Error("CEP não encontrado.");
        }

        // Preenche o campo de logradouro com o endereço retornado pela API.
        document.getElementById("logradouro").value = dados.logradouro;

        // Preenche o campo de bairro com o bairro encontrado pela consulta.
        document.getElementById("bairro").value = dados.bairro;

        // Preenche o campo de cidade usando o campo "localidade" da resposta.
        document.getElementById("cidade").value = dados.localidade;

        // Preenche o campo de estado usando a sigla do estado (UF).
        document.getElementById("estado").value = dados.uf;

        // Exibe a área dos resultados em formato de grade após preencher os campos.
        resultados.style.display = "grid";

    } catch (erro) { 

        // Exibe um alerta com a mensagem correspondente ao erro ocorrido.
        alert(erro.message);

    }
}

// Adiciona um evento ao botão: ao ser clicado, a função buscarCEP será executada.
document.getElementById("botaoBuscar")
    .addEventListener("click", buscarCEP);
