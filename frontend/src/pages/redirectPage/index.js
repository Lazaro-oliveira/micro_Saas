import React from 'react';
import Header from '../../components/header/index';
import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ShortenerService from '../../services/shortenerService';
import {StatsContainer} from './styles';


class redirectPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading:false,
            url:'',
            errorMessage:'',
        }
    } 

    async componentDidMount(){
        const {cod} = this.props.match.params;// quando declaramos uma variavel entre chaves ela era receber o objeto do outro lado com o atributo que corresponde o mesmo nome

        try {
            const service = new ShortenerService();

            const {url} = await service.getLink(cod);

            window.location = url;
            
        } catch (error) {
            this.setState({isLoading:false, errorMessage:'URL não existe'})
            
        }
    }
    

    render(){
        const {errorMessage} = this.state;
        return (
            <Container>
                {errorMessage ? (
                    <>
                        <Header>
                            Seu novo encurtador de urls. :
                        </Header>
                        <StatsContainer className='text-center'>
                            <FontAwesomeIcon size ="3x" color ='#f8d7da' icon ="exclamation-triangle" />
                            <p className ='m-3'>{errorMessage}</p>
                            <a className = 'btn btn-primary' href = '/'>Encurtar nova URL</a>
                        </StatsContainer>
                    </>
                ) : (
                    <p className='text-center'>Redirecionando...</p>
                )

                }
                
            </Container>
            
        );
    }

}


export default redirectPage;