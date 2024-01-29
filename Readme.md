# Em contrução

# E-commerce

###### O Backend E-Commerce é a parte do sistema de comércio eletrônico responsável por gerenciar a lógica de negócios, manipulação de dados e interações com o banco de dados. Este projeto utiliza tecnologias modernas para garantir um desempenho eficiente e uma experiência de compra confiável.

### Tecnologias Utilizadas
- Node.js 
- Express
- PostgreSQL
- Autenticação: JSON Web Token (JWT)
- AWS-SDK
- Multer
- Cors

### Funcionalidades Principais

- Gerenciamento de produtos, pedidos e usuários.
- Autenticação segura de usuários.
- Integração com serviços de pagamento.
- API RESTful para interação com o frontend.

### Instalação

1. Clone o repositório: git clone `https://github.com/Marcos-Gomes/E-commerce.git`
1. Navegue para o diretório do projeto: `cd backend-e-commerce`
1. Instale as dependências: `npm install`
1. Configure as variáveis de ambiente (consulte `.env.example`).
1. Inicie o servidor: `npm run dev`

### Endpoints da API

1. `/cadastrar`
    - **Descrição:** Realiza o cadastro para utilizar a aplicação.
    - **Método:** POST
    - **Parâmetros de Solicitação:**
        ~~~JSON 
        {
            "nome": "Nome do usuário",
            "email": "Endereço de e-mail",
            "senha": "Senha de acesso"
        }
        ~~~

    **Exemplo de Solicitação**
    ~~~bash
    curl -X POST -H "Content-Type: application/json" -d '{"nome": "Nome do Usuário", "email": "usuario@email.com", "senha": "senha123"}' http://localhost:3000/cadastrar
    ~~~

    **Exemplo de Resposta**
    ~~~JSON
        { "message": "Usuário criado com sucesso" }
    ~~~

1. `/login`
   - **Descrição:** Obtém o token JWT após realizar o cadastro.
    - **Método:** POST
    - **Parâmetros de Solicitação:**
    ~~~JSON
    {
        "email": "Endereço de e-mail cadastrado",
        "senha": "Senha de acesso"
    }   
    ~~~

    **Exemplo de Solicitação:**

    ~~~bash
    curl -X POST -H "Content-Type: application/json" -d '{"email": "usuario@email.com", "senha": "senha123"}' http://localhost:3000/login
    ~~~

    **Exemplo de Resposta:**

    ~~~JSON
    {
	"user": {
		"id": 1,
		"nome": "Nome do usuário",
		"email": "Endereço de e-mail cadastrado"
	},
	    "token": "seu-token-jwt-aqui"
    }
    ~~~

1. `/produtos`
    - **Descrição:** Obtém a lista de produtos disponíveis.
    - **Método:** GET
    - **Exemplo de Solicitação:**

    ~~~bash
    curl -H "Authorization: Bearer seu-token-jwt-aqui" http://localhost:3000/produtos
    ~~~

    **Exemplo de Resposta:**
    ~~~JSON
    {
        "productWithDecodeImage": [
            {
                "id": 1,
                "descricao": "Descrição do Produto",
                "quantidade_estoque": "Quantidade do Produto",
                "valor_produto": "Valor do Produto em centavos",
                "produto_imagem": "Link da Imagem do Produto",
                "categorias_id": "ID da Categoria Cadastrada"
            }
        ]
    }
    ~~~
1. `/pedidos`
1. `/user`
1. `/categorias`

### Autenticação

O backend utiliza autenticação baseada em tokens. Certifique-se de incluir o token JWT nas requisições autorizadas.

### Contato

Para dúvidas ou suporte, entre em contato [marcosube@gmail.com].


