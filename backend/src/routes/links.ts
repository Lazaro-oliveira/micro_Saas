import {Router} from 'express'; // importando somente o componente Router da biblioteca express
import linksController from '../controllers/links';

const router = Router();

router.post('/links', linksController.postLink); // comando post envia para o servidor, ele pede os parametros rota alem da requisição e resposta, requisição e resposta está vindo do links no controler
    

router.get('/links/:cod', linksController.hitLink); // no get vamos especificar qual a variavel que sera buscada no link, pra isso usamo o ":NOME da variavel"
 

router.get('/links/:cod/stats', linksController.getLink);


export default router;