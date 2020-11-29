// neste local desenvolvemos oque as rotas iram fazer de fato, ele recebe as requisições das rotas
import {Request, Response} from 'express'; //importando componentes request e response do express, significam requisição e resposta
import {Link} from '../models/link';
import linksRepository from '../models/linksRepository';


function generateCode(){
    let text = '';
    const possible = 'ABCDEFGHIJLMNOPQRSTUVXZWYKabcdefghijlmnopqrstuvxzwyk0123456789';

    for (let i =0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length)); // pega uma letra aleatorio da string

    return text;
}


async function postLink(req: Request, res: Response){ // aqui se utiliza a tipagem do typescript, criamos a variavel req do tipo request e a res do tipo response
    const link = req.body as Link; // a requisição pede um corpo do tipo link, o "as" é como se fosse um conversor já que o body pode ser qualquer coisa
    link.cod = generateCode();
    link.hits = 0;
    const result = await linksRepository.add(link);

    if(!result.id) return res.sendStatus(400);// retorno caso aja algum erro na inseração no banco

    link.id = result.id;

    res.status(201).json(link);// status 201 na internet significa responder criei oque vc queria, json link é o retorno ao cliente
}

async function hitLink(req: Request, res: Response){
    const cod = req.params.cod as string;
    const link = await linksRepository.hit(cod);

    if(!link)
        res.sendStatus(404);// avisando que página nao foi encontrada
    else
        res.json(link);
}

async function getLink(req: Request, res: Response){
    const cod = req.params.cod as string;
    const link = await linksRepository.findByCode(cod);

    if(!link)
        res.sendStatus(404);// avisando que página nao foi encontrada
    else
        res.json(link);
}


export default{
    postLink,
    getLink,
    hitLink
}