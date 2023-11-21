// src/index.ts
import * as readlineSync from 'readline-sync';
import { LocadoraService } from './services/LocadoraService';
import { Veiculo } from './models/Veiculo';
import { Cliente } from './models/Cliente';

const locadoraService = new LocadoraService();

function exibirMenu(): void {
  console.log('--- Menu ---');
  console.log('1. Cadastrar veículo');
  console.log('2. Alugar veículo');
  console.log('3. Devolver veículo');
  console.log('4. Listar veículos disponíveis');
  console.log('5. Listar veículos alugados');
  console.log('6. Sair');
}

function main(): void {
  while (true) {
    exibirMenu();
    const opcao = readlineSync.question('Escolha uma opcao: ');

    switch (opcao) {
      case '1':
        // Lógica para cadastrar veículo
        const placaVeiculo = readlineSync.question('Informe a placa do veículo: ');
        const modeloVeiculo = readlineSync.question('Informe o modelo do veiculo: ');
        const veiculo = new Veiculo(placaVeiculo, modeloVeiculo);
        locadoraService.cadastrarVeiculo(veiculo);
        break;

      case '2':
        // Lógica para alugar veículo
        const nomeCliente = readlineSync.question('Informe o nome do cliente: ');
        const cpfCliente = readlineSync.question('Informe o CPF do cliente: ');
        const tipoCarteira = readlineSync.question('Informe o tipo da carteira (A/B): ');

        const cliente = new Cliente(nomeCliente, cpfCliente, tipoCarteira as 'A' | 'B');       

        // Método para alugar o veículo
        locadoraService.alugarVeiculo(cliente);

        break;

      case '3':
        // Falta colocar a Lógica para devolver veículo
        const cpfClienteDevolucao = readlineSync.question('Informe o CPF do cliente: ');

        // Lógica para devolver o veículo do cliente
        break;

      case '4':
        // Lógica para listar veículos disponíveis
        locadoraService.listarVeiculosDisponiveis();
        break;

      case '5':
        // Lógica para listar veículos alugados
        locadoraService.listarVeiculosAlugados();
        break;

      case '6':
        // Sair do programa
        console.log('Saindo do programa. Até mais!');
        process.exit(0);        

      default:
        console.log('Opção inválida. Tente novamente.');
        break;
    }
  }
}

main();