import React from 'react';
import Header from '../../components/header/index';// componentes sempre devem ser usados com letra maiuscula
import { ContentContainer, Form, AdsBlock } from './styles';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';

class homePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {   //serve para manter o estado dos componetes do formulario no tempo de execução
            isLoading: false,
            url: "",
            cod: "",
            errorMessage: "",
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { url } = this.state;

        this.setState({ isLoading: true, errorMessage: "" });

        if (!url) {
            this.setState({ isLoading: false, errorMessage: "informe uma url para encurtar" });
        }
        else {
            try {
                const service = new ShortenerService();
                const result = await service.generate({ url });
                this.setState({ isLoading: false, cod: result.cod });
            } catch (error) {
                this.setState({ isLoading: false, errorMessage: 'Ocorreu algum erro' });

            }
        }
    }

    copyToClipboard = () => {
        const element = this.inputURL;
        element.select(); // seleciona todo conteudo do elemento
        document.execCommand("copy");
    }

    render() {
        const { isLoading, errorMessage, cod } = this.state;
        return (
            <Container>
                <Header>Seu novo encurtador de URL. :</Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder = "Digite a URL para encurtar" // texto que aparece em marca dagua no input
                                defaultValue = ""
                                onChange = {e => this.setState({ url: e.target.value })} //cada vez que esse input tiver uma interação ele atualiza a variavel url na memoria no state
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                                cod && (
                                    <>
                                        <InputGroup className='mb-3'>
                                            <FormControl
                                                autoFocus = {true} //da foco direto nesse input
                                                defaultValue = {`https://micro_saas.tk/${cod}`}
                                                ref = { (input) => this.inputURL = input}
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick = { () => this.copyToClipboard()}>Copiar</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                        <p>Para acompanhar as estatisticas, acesse https://micro_saas.tk/{cod} </p>
                                    </>
                                )
                            )

                        }
                        {errorMessage && <Alert variant= "danger">{errorMessage}</Alert>}
                    </Form>
                </ContentContainer>
                <ContentContainer>
                    <AdsBlock>Adense</AdsBlock>
                </ContentContainer>
            </Container> //conteiner é uma palavra chave do bootstrap funciona como uma div centralizada com estilo
        );
    }

}


export default homePage;