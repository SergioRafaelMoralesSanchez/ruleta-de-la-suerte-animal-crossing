export class Panel {
  constructor(
    public room: string,
    public texto: string[],
    public charsPermitted: string[],
    public spoiler: string,
    public nombreRonda: string
  ) {}
}
