const form = document.querySelector("#form");

form.addEventListener("submit", async function(event){

    event.preventDefault();

    const filme = {

        titulo: titulo.value,
        genero: genero.value,
        duracao: Number(duracao.value),
        classificacao: classificacao.value

    };

    await fetch("https://filme-bruna-giulia3.vercel.app/create-movie",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(filme)

    });

    alert("Filme cadastrado!");

    window.location="index.html";

});