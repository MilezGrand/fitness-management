import express from "express";
import cors from 'cors';
import * as UserController from './controllers/UserController.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/clients', UserController.getAllClients);
app.get('/clients/:id', UserController.getOneClient);
app.delete('/clients/:id', UserController.deleteClient);
app.post('/clients', UserController.addNewClient);
app.get('/service/:id', UserController.getServices);
app.post('/service', UserController.addServiceToClient);
app.put('/clients/:id', UserController.updateClient);

app.listen(4000, (err) => {
  if (err) {
      return console(err);
  }
  console.log("Server OK");
});