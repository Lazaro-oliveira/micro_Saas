import Sequelize, { Model, Optional } from 'sequelize'; // biblioteca de banco de dados
import {Link} from './link';
import database from '../database';

interface ILinkCreationAttributes extends Optional<Link, 'id'>{} // aqui se diz que quando for criar um novo link o id é opcional

export interface ILinkModel extends Model<Link, ILinkCreationAttributes>, Link {}


const linkModel = database.define<ILinkModel>('link', { // aqui se fala que a tabela deve obedecer o molde criando no {Link} que veio no import
    id:{
        type: Sequelize.INTEGER.UNSIGNED,   // UNSIGNED significa positivo
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url:{
        type: Sequelize.STRING(255),
        allowNull: false
    },
    cod:{
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    hits:{
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }
});

export default linkModel;