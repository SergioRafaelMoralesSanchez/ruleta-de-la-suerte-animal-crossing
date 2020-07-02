import { Component, OnInit, Input } from "@angular/core";
import { Usuario } from "../../models/usuario";
import { SocketService } from "../../services/socket.service";
declare function updateClicame(): any; // just change here from arun answer.

@Component({
  selector: "app-ruleta",
  templateUrl: "./ruleta.component.html",
  styleUrls: ["./ruleta.component.css"],
})
export class RuletaComponent implements OnInit {
  resultado: string;
  @Input() usuario: Usuario;
  @Input() disabled: boolean;
  aaryPremios = [
    "Quiebra",
    "Premio",
    "x2",
    "1000",
    "se lo doy",
    "quiebra",
    "100",
    "75",
    "comodin",
    "pregunta",
    "500",
    "ayuda final",
    "50",
    "200",
    "1/2",
    "pierde turno",
    "cesta",
    "25",
    "mueble",
    "300",
  ];

  constructor(private socketService: SocketService) {
    this.disabled = true;
  }

  ngOnInit() {}
  aPorElBoteJS() {
    if (this.usuario.canRuleta) {
      const anguloRuleta = updateClicame();
      console.log(anguloRuleta);

      if (anguloRuleta !== -1) {
        this.usuario.resultadoRuleta = this.aaryPremios[
          Math.round(anguloRuleta / 18) === 20
            ? 0
            : Math.round(anguloRuleta / 18)
        ];
        this.usuario.canRuleta = false;
        this.socketService.updateUser(this.usuario);
        this.socketService.updateRoulette({ spin: false, angle: anguloRuleta });
      } else {
        this.socketService.updateRoulette({ spin: true, angle: -1 });
      }
    }
  }
}
