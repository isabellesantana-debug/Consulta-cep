
const botao = document.querySelector("button");

botao.addEventListener("click", buscarCep);

async function buscarCep() {

    const cep = document.getElementById("cep").value;
    const mensagem = document.getElementById("mensagem");

    if (cep === "") {
        mensagem.textContent = "Digite um CEP!";
        return;
    }

    const cepFormatado = cep.replace(/\D/g, "");

    if (cepFormatado.length !== 8) {
        mensagem.textContent = "Digite um CEP válido!";
        return;
    }

    try {

        mensagem.textContent = "Buscando CEP...";

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cepFormatado}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            mensagem.textContent = "CEP não encontrado!";
            return;
        }

        document.getElementById("logradouro").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;

        mensagem.textContent = "CEP encontrado com sucesso!";

    } catch (erro) {

        mensagem.textContent = "Erro ao buscar o CEP!";

    }
}
