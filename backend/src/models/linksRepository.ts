import linkModel, {ILinkModel} from './linkModel';
import {Link} from './link';


function findByCode(cod: string){
    return linkModel.findOne<ILinkModel>({ where: { cod } });
}

function add(link: Link){
    return linkModel.create<ILinkModel>(link);

}

async function hit(cod:string){ // async e await são usados juntos quando o sistema deve parar pra esperar o retorno de uma função "demorada" como uma consulta no banco
    const link = await findByCode(cod);
    
    if(!link) return null;

    link.hits!++; // o exclamação é apenas pra informar pro programa que a variavel não vai ser nula, se tirar o visual studio reclama de erro

    await link.save(); // salva o incremento no banco, o await força o programa a esperar o salvamento

    return link;

}

export default{
    findByCode,
    add,
    hit
}