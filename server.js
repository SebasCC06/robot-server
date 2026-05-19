const express = require("express");
const app = express();

app.use(express.json());

let comando = "stop";

app.post("/comando", (req, res) => {
    comando = req.body.cmd;
    console.log("Comando:", comando);
    res.send("OK");
});

app.get("/comando", (req, res) => {
    res.json({ comando });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor iniciado");
});