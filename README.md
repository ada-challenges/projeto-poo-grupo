# POO - ADA | Vem Ser Tech - Back End

## Enunciado:

### Atividade em grupo

Sua equipe foi contratada para desenvolver um sistema para uma locadora de veículos, a locadora terá apenas 1 loja, então o sistema devera ser único para essa loja, não se preocupando em ter varias lojas cadastradas. Dito isso, o cliente trouxe algumas regras de negócio, elas são:

- Não pode ser cadastrado nenhum veículo com a mesma placa que outro veículo ja cadastrado no sistema.
- Para o cliente alugar um veículo, ele precisa informar apenas o **nome**, **cpf** e o **tipo da carteira**.
- Ao alugar um veículo, se o tipo da carteira do cliente for **A**, ele só podera alugar uma moto, e se for **B**, ele só podera alugar um carro.
- Para devolver o veículo será necessário receber apenas o **cpf** do cliente.
- Não deve ser permitido excluir um veículo que esteja sendo alugado.
- Um cliente só pode alugar 1 veículo por vez, então para alugar outro, ele não deve estar alugando nenhum outro veículo no momento.
- Ao alugar um veículo, deve fazer um calculo que será o **valor da diaria _ dias a serem alugados _ acrescimo do tipo do veiculo**, carros terão um acrescimo de **10%**, enquanto motos de **5%**.

### Sistema

O sistema do cliente, deve ser desenvolvido utilizando node/typescript e os dados deverão ser salvos em um arquivo json. O sistema possuirá o seguinte menu de funcionalidades:

1. Cadastrar veículo
2. Alugar veículo
3. Devolver veículo
4. Listar veículos disponiveis
5. Listar veículos alugados
6. Sair
