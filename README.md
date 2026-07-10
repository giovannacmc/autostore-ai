# AutoStore AI

Sistema web desenvolvido para o Hackathon AutoStore, com o objetivo de simular uma loja online de carros, conduzindo o usuário desde a navegação no catálogo até o envio de um lead para a loja.

A aplicação possui catálogo de veículos, filtros, página de detalhe, comparação de modelos, formulário de interesse, persistência de leads em banco de dados, área administrativa protegida por login e CRUD básico para gerenciamento dos carros.

## Deploy

Projeto publicado na Vercel:

https://autostore-ai.vercel.app

## Funcionalidades

- Home moderna e responsiva.
- Catálogo com veículos reais do dataset fornecido.
- Busca por texto.
- Filtros por marca, categoria, combustível, câmbio e faixa de preço.
- Página de detalhe com ficha técnica completa.
- Galeria de imagens por veículo.
- Comparação de até três veículos.
- Bloqueio para impedir comparação do mesmo veículo em colunas diferentes.
- Formulário de interesse vinculado ao carro escolhido.
- Validação de nome, e-mail e WhatsApp.
- Persistência dos leads em banco PostgreSQL.
- Painel administrativo de leads protegido por login.
- CRUD administrativo de carros:
  - cadastrar veículo;
  - listar veículos;
  - editar veículo;
  - excluir veículo sem leads vinculados.
- Modo claro e modo escuro.
- Deploy em produção na Vercel.
- Banco de dados PostgreSQL hospedado no Neon.

## Fluxo principal

O fluxo principal da aplicação segue a jornada proposta no desafio:

```txt
Catálogo → Página de detalhe → Assistente → Interesse → Lead enviado
```

O usuário pode navegar pelo catálogo, visualizar detalhes do veículo, comparar modelos e enviar seus dados de contato. O lead fica salvo no banco de dados e pode ser consultado posteriormente no painel administrativo.

## Tecnologias utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Neon
- Vercel
- Gemini SDK

## Estrutura principal

```txt
src/
  app/
    admin/
      carros/
        novo/
        [id]/editar/
    api/
      admin/
        cars/
        login/
        logout/
      cars/
      chat/
      leads/
    assistente/
    carros/[id]/
    catalogo/
    comparar/
    leads/
  components/
  data/
  lib/
  types/

prisma/
  schema.prisma
  seed.ts

public/
  images/
    cars/
```

## Requisitos atendidos

### Catálogo e cadastro de carros

A aplicação permite carregar os carros iniciais no banco via seed e também possui CRUD administrativo para criar, editar e remover veículos.

Cada carro possui:

- montadora;
- modelo;
- categoria;
- ano;
- motor;
- potência;
- câmbio;
- consumo;
- preço;
- combustível;
- cores disponíveis;
- itens de série;
- descrição;
- imagem principal.

### Vitrine e filtros

O catálogo possui cards com imagem, modelo, marca, preço e informações principais.

Também possui filtros por:

- busca textual;
- marca;
- categoria;
- combustível;
- câmbio;
- preço máximo.

O filtro de preço usa uma faixa fixa de R$ 10.000 a R$ 500.000 para evitar que algum veículo fique fora do resultado quando o slider está no valor máximo.

### Página de detalhe

Cada veículo possui uma página própria com:

- imagens do veículo;
- ficha técnica;
- preço;
- motor;
- potência;
- câmbio;
- consumo;
- combustível;
- cores disponíveis;
- itens de série;
- descrição;
- formulário de interesse.

### Comparação de veículos

A página de comparação permite comparar até três veículos lado a lado.

Para evitar uso incorreto, o sistema bloqueia a seleção do mesmo veículo em mais de uma coluna.

### Captura de leads

O formulário de interesse captura:

- nome;
- e-mail;
- WhatsApp;
- mensagem opcional;
- veículo de interesse.

Os leads são salvos no banco PostgreSQL e podem ser consultados depois no painel administrativo.

### Área administrativa

A área administrativa possui:

- login protegido;
- sessão por cookie HTTP-only;
- painel de leads;
- gerenciamento do catálogo;
- criação de veículos;
- edição de veículos;
- exclusão segura de veículos sem leads vinculados.

Veículos com leads vinculados não podem ser excluídos pelo painel, evitando perda de histórico comercial.

## Assistente e IA

O projeto possui uma página de assistente em:

```txt
/assistente
```

E uma rota de API em:

```txt
/api/chat
```

A estrutura para integração com Gemini foi preparada usando variáveis de ambiente e o SDK do Gemini.

A etapa final de RAG com embeddings deve ser ativada com a chave `GEMINI_API_KEY`, usando:

- `gemini-3.1-flash-lite` para geração de respostas;
- `gemini-embedding-001` para embeddings;
- indexação dos dados técnicos dos veículos;
- recuperação de contexto antes da geração da resposta.

## Variáveis de ambiente

Crie um arquivo `.env` ou `.env.local` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=
DATABASE_URL_UNPOOLED=

ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_TOKEN=

GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.1-flash-lite
GEMINI_EMBEDDING_MODEL=gemini-embedding-001
```

Observações:

- `DATABASE_URL` e `DATABASE_URL_UNPOOLED` são as URLs do banco PostgreSQL no Neon.
- `ADMIN_EMAIL` e `ADMIN_PASSWORD` são usados para login na área administrativa.
- `ADMIN_SESSION_TOKEN` é usado para validar a sessão administrativa.
- `GEMINI_API_KEY` deve ser configurada quando a etapa final de IA/RAG for ativada.
- Nenhuma chave, senha ou URL de banco deve ser commitada no GitHub.

## Como rodar localmente

Clone o repositório:

```bash
git clone https://github.com/giovannacmc/autostore-ai.git
```

Entre na pasta do projeto:

```bash
cd autostore-ai
```

Instale as dependências:

```bash
npm install
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Rode as migrations:

```bash
npx prisma migrate dev
```

Popule o banco com os carros iniciais:

```bash
npm run seed
```

Inicie o projeto em desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```txt
http://localhost:3000
```

## Scripts disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o projeto localmente em modo desenvolvimento.

### Build

```bash
npm run build
```

Gera a versão de produção.

### Produção local

```bash
npm run start
```

Inicia o projeto em modo produção após o build.

### Seed

```bash
npm run seed
```

Popula o banco de dados com os carros iniciais.

## Rotas principais

```txt
/                           Home
/catalogo                   Catálogo de veículos
/carros/[id]                Detalhe do veículo
/comparar                   Comparação de veículos
/assistente                 Assistente
/leads                      Painel de leads protegido
/admin/login                Login administrativo
/admin/carros               Gerenciamento do catálogo
/admin/carros/novo          Cadastro de novo veículo
/admin/carros/[id]/editar   Edição de veículo
```

## APIs principais

```txt
/api/cars                   Consulta de carros
/api/leads                  Criação e consulta de leads
/api/chat                   Assistente
/api/admin/login            Login administrativo
/api/admin/logout           Logout administrativo
/api/admin/cars             Criar/listar carros no admin
/api/admin/cars/[id]        Editar/excluir carro no admin
```

## Roteiro de validação

Para validar o fluxo principal:

1. Acesse `/catalogo`.
2. Teste os filtros de marca, categoria, combustível, câmbio e preço.
3. Abra a página de detalhe de um veículo.
4. Envie um lead pelo formulário de interesse.
5. Acesse `/leads`.
6. Faça login como administrador.
7. Confirme se o lead aparece na tabela.
8. Acesse `/admin/carros`.
9. Cadastre um veículo de teste.
10. Edite o veículo cadastrado.
11. Exclua o veículo de teste.
12. Acesse `/comparar`.
13. Confirme que o mesmo carro não pode ser selecionado em mais de uma coluna.
14. Teste o modo claro e escuro.
15. Confirme que o lead continua salvo após reload.

## Segurança

- Credenciais administrativas ficam em variáveis de ambiente.
- A senha do administrador não aparece no front-end.
- A página de leads é protegida por autenticação.
- O painel de gerenciamento de carros é protegido por autenticação.
- A sessão administrativa usa cookie HTTP-only.
- Leads não são salvos em `localStorage`.
- Leads são armazenados de forma durável no PostgreSQL.
- Veículos com leads vinculados não podem ser excluídos pelo painel.
- A chave Gemini não deve ser commitada no GitHub nem exposta no front-end.

## Decisões técnicas

- Next.js foi usado para centralizar front-end, rotas server-side e APIs no mesmo projeto.
- TypeScript foi usado para melhorar segurança de tipos e manutenção do código.
- Prisma foi usado para modelagem e acesso ao banco PostgreSQL.
- Neon foi escolhido como banco PostgreSQL online.
- Vercel foi usada para deploy por integrar bem com projetos Next.js.
- O painel administrativo foi mantido simples para atender ao CRUD sem deixar o projeto excessivamente complexo.
- A comparação impede veículos repetidos para evitar uma experiência incorreta.
- O CRUD bloqueia a exclusão de veículos com leads vinculados para preservar histórico comercial.
- O modo escuro foi implementado com persistência da preferência do usuário.
- O filtro de preço usa uma faixa fixa para manter previsibilidade no catálogo.

## Limitações atuais

- A etapa final de RAG com embeddings depende da configuração definitiva da `GEMINI_API_KEY`.
- O projeto não possui upload de imagens pelo painel administrativo.
- Para cadastrar veículos pelo CRUD, a imagem deve ser informada como caminho de arquivo existente em `/public/images/cars`.
- O catálogo final da entrega deve permanecer fiel ao dataset oficial do desafio.
- Veículos criados no CRUD são úteis para teste administrativo, mas não devem permanecer no catálogo final se não fizerem parte do dataset oficial.

## Próximos passos

- Finalizar RAG com embeddings.
- Rodar ingestão do corpus técnico.
- Testar perguntas oficiais do desafio no assistente.
- Preparar pitch de 15 minutos.
- Ensaiar a demo ao vivo.
