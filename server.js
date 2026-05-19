const express = require("express");

const app = express();

app.use(express.json());

let comandoActual = "detener";

app.get("/", (req, res) => {

res.send(`

<!DOCTYPE html>
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Robot ESP32</title>

<style>

body{
font-family: Arial;
background: linear-gradient(135deg,#0f2027,#203a43,#2c5364);
color:white;
text-align:center;
margin:0;
}

.container{
margin-top:30px;
}

button{
width:140px;
height:60px;
margin:8px;
font-size:18px;
border:none;
border-radius:12px;
font-weight:bold;
cursor:pointer;
}

.forward{background:#4CAF50;color:white;}
.back{background:#4CAF50;color:white;}
.left{background:#2196F3;color:white;}
.right{background:#2196F3;color:white;}
.stop{background:#f44336;color:white;width:300px;}

</style>

</head>

<body>

<h1>CONTROL ROBOT</h1>

<div class="container">

<button class="forward"
onclick="enviar('adelante')">
ADELANTE
</button>

<br>

<button class="left"
onclick="enviar('izquierda')">
IZQUIERDA
</button>

<button class="right"
onclick="enviar('derecha')">
DERECHA
</button>

<br>

<button class="back"
onclick="enviar('atras')">
ATRAS
</button>

<br>

<button class="stop"
onclick="enviar('detener')">
PARAR
</button>

</div>

<h2 id="estado">
Comando actual: detener
</h2>

<script>

async function enviar(cmd){

await fetch('/comando', {

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({
cmd:cmd
})

});

document.getElementById("estado").innerHTML =
"Comando actual: " + cmd;

}

</script>

</body>
</html>

`);

});

app.post("/comando", (req, res) => {

comandoActual = req.body.cmd;

console.log("Comando:", comandoActual);

res.send("OK");

});

app.get("/comando", (req, res) => {

res.json({
comando: comandoActual
});

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log("Servidor iniciado");

});
