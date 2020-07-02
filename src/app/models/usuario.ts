import { Recompensas } from "./recompensas";
export class Usuario {
  constructor(
    public id: string,
    public nombre: string,
    public room: string,
    public color: string,
    public rondaActual: Recompensas,
    public rondaTotal: Recompensas,
    public canRuleta: boolean,
    public isTurno: boolean,
    public resultadoRuleta: string,

  ) {}
}
