create database e_commerce;

create table usuarios (
	id serial primary key,
  nome text not null,
  email text not null,
  senha text not null,
  data_criacao timestamp
);

create table categorias (
	id serial primary key,
  descricao text
);

create table produtos (
	id serial primary key,
  descricao text,
  quantidade_estoque int not null,
  valor_produto int not null,
  produto_imagem text,
  categorias_id integer references categorias(id),
  user_id integer references usuarios(id)
);


create table clientes (
	id serial primary key,
  nome varchar(150) not null,
  email varchar(100) not null,
  cpf varchar(11) not null unique,
  cep varchar(8),
  rua text,
  numero integer,
  complemento varchar(50),
  bairro varchar(150),
  cidade varchar(150),
  estado varchar(2),
  senha text not null
);

create table pedidos(
	id serial primary key,
  cliente_id integer references clientes(id),
  observacao text,
  valor_total integer
);

create table pedido_produtos (
	id serial primary key,
  pedido_id integer references pedidos(id) not null,
  produto_id integer references produtos(id) not null,
  quantidade_produto integer not null,
  valor_produto integer not null
);
