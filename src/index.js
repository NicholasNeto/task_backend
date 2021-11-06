const express = require('express');
const cors = require('cors');
const { v4: uuidV4 } = require('uuid');

// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers
    const user = users.find((user) => user.username === username)

    if (!user) {
        return response.status(400).json({ error: 'User not found' })
    }

    request.user = user;

    console.log('request.user', request.user)

    return next();
}

/*

A rota deve receber name, e username dentro do corpo da requisição. 
Ao cadastrar um novo usuário, ele deve ser armazenado dentro de um objeto no seguinte formato:  

{ 
  id: 'uuid', // precisa ser um uuid
  name: 'Danilo Vieira', 
  username: 'danilo', 
  todos: []
}


*/


app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.find(user => user.username === username);

  if (userAlreadyExists) {
    return response.status(400).json({ error: "User Already Exists" })
  }

  const user = {
    id: uuidV4(),
    name,
    username,
    todos: []
  }

  users.push(user)
  return response.status(201).json(user)

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;