// src/services/LocadoraService.ts
import { Veiculo } from '../models/Veiculo';
import { Cliente } from '../models/Cliente';
import * as fs from 'fs';
import * as readlineSync from 'readline-sync'

interface DadosLocadora {
  veiculos: Veiculo[];
  clientes: Cliente[];
}

export class LocadoraService {
  private dados: DadosLocadora = {
    veiculos: [],
    clientes: [],
  };  

  constructor() {
    // Carregar dados do arquivo JSON
    this.carregarDados();
  }

  private salvarDados(): void {
    const data = {
      veiculos: this.dados.veiculos,
      clientes: this.dados.clientes,
    };

    fs.writeFileSync('./data/veiculos.json', JSON.stringify(data, null, 2));
  }

  private carregarDados(): void {
    try {
      const data = fs.readFileSync('./data/veiculos.json', 'utf-8');
      this.dados = JSON.parse(data);
    } catch (error) {
      console.log('Erro ao carregar dados. Inicializando com arrays vazios.');
    }
  }

  cadastrarVeiculo(veiculo: Veiculo): void {
    const veiculoExistente = this.dados.veiculos.find((v) => v.placa === veiculo.placa);

    if (!veiculoExistente) {
      this.dados.veiculos.push(veiculo);
      this.salvarDados();
      console.log('Veículo cadastrado com sucesso.');
    } else {
      console.log('Veículo com esta placa já cadastrado.');
    }
  }

  alugarVeiculo(cliente: Cliente): void {
    // Verificar se o cliente já está alugando um veículo
    if (cliente.veiculoAlugado) {
      console.log(`O cliente ${cliente.nome} já está alugando um veículo.`);
      return;
    }

    // Filtrar os veículos disponíveis
    const veiculosDisponiveis = this.dados.veiculos.filter((veiculo) => !veiculo.alugado);

    // Verificar se há veículos disponíveis
    if (veiculosDisponiveis.length === 0) {
      console.log('Não há veículos disponíveis para aluguel.');
      return;
    }

    // Mostrar opções ao usuário
    console.log('Veículos Disponíveis para Aluguel:');
    veiculosDisponiveis.forEach((veiculo, index) => {
      console.log(`${index + 1}. Placa: ${veiculo.placa}, Modelo: ${veiculo.modelo}`);
    });

    // Solicitar a escolha do usuário usando readline-sync
    const escolha = readlineSync.questionInt(`Escolha um veículo (1-${veiculosDisponiveis.length}):`);

    // Validar a escolha
    if (escolha < 1 || escolha > veiculosDisponiveis.length) {
      console.log('Escolha inválida.');
      return;
    }

    // Alugar o veículo escolhido
    const veiculoEscolhido = veiculosDisponiveis[escolha - 1];
    veiculoEscolhido.alugado = true;

    // Atualizar os veículos na lista de dados
    this.dados.veiculos = this.dados.veiculos.map((veiculo) =>
      veiculo.placa === veiculoEscolhido.placa ? veiculoEscolhido : veiculo
    );

    // Adicionar cliente à lista de clientes
    cliente.veiculoAlugado = veiculoEscolhido;
    this.dados.clientes.push(cliente);

    this.salvarDados();
    console.log(`Veículo de placa ${veiculoEscolhido.placa} alugado por ${cliente.nome}.`);
  }  

  devolverVeiculo(cliente: Cliente): void {
    // Falta Implementar as regras de negócio aqui ...

    const veiculoAlugado = cliente.veiculoAlugado;

    if (veiculoAlugado) {
      veiculoAlugado.alugado = false;
      cliente.veiculoAlugado = null;
      this.salvarDados();
      console.log(`Veículo de placa ${veiculoAlugado.placa} devolvido por ${cliente.nome}.`);
    } else {
      console.log(`Cliente ${cliente.nome} não está alugando nenhum veículo.`);
    }
  }

  listarVeiculosDisponiveis(): void {
    // Ler os dados do arquivo JSON
    const data = this.lerArquivoJSON();

    // Filtrar os veículos disponíveis
    const veiculosDisponiveis = data.veiculos.filter((veiculo: Veiculo) => !veiculo.alugado);

    // Mostrar os veículos disponíveis
    console.log('Veículos Disponíveis:');
    veiculosDisponiveis.forEach((veiculo: Veiculo) => {
      console.log(`Placa: ${veiculo.placa}, Modelo: ${veiculo.modelo}`);
    });
  }

  listarVeiculosAlugados(): void {
    // Ler os dados do arquivo JSON
    const data = this.lerArquivoJSON();

    // Filtrar os veículos alugados
    const veiculosAlugados = data.veiculos.filter((veiculo: Veiculo) => veiculo.alugado);

    // Mostrar os veículos alugados
    console.log('Veículos Alugados:');
    veiculosAlugados.forEach((veiculo: Veiculo) => {
      const clienteAluguel = data.clientes.find((cliente: Cliente) => cliente.veiculoAlugado?.placa === veiculo.placa);
      console.log(`Placa: ${veiculo.placa}, Modelo: ${veiculo.modelo}, Alugado por: ${clienteAluguel?.nome || 'Desconhecido'}`);
    });
  }

  private lerArquivoJSON(): any {
    const arquivoPath = './data/veiculos.json';

    try {
      const data = fs.readFileSync(arquivoPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao ler o arquivo JSON:', error.message);
      } else {
        console.error('Erro ao ler o arquivo JSON:', error);
      }
      return {};
    }
  }  
}
