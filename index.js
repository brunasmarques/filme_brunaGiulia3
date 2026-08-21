import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()
app.use (cors())

app.use(express.json())

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    database: "alunos_filmes03TA",
    user: "alunos",
    password: "senhaAlunos"
})

app.get("/", (request, response) => {
    response.json({
        message: "Servidor de Filmes"
    })
})

app.get("/movies", (request, response) => {

    const command = "SELECT * FROM filmes_BrunaGiulia"

    sql.query(command, (error, result) => {

        if (error) {
            console.log(error)
            return
        }

        response.json(result)

    })

})

app.post("/create-movie", (request, response) => {

    const { titulo, genero, duracao, classificacao } = request.body

    const command = `
    INSERT INTO filmes_BrunaGiulia
    (titulo, genero, duracao, classificacao)
    VALUES (?, ?, ?, ?)
    `

    sql.query(command, [titulo, genero, duracao, classificacao], (error) => {

        if (error) {
            console.log(error)
            return
        }

        response.status(201).json({
            message: "Filme cadastrado!"
        })

    })

})

app.delete("/delete-movie/:id", (request, response) => {

    const { id } = request.params

    const command = "DELETE FROM filmes_BrunaGiulia WHERE id=?"

    sql.query(command, [id], (error) => {

        if (error) {
            console.log(error)
            return
        }

        response.json({
            message: "Filme apagado!"
        })

    })

})

app.put("/update-movie/:id", (request, response) => {

    const { id } = request.params

    const { titulo, genero, duracao, classificacao } = request.body

    const command = `
    UPDATE filmes_BrunaGiulia
    SET
    titulo=?,
    genero=?,
    duracao=?,
    classificacao=?
    WHERE id=?
    `

    sql.query(command, [titulo, genero, duracao, classificacao, id], (error) => {

        if (error) {
            console.log(error)
            return
        }

        response.json({
            message: "Filme atualizado!"
        })

    })

})

app.listen(3000, () => {
    console.log("Servidor rodando!")
})
