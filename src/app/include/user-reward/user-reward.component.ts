import { Component, OnInit, Input } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { Usuario } from "src/app/models/usuario";

@Component({
  selector: "app-user-reward",
  templateUrl: "./user-reward.component.html",
  styleUrls: ["./user-reward.component.css"],
  animations: [
    trigger("TurnoUsuario", [
      state(
        "true",
        style({
          border: "5px solid black",
          borderRadius: "10px",
          padding: "5px",
          borderStyle: "dashed",
        })
      ),
      state(
        "false",
        style({
          border: "5px solid black",
          borderRadius: "10px",
          padding: "5px",
        })
      ),
      state(
        "nah",
        style({
          padding: "5px",
        })
      ),
      state("", style({})),
      transition("true => false", animate("100ms ease-in")),
      transition("false => true", animate("100ms ease-out")),
      transition("false => nah", animate("100ms ease-out")),
      transition("true => nah", animate("100ms ease-out")),
    ]),
  ],
})
export class UserRewardComponent implements OnInit {
  @Input() usuario: Usuario;
  estateAnimation = "nah";
  constructor() {}

  ngOnInit() {
    setInterval(() => {

      if (this.usuario.isTurno) {
        this.estateAnimation =
          this.estateAnimation !== this.usuario.isTurno + "" ? "true" : "false";
      } else {
        this.estateAnimation = "nah";
      }
    }, 800);
  }
}
