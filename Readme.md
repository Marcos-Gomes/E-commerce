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
- API RESTful para interação com o frontend.

### Instalação

1. Clone o repositório: git clone `https://github.com/Marcos-Gomes/E-commerce.git`
1. Navegue para o diretório do projeto: `cd backend-e-commerce`
1. Instale as dependências: `npm install`
1. Configure as variáveis de ambiente (consulte `.env.example`).
1. Inicie o servidor: `npm run dev`

### Endpoints da API

1. `/cadastrar`
    - **Descrição:** Cria um novo usuário com as informações fornecidas.
    - **Método:** POST
    - **Exemplo de Solicitação:**    
        - Corpo da requisição:
            ~~~JSON
                {
                    "nome": "Nome do Usuário",
                    "email": "usuario@example.com",
                    "senha": "senha-segura"
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "Usuário criado com sucesso"
                }
            ~~~

1. `/login`
    - **Descrição:** Realiza o login do usuário com as credenciais fornecidas.
    - **Método:** POST
    - **Exemplo de Solicitação:**    
        - Corpo da requisição:
            ~~~JSON
                {
                    "email": "usuario@example.com",
                    "senha": "senha-segura"
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "user": {
                        "id": 1,
                        "nome": "Nome do Usuário",
                        "email": "usuario@example.com"
                    },
                    "token": "token-de-autenticação"
                }
            ~~~

1. `/cadastrar`
    - **Descrição:** Atualiza as informações do usuário autenticado.
    - **Método:** PUT
    - **Exemplo de Solicitação:**    
        - Corpo da requisição:
            ~~~JSON
                {
                    "nome": "Novo Nome",
                    "email": "novo-email@example.com",
                    "senha": "nova-senha"
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "Usuário atualizado com sucesso"
                }
            ~~~
 
1. `/categorias`
    - **Descrição:** Cria uma nova categoria com a descrição fornecida.
    - **Método:** POST
    - **Exemplo de Solicitação:**    
        - Corpo da requisição:
            ~~~JSON
                {
                    "descricao": "Descrição da Categoria"
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "A categoria 'Descrição' da Categoria foi criada com sucesso"
                }
            ~~~

1. `/categorias`
    - **Descrição:** Recupera a lista de todas as categorias cadastradas.
    - **Método:** GET
    - **Exemplo de Solicitação:**    
        - Resposta:
            ~~~JSON
                {
                    "categoryList": [
                    {
                        "id": 1,
                        "descricao": "Descrição da Categoria"
                    },
                    // Mais categorias...
                    ]
                }
            ~~~

1. `/categorias/:id`
    - **Descrição:** Edita a descrição de uma categoria existente.
    - **Método:** POST
    - **Exemplo de Solicitação:**    
        - Parâmetros da Requisição:
          - `id:` ID da categoria a ser editada
        - Corpo da requisição:
            ~~~JSON
                {
                    "descricao": "Nova Descrição"
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "Categoria editada com sucesso!"
                }
            ~~~

1. `/categorias/:id`
    - **Descrição:** Deleta uma categoria por ID.
    - **Método:** DELETE
    - **Exemplo de Solicitação:**
        - Parâmetros da Requisição:
          - `id:` ID da categoria a ser deletada
        - Corpo da requisição:
            ~~~JSON
                {
                    "descricao": "Nova Descrição"
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "Categoria deletada com sucesso!"
                }
            ~~~

1. `/produtos`
    - **Descrição:** Crie um novo produto com as informações fornecidas.
    - **Método:** POST
    - **Exemplo de Solicitação:**    
        - Corpo da requisição:
            ~~~JSON
                {
                    "descricao": "Descrição do Produto",
                    "quantidade_estoque": 10,
                    "valor_produto": 29.99,
                    "categorias_id": 1
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "Produto criado com sucesso!"
                }
            ~~~

1. `/produtos`
    - **Descrição:** Crie um novo produto com as informações fornecidas.
    - **Método:** GET
    - **Exemplo de Solicitação:**
        - Resposta:
            ~~~JSON
                {
                    "product": [
                        {
                        "id": 1,
                        "descricao": "Descrição do Produto",
                        "quantidade_estoque": 10,
                        "valor_produto": 29.99,
                        "categorias_id": 1,
                        "produto_imagem": "imagem-em-base64"
                        },
                        // Mais produtos...
                    ]
                }
            ~~~
