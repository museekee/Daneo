const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.get("/data/:id", async (req, res) => {
    try {
        return res.send(require(`./data/${req.params.id}.js`))
    }
    catch (err) {
        return res.status(404).send()
    }
})

app.listen(80)