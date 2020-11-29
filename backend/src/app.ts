import express from 'express';
import linksRouter from './routes/links';
import cors from 'cors'; // biblioteca para comunicação do front com o backend

const app = express(); // a variavel app se torna uma aplicação express

app.use(express.json()); // a aplicação recebe e retorna json

app.use(cors());

app.use(linksRouter);

export default app;