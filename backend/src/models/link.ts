export type Link = {  //estamos usando aqui typescript, criamos o tipo Link
    id?: number,    // o'?' no final da variavel significa que ela é opcional
    url: string,
    cod?: string,   // versão curta do link
    hits?: number    // hits e um contador de quantas vezes o link foi acessado
}