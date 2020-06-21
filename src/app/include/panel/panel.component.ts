import { Component, OnInit, Input } from "@angular/core";
import { SocketService } from "../../services/socket.service";
import { Panel } from "../../models/panel";
@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.css"],
})
export class PanelComponent implements OnInit {
  @Input() panel: Panel;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
  }
  giveMeClass(char: string, i: number, j: number) {
    let position = "";
    if (i === 0) {
      position = "cardBorderTop";
    } else if (i === this.panel.texto.length - 1) {
      position = "cardBorderBottom";
    } else if (j === 0 && i !== 0) {
      position = "cardMiddleLeft";
    } else if (
      i !== 0 &&
      i !== this.panel.texto.length - 1 &&
      j === this.panel.texto[i].length - 1
    ) {
      position = "cardMiddleRight";
    }
    if (char === " ") {
      return "card blue " + position;
    } else {
      return "card white " + position;
    }
  }
  filterCharacters(char: string) {
    if (!this.panel.charsPermitted.includes(char)) {
      return char;
    } else {
      return "";
    }
  }

  giveMeThaClassNinja(index: number, position: string) {
    if (index === 0) {
      return "card ninja ninjaTop" + position;
    } else {
      return "card ninja ninjaBottom" + position;
    }
  }
}
