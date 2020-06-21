import { Component, OnInit, HostListener } from "@angular/core";
import { preserveWhitespacesDefault } from "@angular/compiler";
import { Usuario } from "src/app/models/usuario";
import { SocketService } from "../../services/socket.service";
import { Recompensas } from "src/app/models/recompensas";
import { Panel } from "../../models/panel";
import { NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"],
})
export class AdminPanelComponent implements OnInit {
  logged = false;
  adminPanel = new Panel(
    "sala",
    ["VOY CONTIGO ", "  PIPO Y CON  ", "JAMON DE YO "],
    [],
    "Me cago en la leche Merche",
    ""
  );
  title = "PasaPalabra";
  text = "voy contigo pipo y con jamon de yo";
  showText = false;
  adminUser: Usuario;
  currentUserIndex: number;
  currentUserReward: number;
  rewards: any;
  imgs = ["bayas", "cerezas", "casco", "mueble", "ayuda"];
  usuarios: Usuario[];
  constructor(public socketService: SocketService, private router: Router) {}
  ngOnInit(): void {
    this.vamohAEllo();
    this.adminUser = new Usuario(
      "99",
      true,
      "Mariche la mas Mejor",
      "sala",
      "red",
      new Recompensas(0, 0, 0, 0, 0),
      new Recompensas(0, 0, 0, 0, 0),
      false,
      false,
      ""
    );
    this.doSocketServices();
    this.socketService.time.subscribe((hora) => {
      console.log(hora);
    });
  }
  doSocketServices() {
    this.checkLogin();
    this.socketService.addUser(this.adminUser);
    this.socketService.users.subscribe((users) => {
      console.log("usuarios");
      this.usuarios = users;
    });
    this.socketService.currentUser.subscribe((user) => {
      this.adminUser = user;
    });
  }
  checkLogin() {
    Swal.fire({
      title: "Introduce la contraseña para acceder al Panel de administrador",
      input: "password",
      allowOutsideClick: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      confirmButtonText: "¡Vamos allá!",
      showLoaderOnConfirm: true,
      inputValidator: (password: string) => {
        if (password.trim().length <= 3) {
          return "La contraseña debe de contener al menos 4 caracteres";
        }
        this.socketService.checkLogin(password);
        this.socketService.logInResponse.subscribe((result) => {
          if (!result) {
            this.checkLogin();
          } else {
            this.logged = result;
          }
        });
      },
    });
  }
  vamohAEllo() {
    this.adminPanel.texto = [""];
    this.text = this.text.toUpperCase();
    this.generatePermitedChars();
    this.text.split(" ").forEach((word, index) => {
      this.givemeThaRow(word.trim(), index, this.text.split(" ").length);
    });
    this.checkLastLines();
    this.cleanWords();
  }
  cleanWords(): void {
    let maximum = 12;
    this.adminPanel.texto = this.adminPanel.texto.map((row, index) => {
      if (index > 0 && index < this.adminPanel.texto.length - 1) {
        maximum = 14;
      } else {
        maximum = 12;
      }
      let charsToFill = maximum - row.length;
      while (charsToFill > 0) {
        if (charsToFill % 2 !== 0) {
          row += " ";
        } else {
          row = " " + row;
        }
        charsToFill--;
      }
      return row;
    });
  }
  givemeThaRow(textToEncastrar: string, indice, longitud) {
    let row = this.adminPanel.texto.length - 1;
    let maximum = 12;
    while (true) {
      if (row >= 1) {
        maximum = 14;
      } else {
        maximum = 12;
      }
      if (
        this.adminPanel.texto[row].length + textToEncastrar.length + 1 <=
          maximum ||
        (this.adminPanel.texto[row].length === 0 &&
          textToEncastrar.length === 14)
      ) {
        if (this.adminPanel.texto[row].length === 0) {
          this.adminPanel.texto[row] += textToEncastrar;
        } else {
          this.adminPanel.texto[row] += " " + textToEncastrar;
        }
        break;
      } else {
        if (textToEncastrar.length > 14) {
          break;
        }
        row = this.adminPanel.texto.length;
        this.adminPanel.texto[this.adminPanel.texto.length] = "";
      }
    }
  }

  giveMeClass(char) {
    if (char === " ") {
      return "card blue";
    } else {
      return "card white";
    }
  }
  checkLastLines() {
    console.log(this.adminPanel.texto[this.adminPanel.texto.length - 1]);
    if (this.adminPanel.texto[this.adminPanel.texto.length - 1].length >= 12) {
      const lastLineArry = this.adminPanel.texto[
        this.adminPanel.texto.length - 1
      ].split(" ");

      this.adminPanel.texto[this.adminPanel.texto.length - 1] = "";
      lastLineArry.forEach((word) => {
        if (
          this.adminPanel.texto[this.adminPanel.texto.length - 1].length +
            word.length +
            1 <=
          12
        ) {
          this.adminPanel.texto[this.adminPanel.texto.length - 1] += " " + word;
        } else {
          if (
            this.adminPanel.texto[this.adminPanel.texto.length] === undefined
          ) {
            this.adminPanel.texto[this.adminPanel.texto.length] = word;
          } else {
            this.adminPanel.texto[this.adminPanel.texto.length] += " " + word;
          }
        }
      });
    }
  }
  generatePermitedChars() {
    if (!this.showText) {
      this.adminPanel.charsPermitted = [...new Set(this.text.split(""))];
      this.adminPanel.charsPermitted.sort();
    } else {
      this.adminPanel.charsPermitted = [];
    }
  }

  filterCharacters(char) {
    if (this.showText) {
      return char;
    }
    if (!this.adminPanel.charsPermitted.includes(char)) {
      return char;
    } else {
      return "";
    }
  }
  deleteFromPremited(char) {
    this.adminPanel.charsPermitted = this.adminPanel.charsPermitted.filter(
      (charact) => charact !== char
    );
  }
  updatePanel() {
    this.socketService.updatePanel(this.adminPanel);
  }
  updateUsers() {
    console.log(this.usuarios);
    this.socketService.updateUsers(this.usuarios);
  }

  givemePointed(index: number, recompensa: number) {
    if (
      this.currentUserIndex !== undefined &&
      this.currentUserIndex === index &&
      recompensa === this.currentUserReward
    ) {
      return "icoReward selected";
    } else {
      return "icoReward";
    }
  }
  cargarRecompensasUsuario(index: number, recompensa: number) {
    if (
      this.currentUserReward === recompensa &&
      this.currentUserIndex === index
    ) {
      this.currentUserReward = undefined;
      this.currentUserIndex = undefined;
    } else {
      this.currentUserReward = recompensa;
      this.currentUserIndex = index;
    }
  }
  inputCheckUser(user: Usuario, reward: number) {
    return (
      this.currentUserIndex !== undefined &&
      user.id === this.usuarios[this.currentUserIndex].id &&
      this.currentUserReward === reward
    );
  }
  cambiarturno(user: Usuario) {
    console.log("asdassdaasd");
    this.usuarios = this.usuarios.map((usr) => {
      usr.id === user.id ? (usr.isTurno = user.isTurno) : (usr.isTurno = false);
      return usr;
    });
  }
  @HostListener("window:beforeunload")
  doSomething() {
    this.socketService.deleteUser(this.adminUser);
  }
}
