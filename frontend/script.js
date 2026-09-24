async function buscarFilmes() {

    const resposta = await fetch("https://filme-bruna-giulia3.vercel.app/movies");
    const filmes = await resposta.json();

    const section = document.querySelector(".filmes");
    section.innerHTML = "";

    filmes.forEach(filme => {

        section.innerHTML += `
        <div class="card">

            <h2>${filme.titulo}</h2>

            <p>Gênero: ${filme.genero}</p>

            <p>Duração: ${filme.duracao} min</p>

            <p>Classificação:
            ${filme.classificacao == 0 ? "Livre" : filme.classificacao + " anos"}
            </p>

            <button onclick="editar(${filme.id})">
                Editar
            </button>

            <button onclick="apagar(${filme.id})">
                Apagar
            </button>

        </div>
        `;
    });

}

buscarFilmes();

function editar(id){
    window.location = `editar.html?id=${id}`;
}

async function apagar(id){

    if(!confirm("Deseja apagar este filme?"))
        return;

    await fetch(`https://filme-bruna-giulia3.vercel.app/delete-movie/${id}`,{
        method:"DELETE"
    });

    buscarFilmes();
}