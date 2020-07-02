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
})
export class UserRewardComponent implements OnInit {
  @Input() usuario: Usuario;
  constructor() {}

  ngOnInit() {}
}
