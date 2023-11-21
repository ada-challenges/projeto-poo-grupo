export class Veiculo {
  placa: string;
  alugado: boolean;
  modelo: string;

  constructor(placa: string, modelo: string) {
    this.placa = placa;
    this.alugado = false;
    this.modelo = modelo;
  }
}
  