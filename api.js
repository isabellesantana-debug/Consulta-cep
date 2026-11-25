async function bucarCEP() {
    const cep = document.getElementById("cep").value;
    const resultados = document.getElementById("resultados");
    resultados.style.display = "none";

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const resposta = await fetch(url);
   if (!resposta.ok) {
    throw new Error("Erro na cosulta.");

   }

   const dados = await resposta.json();
   
   console.log(dados);

   if (dados.erro) {
    throw new Error("CEP nao encontrado.");
   }
    document.getElementById("logradouro").value = dados.logradouro;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("cidade").value = dados.localidade;
    document.getElementById("estado").value = dados.uf;

    } catch (erro) {
        alert(erro.message);
    


    }
};