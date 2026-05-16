# Portfólio Pessoal | Enuk Nogueira

Bem-vindo ao repositório do meu portfólio. Este projeto foi desenvolvido com um duplo objetivo: criar um espaço para apresentar minha trajetória profissional e, ao mesmo tempo, servir como um caso de uso prático de **Engenharia de Prompt**.

Para o desenvolvimento, trabalhei em conjunto com o **Antigravity**, um agente de Inteligência Artificial do Google DeepMind. O foco foi explorar até que ponto é possível guiar uma IA autônoma na construção de uma arquitetura web limpa, funcional e sem depender de bibliotecas externas.

## A Aplicação de Engenharia de Prompt

Durante a construção do projeto, evitei comandos genéricos. Para alcançar o resultado atual, estruturei a interação com a IA nas seguintes frentes:

### 1. Contexto Visual e Temático
Em vez de solicitar um tema padrão, injetei no prompt o contexto do livro de ficção científica *Project Hail Mary* (Devoradores de Estrelas). Instruí a IA a utilizar a cor vermelha baseada na radiação infravermelha dos "astrofágos". Com esse contexto, a IA conseguiu aplicar o conceito de forma coerente nas variáveis globais do CSS, nos efeitos de transição e na animação de fundo.

### 2. Refatoração e Arquitetura de Código
A versão inicial gerada consistia em um único arquivo HTML contendo todo o código. Através de comandos específicos, direcionei a ferramenta para refatorar o projeto, separando as responsabilidades de estrutura, estilo e comportamento em arquivos distintos (`index.html`, `style.css` e `script.js`). Isso garantiu que a arquitetura ficasse organizada e fácil de manter.

### 3. Restrições Técnicas (Vanilla JS e APIs Nativas)
Para testar as capacidades da IA na geração de lógicas matemáticas e recursos nativos, determinei a restrição de que nenhum framework ou biblioteca de terceiros fosse utilizado. Esse comando resultou nas seguintes implementações:
- **Efeitos Sonoros**: Em vez de carregar arquivos de áudio externos, a IA programou sons sintetizados diretamente via `Web Audio API` para os eventos de interface.
- **Background Animado**: O sistema de partículas espaciais foi desenhado de forma nativa utilizando a `Canvas API`.
- **Logotipos Vetoriais**: O favicon e o logotipo principal são SVGs criados inteiramente em código, garantindo carregamento instantâneo e integração direta com as cores do CSS.

## Tecnologias Utilizadas

- **HTML5 & CSS3**: Interface construída do zero, com foco em design responsivo e efeitos modernos como o *glassmorphism*.
- **JavaScript (ES6+)**: Lida com a manipulação do DOM, integração com a API do GitHub (para listagem de projetos), renderização no Canvas e síntese de áudio.
- **Engenharia de Prompt**: Orientação técnica, validação e gerenciamento do agente de IA durante todo o fluxo de desenvolvimento.

## Sobre Mim

Atualmente, estou em transição de carreira, migrando da área elétrica industrial — um setor de alta pressão e responsabilidade operacional — para atuar com **Engenharia de Dados**, **Inteligência Artificial** e **Automação**.

Estudo diariamente e desenvolvo projetos práticos utilizando ferramentas como Python, Java e SQL. Meu ponto forte sempre foi a aplicação do pensamento lógico para a resolução de problemas complexos, uma habilidade que tenho traduzido da indústria diretamente para a programação.

## Executando o Projeto Localmente

O projeto não possui dependências externas ou necessidade de instalação via gerenciadores de pacotes.
1. Faça o clone deste repositório em sua máquina local.
2. Abra o arquivo `index.html` diretamente no seu navegador.

## Contato

Sinta-se à vontade para me adicionar nas minhas redes sociais.
- [LinkedIn](https://www.linkedin.com/in/enuknogueira/)
- [GitHub](https://github.com/EnukNogueira)
