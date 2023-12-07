const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.get("/data/:id", async (req, res) => {
    try {
        return res.send(Object.entries(require(`./data/${req.params.id}.js`)).map(elem => {
            if (typeof elem[1] === "string")
                return {
                    word: elem[0],
                    mean: [elem[1]]
                }
            else
                return {
                    word: elem[0],
                    mean: elem[1]
                }
        }))
    }
    catch (err) {
        return res.status(404).send()
    }
})

app.listen(80)