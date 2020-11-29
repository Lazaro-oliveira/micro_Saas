import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('mysql://root:Micro-Saas123@localhost:3306/micro_saas');
/* acima fica a string para conectar no banco, primeiro vem o banco:// depois o usuario terminado com : depois a senha terminado por @ depois endereço do servidor terminado com : 
depois a porta do servidor terminado por / e depois o nome do banco*/


export default sequelize;