const id = new URLSearchParams(window.location.search).get("id");

const form = document.querySelector("#form");

buscarFilme();

async function buscarFilme(){

    const resposta = await fetch("https://filme-bruna-giulia3.vercel.app/movies");

    const filmes = await resposta.json();

    const filme = filmes.find(f => f.id == id);

    titulo.value = filme.titulo;
    genero.value = filme.genero;
    duracao.value = filme.duracao;
    classificacao.value = filme.classificacao;

}

form.addEventListener("submit", async function(event){

    event.preventDefault();

    const filme = {

        titulo: titulo.value,
        genero: genero.value,
        duracao: Number(duracao.value),
        classificacao: classificacao.value

    };

    await fetch(`https://filme-bruna-giulia3.vercel.app/update-movie/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(filme)

    });

    alert("Filme atualizado!");

    window.location="index.html";

});