const express = require('express')
const app = express();
const path = require('path');

const http = require('http');
const server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const PORT = process.env.PORT || 3000;
var currentRoom = { id: "sala", usuarios: [] };
const colors = ["red", "blue", "yellow"]
const crypto = require('./src/crypto')


io.on("connection", socket => {

    socket.on("addUser", usuario => {
        if (usuario !== undefined) {

            if (currentRoom.usuarios.length < 4) {
                if (!usuario.admin) {
                    usuario.id = '_' + Math.random().toString(36).substr(2, 9);
                    usuario.color = giveMeFreeColor();
                }
                currentRoom.usuarios[currentRoom.usuarios.length] = usuario
                io.emit("users", currentRoom.usuarios);
            }
            socket.emit("currentUser", usuario);
        }
    });
    socket.on("checkLogIn", password => {
        let result = false
        if (crypto.encrypt(password) === crypto.passEncrypt) {
            result = true
        }
        socket.emit("logInResponse", result);

    });
    socket.on("changePanel", panel => {
        io.emit("panel", panel);
    });

    socket.on("updateUsers", usuarios => {
        currentRoom.usuarios = usuarios;
        io.emit("users", currentRoom.usuarios);
    });
    socket.on("updateUser", usuario => {
        updateUsuarios(usuario);
        io.emit("users", currentRoom.usuarios);

    });
    socket.on("removeUser", usuario => {
        if (usuario !== null) {
            deleteUsuario(usuario);
            io.emit("users", currentRoom.usuarios);
        }
    });

});

app.use(express.static(__dirname + '/dist/PasaPalabra'));

app.get('*', function (req, res) {
    // Replace the '/dist/<to_your_project_name>/index.html'
    res.sendFile(path.join(__dirname + '/dist/PasaPalabra/index.html'));
});

server.listen(PORT, () => {
    console.log(`started on port: ${PORT}`);
});


function updateUsuarios(usuario) {
    currentRoom.usuarios = currentRoom.usuarios.map(user => user.id === usuario.id ? usuario : user)
}
function giveMeFreeColor() {
    let usados = []
    if (currentRoom.usuarios.length === 1 && currentRoom.usuarios[0].admin) {
        return "red"
    }
    currentRoom.usuarios.map(user => {
        usados[usados.length] = user.color
    });
    let copiaColors = [...colors]
    usados.map(color => {
        if (copiaColors.indexOf(color) !== -1) { copiaColors.splice(copiaColors.indexOf(color), 1) }
    })
    return copiaColors[0]
}
function deleteUsuario(usuario) {
    if (usuario !== null && usuario.id !== null) {
        currentRoom.usuarios = currentRoom.usuarios.filter(user => user.id !== usuario.id)
    }
}