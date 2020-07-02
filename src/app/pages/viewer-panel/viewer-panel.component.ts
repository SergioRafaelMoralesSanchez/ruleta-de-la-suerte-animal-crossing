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
  panelActual = new Panel(
    "",
    ["VOY CONTIGO ", "  PIPO Y CON  ", "JAMON DE YO "],
    [" ", "A", "C", "D", "E", "G", "I", "J", "M", "N", "O", "P", "T", "V", "Y"],
    "",
    ""
  );

  constructor(private socketService: SocketService) {
    this.usuarios = [];
  }
  ngOnInit() {
    this.socketService.currentPanel.subscribe((panel) => {
      this.panelActual = panel;
    });
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
}
