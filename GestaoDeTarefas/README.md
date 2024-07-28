# Documentando o código 

### Configuração do projeto
Para este projeto, utilizei o banco de dados SQL Server e o Entity Framework como ORM (Object-Relational Mapping). Devido ao fato de que Task é uma palavra reservada no .NET, utilizei o nome Activity para representar minhas tarefas.

### Criação do repositório
O repositório foi criado para fazer a ponte entre o banco de dados e o serviço, facilitando o acesso aos dados e mantendo a lógica de acesso ao banco de dados encapsulada aqui. Isso garante uma melhor execução e manutenção do código, separando a lógica de dados da lógica de negócios.

### Uso de Service para lógica de legócio
A lógica de negócios foi movida para o serviço para manter a separação entre a lógica de negócios e o cliente. O serviço utiliza o repositório para realizar as operações necessárias com a entidade Activity, mantendo a lógica de negócios desacoplada da camada de acesso a dados.

### Controller para lidar com os metodos HTTP
Utilizei a arquitetura REST para estruturar os controladores, facilitando a interação com os métodos HTTP (GET, POST, PUT, DELETE).

### Problemas e decisões 
Enfrentei um problema ao criar atividades, onde o dueDate estava vindo com um valor default depois do envio do front end. Decidi receber esse dado como string e fazer a conversão para o formato de data no serviço, garantindo a correta formatação e evitando problemas relacionados ao valor padrão.
