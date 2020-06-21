import { Component, OnInit, Input } from "@angular/core";
import { Usuario } from "../../models/usuario";
import { SocketService } from "../../services/socket.service";
import { UserPanelComponent } from "../../pages/user-panel/user-panel.component";
declare function updateClicame(): any; // just change here from arun answer.

@Component({
  selector: "app-ruleta",
  templateUrl: "./ruleta.component.html",
  styleUrls: ["./ruleta.component.css"],
})
export class RuletaComponent implements OnInit {
  resultado: string;
  @Input() usuario: Usuario;

  constructor(private socketService: SocketService) {}

  ngOnInit() {}
  aPorElBoteJS() {
    if (this.usuario.canRuleta) {
      this.usuario.resultadoRuleta = updateClicame();
      if (this.usuario.resultadoRuleta !== "") {
        this.usuario.canRuleta = false;
        this.socketService.updateUser(this.usuario);
      }
    }
  }
  lanzarRuleta(resultado: string) {
    this.usuario.resultadoRuleta =
      "_" + Math.random().toString(36).substr(2, 9);
    this.usuario.canRuleta = false;
  }
}
