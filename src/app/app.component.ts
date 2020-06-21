import { Component, OnInit } from "@angular/core";
import { preserveWhitespacesDefault } from "@angular/compiler";
import { SocketService } from "./services/socket.service";
import { Usuario } from "./models/usuario";
import { Recompensas } from "./models/recompensas";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
