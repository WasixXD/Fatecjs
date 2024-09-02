import  express from "express"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
const BD = new Map()


function genId() {
    return String(Math.floor(Math.random() * 10_000_000))
}

app.get("/", (req, res) => {
    res.status(200).send("Fatec JS")
})


app.post("/piada/new", (req, res) => {
    try {
        const { autor, piada } = req.body
        if(!autor || !piada) {
            res.status(400).json({ status: '👎', message: 'Reveja seu JSON' })
            return
        }
    
        const id = genId()
        BD.set(id, {autor, piada, id, likes: 0, dislikes: 0})
        res.status(200).json({ status: '👍' } )

    } catch {
        res.status(400).json({ status: '👎', message: 'Algo deu errado' })
    }
})


app.get("/piada/", (req, res) => {
    const data = []

    for(let piada of BD.values()) {
        data.push(piada)
    }

    res.status(200).json(data)
})


app.get("/piada/random", (req, res) => {
    const data = []

    for(let piada of BD.values()) {
        data.push(piada)
    }

    const r = data[Math.floor(Math.random() * data.length)]
    res.status(200).json(r)
})

app.get("/piada/:id", (req, res) => {
    try {

        const { id } = req.params
        if(!id) {
            res.status(400).json({ status: '👎', message: 'Por favor especifique um id' })
            return
        }

        const selected = BD.get(id)
        res.status(200).json({ status: '👍', body: selected })
    } catch(e) {
        res.status(400).json({ status: '👎', message: 'Algo deu errado' })
    }
})


app.put("/piada/:id/like", (req, res) => {
    try {
        const { id } = req.params
        const data = BD.get(id)
        data.likes++
        BD.set(id, data)
        res.status(200).json({ status: '👍', message: "Like!"} )
    } catch(e) {
        console.log(e)
        res.status(400).json({ status: '👎', message: 'Algo deu errado' })
    }
})

app.put("/piada/:id/dislike", (req, res) => {
    try {
        const { id } = req.params
        const data = BD.get(id)
        data.dislikes++
        BD.set(id, data)
        res.status(200).json({ status: '👍', message: "Dislike!"} )
    } catch(e) {
        console.log(e)
        res.status(400).json({ status: '👎', message: 'Algo deu errado' })
    }
})


app.delete("/piada/:id", (req, res) => {
    try {
        const { id } = req.params
        BD.delete(id)
        res.status(200).json({ status: '👍', message: "Removido" })
    } catch(e) {
        console.log(e)
        res.status(400).json({ status: '👎', message: 'Algo deu errado' })
    }
})

app.listen(PORT, _ => console.log(`Running and listening on https://localhost:${PORT}`))
