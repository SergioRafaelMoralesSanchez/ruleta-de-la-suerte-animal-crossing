import { Component, OnInit } from "@angular/core";
import { Panel } from "../../models/panel";
import { Usuario } from "../../models/usuario";
import { SocketService } from "../../services/socket.service";
import { Recompensas } from "src/app/models/recompensas";
declare var spinMe: any; // just change here from arun answer.
declare function updateClicame(): any; // just change here from arun answer.

@Component({
  selector: "app-viewer-panel",
  templateUrl: "./viewer-panel.component.html",
  styleUrls: ["./viewer-panel.component.css"],
})
export class ViewerPanelComponent implements OnInit {
  usuarios: Usuario[];
  publico = this.shuffle(Array(15).fill(0).map((x, i) => i + 1));
  panelActual = new Panel(
    "",
    ["VOY CONTIGO ", "  PIPO Y CON  ", "JAMON DE YO "],
    [" ", "A", "C", "D", "E", "G", "I", "J", "M", "N", "O", "P", "T", "V", "Y"],
    "",
    ""
  );
  constructor(private socketService: SocketService) {
    this.usuarios = [new Usuario(
      null,
      "",
      "",
      "",
      new Recompensas(0, 0, 0, 0, 0),
      new Recompensas(0, 0, 0, 0, 0),
      false,
      false,
      ""
    ),];
    console.log(this.publico);

  }
  ngOnInit() {

    this.socketService.currentPanel.subscribe((panel) => {
      this.panelActual = panel;
    });
    this.socketService.replayEverything();
    this.socketService.roulete.subscribe((roulete) => {
      if (roulete.spin) {
        updateClicame();
      } else {
        updateClicame();
        spinMe(roulete.angle);
      }
    });
    this.socketService.users.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
