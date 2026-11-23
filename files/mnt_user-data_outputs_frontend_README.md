# Frontend - CRUD de Tarefas

App em React Native (Expo) que consome a API de tarefas e permite **cadastrar, listar, editar e excluir** registros.

## Requisitos

- Node.js (versão LTS) - https://nodejs.org
- Backend rodando (veja o README do repositório do backend)
- Expo Go no celular (opcional) ou navegador

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Abra o `App.js` e ajuste a constante `API_URL` conforme onde você vai abrir o app:

   | Onde vai abrir            | API_URL                          |
   | ------------------------- | -------------------------------- |
   | Navegador / emulador iOS  | `http://localhost:3000`          |
   | Emulador Android          | `http://10.0.2.2:3000`           |
   | Celular físico (Expo Go)  | `http://IP-DO-SEU-PC:3000`       |

   No celular físico, o celular e o computador precisam estar na mesma rede Wi-Fi.

3. Com o backend rodando, inicie o app:

   ```bash
   npx expo start
   ```

   Aperte `w` para abrir no navegador, ou escaneie o QR code com o Expo Go.

   Se o modo web pedir dependências, rode `npx expo install react-dom react-native-web`.

## Funcionalidades

- Cadastrar tarefa (título e descrição)
- Listar tarefas
- Editar tarefa (botão Editar preenche o formulário)
- Excluir tarefa
