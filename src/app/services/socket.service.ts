import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";
import { Socket } from "ngx-socket-io";
import { Panel } from "../models/panel";
@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private socket: Socket) {}
  logInResponse = this.socket.fromEvent<boolean>("logInResponse");
  currentUser = this.socket.fromEvent<Usuario>("currentUser");
  users = this.socket.fromEvent<Usuario[]>("users");
  currentPanel = this.socket.fromEvent<Panel>("panel");
  roulete = this.socket.fromEvent<any>("roulete");
  expulsado = this.socket.fromEvent<Usuario>("expulsado");

  replayEverything(){
    this.socket.emit("replayEverything");
console.log("asdkahbjdbasjbsadjadsk");

  }
  updateRoulette(ruleta: any) {
    this.socket.emit("updateSpin", ruleta);
  }

  addUser(user: Usuario) {
    this.socket.emit("addUser", user);
  }
  updatePanel(panel: Panel) {
    this.socket.emit("changePanel", panel);
  }
  updateUsers(users: Usuario[]) {
    this.socket.emit("updateUsers", users);
  }
  checkLogin(password: string) {
    this.socket.emit("checkLogIn", password);
  }
  updateUser(user: Usuario) {
    this.socket.emit("updateUser", user);
  }
  deleteUser(user: Usuario) {
    this.socket.emit("removeUser", user);
  }
  ejectUser(user: Usuario) {
    this.socket.emit("ejectUser", user);
  }
}
