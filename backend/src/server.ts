import app from './app';
import database from './database';

database.sync(); // sincroniza a aplicação com o banco de dados, o force: true força a criação de tabelas, se já existirem ele destroi e recria, use sem este parametro em produção
console.log("database rodando");

app.listen(3001); // a aplicação estara escutando na porta 3001

console.log('servidor rodando na porta 3001');