1. `/produtos/:id`
    - **Descrição:** Atualize as informações do produto.
    - **Método:** POST
    - **Exemplo de Solicitação:**    
        - Corpo da requisição:
            ~~~JSON
                {
                    "descricao": "Descrição Atualizada do Produto",
                    "quantidade_estoque": 15,
                    "valor_produto": 39.99,
                    "categorias_id": 2
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "Produto Atualizado com sucesso!"
                }
            ~~~

1. `/produtos`
    - **Descrição:** Exclua um produto por ID.
    - **Método:** DELETE
    - **Exemplo de Solicitação:**
        - Resposta:
            ~~~JSON
                {
                    "message": "Produto excluido com sucesso"
                }
            ~~~

1. `/clientes`
- **Descrição:** Crie um novo cliente com as informações fornecidas.
- **Metodo:** Post
- **Exemplo de solicitação:**
    - Corpo da requisição:
        ~~~JSON
            {
                "nome": "John Doe",
                "email": "john@example.com",
                "cpf": "123.456.789-00",
                "cep": "12345-678",
                "numero": 123,
                "complemento": "Apt 4",
                "senha": "password123"
            }
        ~~~
    - Resposta:
        ~~~JSON
            {
                "message": "Cadastro realizado com sucesso!"
            }
        ~~~
1. `/clientes/login`
- **Descrição:** Autentique um cliente e gere um token JWT.
- **Metodo:** Post
- **Exemplo de solicitação:**
    - Corpo da requisição:
            ~~~JSON
            {
                "email": "john@example.com",                
                "senha": "password123"
            }
            ~~~
    - Resposta:
        ~~~JSON
            {
                "customer": {
                    "id": 1,
                    "nome": "Fulano Silva",
                    "email": "fulano@example.com"
                },
                "token": "seu-token-gerado"
            }
        ~~~

1. `/clientes/:id`
- **Descrição:** Atualize as informações do cliente.
- **Metodo:** Post
- **Exemplo de solicitação:**
    - Corpo da requisição:
        ~~~JSON
            {
                "nome": "Nome Atualizado",
                "email": "atualizado@example.com",
                "cpf": "987.654.321-00",
                "cep": "54321-876",
                "numero": 456,
                "complemento": "Apto 10",
                "senha": "senhatualizada"
            }
        ~~~
    - Resposta:
        ~~~JSON
            {
                "message": "Cliente Atualizado com Sucesso"
            }
        ~~~

1. `/pedidos`
    - **Descrição:** Registra uma nova compra com as informações fornecidas.
    - **Método:** POST
    - **Exemplo de Solicitação:**    
        - Corpo da requisição:
            ~~~JSON
                {
                    "observacao": "Observações sobre a compra",
                    "pedido_produtos": [
                        {
                        "produto_id": 1,
                        "quantidade_produto": 2
                        },
                        // Mais produtos...
                    ]
                }
            ~~~
        - Resposta:
            ~~~JSON
                {
                    "message": "Compra realizada com sucesso"
                }
            ~~~

1. `/pedidos`
    - **Descrição:** Recupera a lista de todas as compras realizadas pelo cliente autenticado.
    - **Método:** GET
    - **Exemplo de Solicitação:**        
        - Resposta:
            ~~~JSON
                {
                    "allPurchases": [
                        {
                        "pedido": {
                            "id": 1,
                            "cliente_id": 1,
                            "observacao": "Observações sobre a compra",
                            "valor_total": 59.98
                        },
                        "pedido_produtos": [
                            {
                            "pedido_id": 1,
                            "produto_id": 1,
                            "quantidade_produto": 2,
                            "valor_produto": 29.99
                            },
                            // Mais produtos...
                        ]
                        },
                        // Mais compras...
                    ]
                }
            ~~~



### Dependências

- knex - Construtor de consultas SQL para Node.js
- bcrypt - Biblioteca de hash de senha
- jsonwebtoken - Biblioteca de JSON Web Token
- nodemailer - Biblioteca de envio de e-mails
- aws-sdk - AWS SDK para Node.js

### Autenticação

O backend utiliza autenticação baseada em tokens. Certifique-se de incluir o token JWT nas requisições autorizadas.

### Contato

Para dúvidas ou suporte, entre em contato [marcosube@gmail.com].