import { Component, OnInit, HostListener } from "@angular/core";
import { Usuario } from "../../models/usuario";
import { Recompensas } from "src/app/models/recompensas";
import { SocketService } from "../../services/socket.service";
import { Panel } from "../../models/panel";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-panel",
  templateUrl: "./user-panel.component.html",
  styleUrls: ["./user-panel.component.css"],
})
export class UserPanelComponent implements OnInit {
  userPanel: Panel;
  indexUsuario: number;
  usuarios: Usuario[];
  usuario: Usuario;
  ready = false;
  first = new Panel(
    "",
    ["VOY CONTIGO ", "  PIPO Y CON  ", "JAMON DE YO "],
    [" ", "A", "C", "D", "E", "G", "I", "J", "M", "N", "O", "P", "T", "V", "Y"],
    "",
    ""
  );
  constructor(private socketService: SocketService, private router: Router) {
    this.indexUsuario = 0;
  }

  ngOnInit() {
    this.socketService.currentPanel.subscribe((panel) => {
      this.userPanel = panel;
      this.ready = true;
    });

    this.requestName();

    this.socketService.currentUser.subscribe((userUpdated) => {
      if (userUpdated.id === null) {
        Swal.fire({
          icon: "error",
          title: "Ya estamos todos",
          text: "Solo podemos jugar 3 jugadores, Disculpe las molestias",
        }).then(() => {
          this.router.navigateByUrl("/");
        });
      }
      this.usuario = userUpdated;
    });

    this.socketService.users.subscribe((usuarios) => {
      usuarios.forEach((user) => {
        if (user.id === this.usuario.id) {
          this.usuario = user;
        }
      });
      this.usuarios = usuarios;
    });
  }
  @HostListener("window:beforeunload")
  doSomething() {
    this.socketService.deleteUser(this.usuario);
  }
  requestName() {
    Swal.fire({
      title: "¿Como quieres que te llamemos?",
      input: "text",
      inputPlaceholder: "Introduce como te llamas",
      allowOutsideClick: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      confirmButtonText: "¡Vamos allá!",
      showLoaderOnConfirm: true,
      inputValidator: (nombre: string) => {
        if (nombre.trim().length <= 3) {
          return "El nombre debe de contener al menos 4 caracteres";
        }
        this.usuario = new Usuario(
          null,
          false,
          nombre,
          "",
          "",
          new Recompensas(0, 0, 0, 0, 0),
          new Recompensas(0, 0, 0, 0, 0),
          false,
          false,
          ""
        );
        this.socketService.addUser(this.usuario);
      },
    });
  }
}
