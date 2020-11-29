import React from 'react';
import Header from '../../components/header/index';
import {Container} from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {StatsContainer, StatsRow, StatsBox, StatsBoxTitle} from './styles';
import {parseISO, formatRelative} from 'date-fns';  // biblioteca que meche com datas
import ptBR from 'date-fns/locale/pt-BR';

class statsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortenedURL: {},//quando criamos assim podemos inserir novas propriedades na variavel infinitamente
            errorMessage: '',
        }
    } 

    async componentDidMount(){

        const {cod} = this.props.match.params;
        
        try {
            const service = new ShortenerService();
            const shortenedURL = await service.getStats(cod);

            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();
            const relativeDate = formatRelative(parsedDate, currentDate,{// essa função mostra de uma maneira bonita o ultimo acesso
                locale: ptBR,
            });

            shortenedURL.relativeDate = relativeDate;  // inserindo propriedade relativeDate na variavel

            this.setState({ isLoading: false, shortenedURL});
        } catch (error) {
            this.setState({ isLoading: false, errorMessage: 'A URL não existe'});
        }
    }

    render(){
        const {errorMessage, shortenedURL} = this.state;
        return (
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer className='text-center'>
                        <FontAwesomeIcon size ="3x" color ='#f8d7da' icon ="exclamation-triangle" />
                        <p className ='m-3'>{errorMessage}</p>
                        <a className = 'btn btn-primary' href = '/'>Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer className='text-center'>
                        <p><b>https://micro_saas.tk/{shortenedURL.cod}</b></p>
                        <p>Redireciona para: <br/>{shortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{shortenedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <b>{shortenedURL.relativeDate}</b>
                                <StatsBoxTitle>Última visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className='btn btn-primary' href='/'>Encurtar nova URL</a>
                    </StatsContainer>
                    
                )}
                    
            </Container>
        );
    }

}


export default statsPage;   