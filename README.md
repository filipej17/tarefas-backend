# Backend - CRUD de Tarefas

API REST em Node.js + Express + Mongoose para o app de tarefas (frontend em React Native/Expo).

## Requisitos

- Node.js (versão LTS) - https://nodejs.org
- Uma conta gratuita no MongoDB Atlas - https://www.mongodb.com/atlas

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto, copiando o `.env.example`, e preencha `MONGO_URI` com a string de conexão do seu cluster do MongoDB Atlas:

   ```
   MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/tarefas?retryWrites=true&w=majority
   PORT=3000
   ```

   No Atlas: crie um cluster gratuito (M0), crie um usuário de banco em *Database Access*, libere o acesso em *Network Access* (0.0.0.0/0) e copie a string em *Connect > Drivers*.

3. Inicie o servidor:

   ```bash
   npm start
   ```

   Se tudo estiver certo, o terminal mostra `Conectado ao MongoDB` e `API rodando na porta 3000`.

## Rotas

| Método | Rota             | Descrição          |
| ------ | ---------------- | ------------------ |
| GET    | `/tarefas`       | Lista as tarefas   |
| POST   | `/tarefas`       | Cadastra uma tarefa |
| PUT    | `/tarefas/:id`   | Edita uma tarefa   |
| DELETE | `/tarefas/:id`   | Exclui uma tarefa  |

Corpo do POST/PUT (JSON):

```json
{ "titulo": "Estudar React Native", "descricao": "Terminar a atividade" }
```

## Frontend

O app que consome esta API está no repositório do frontend. Rode o backend antes de abrir o app.
