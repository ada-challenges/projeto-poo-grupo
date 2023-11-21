import { Veiculo } from '../models/Veiculo';

export class Cliente {
  nome: string;
  cpf: string;
  tipoCarteira: 'A' | 'B';
  veiculoAlugado: Veiculo | null;

  constructor(nome: string, cpf: string, tipoCarteira: 'A' | 'B') {
    this.nome = nome;
    this.cpf = cpf;
    this.tipoCarteira = tipoCarteira;
    this.veiculoAlugado = null;
  }
}
  