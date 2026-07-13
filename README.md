# AutoStore AI

Aplicação web desenvolvida para o Hackathon AutoStore, simulando uma loja digital de veículos com catálogo, comparação, captura de leads, painel administrativo e um assistente conectado ao Gemini com RAG.

O sistema acompanha a jornada do cliente desde a descoberta de um veículo até o envio de interesse para a loja.

## Projeto publicado

**Aplicação:**  
https://autostore-ai.vercel.app

**Repositório:**  
https://github.com/giovannacmc/autostore-ai

## Visão geral

O AutoStore AI permite que o usuário:

- navegue pelo catálogo de veículos;
- pesquise e aplique filtros;
- visualize detalhes e imagens de cada modelo;
- compare até três veículos;
- converse com um assistente sobre o catálogo;
- envie seus dados de interesse;
- alterne entre tema claro e escuro.

A aplicação também possui uma área administrativa protegida para gerenciamento dos veículos e visualização dos leads cadastrados.

## Funcionalidades

### Catálogo

- Listagem dos veículos cadastrados no PostgreSQL.
- Busca por texto.
- Filtro por marca.
- Filtro por categoria.
- Filtro por combustível.
- Filtro por câmbio.
- Filtro por preço máximo.
- Atualização dinâmica dos resultados.
- Cards com imagem, modelo, marca, preço e informações principais.

### Página de detalhes

Cada veículo possui uma página própria com:

- galeria de imagens;
- descrição;
- preço;
- ano;
- categoria;
- motor;
- potência;
- transmissão;
- combustível;
- consumo ou autonomia;
- cores disponíveis;
- itens principais;
- formulário de interesse.

### Comparação

- Comparação de até três veículos lado a lado.
- Informações técnicas organizadas em colunas.
- Bloqueio de veículos duplicados.
- Imagens oficiais dos modelos selecionados.

### Assistente

O assistente permite realizar perguntas como:

- Quais modelos automáticos estão disponíveis?
- Tem algum carro de até R$ 100 mil?
- Quais SUVs vocês têm?
- Quero um carro elétrico econômico para a cidade.
- Compare o Corolla Cross e o T-Cross.

O fluxo do assistente utiliza:

1. a pergunta enviada pelo cliente;
2. geração de embedding;
3. busca dos trechos mais relevantes da base;
4. seleção dos veículos compatíveis;
5. geração da resposta com Gemini;
6. regras para evitar recomendações incompatíveis ou dados inventados.

O assistente utiliza somente informações dos veículos cadastrados e do conteúdo indexado.

### Captura de leads

O formulário permite cadastrar:

- nome;
- e-mail;
- WhatsApp;
- mensagem opcional;
- veículo de interesse.

Os dados são validados e persistidos no PostgreSQL.

### Administração

A área administrativa possui:

- login protegido;
- sessão com cookie HTTP-only;
- visualização dos leads;
- listagem dos veículos;
- cadastro de novos veículos;
- edição de veículos;
- exclusão de veículos sem leads vinculados.

Veículos com leads relacionados não podem ser excluídos, preservando o histórico comercial.

### Interface

- Layout responsivo.
- Tema claro e escuro.
- Preferência de tema salva no navegador.
- Estados de carregamento e mensagens de erro.
- Navegação adaptada para computador e celular.

## Fluxo principal

```text
Home
→ Catálogo
→ Detalhes do veículo
→ Comparação ou Assistente
→ Formulário de interesse
→ Lead salvo no PostgreSQL
→ Visualização no painel administrativo
```

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM 6
- PostgreSQL
- Neon
- Gemini API
- Gemini Embeddings
- Vercel
- Git e GitHub

## Arquitetura

O projeto utiliza o App Router do Next.js.

```text
src/
├── app/
│   ├── admin/
│   │   ├── carros/
│   │   └── login/
│   ├── api/
│   │   ├── admin/
│   │   ├── cars/
│   │   ├── chat/
│   │   └── leads/
│   ├── assistente/
│   ├── carros/[id]/
│   ├── catalogo/
│   ├── comparar/
│   └── leads/
├── components/
├── data/
├── lib/
│   ├── assistant-rate-limit.ts
│   ├── gemini.ts
│   ├── prisma.ts
│   └── rag.ts
└── types/

prisma/
├── migrations/
├── ingest-rag.ts
├── schema.prisma
└── seed.ts

public/
└── images/
    └── cars/
```

## Modelos do banco

### Car

Armazena:

- identificação;
- marca;
- modelo;
- categoria;
- ano;
- motor;
- potência;
- transmissão;
- consumo ou autonomia;
- preço;
- combustível;
- cores;
- itens;
- descrição;
- imagem.

### Lead

Armazena:

- nome;
- e-mail;
- telefone;
- mensagem;
- veículo relacionado;
- data de criação.

### RagChunk

Armazena os trechos usados pelo assistente:

- veículo relacionado;
- título;
- conteúdo;
- embedding;
- data de criação.

### AssistantRateLimit

Controla o uso do assistente:

- identificador anonimizado;
- início da janela de tempo;
- quantidade de requisições;
- datas de criação e atualização.

## Assistente com RAG

O projeto utiliza Retrieval-Augmented Generation para produzir respostas fundamentadas no catálogo.

### Ingestão

O arquivo:

```text
prisma/ingest-rag.ts
```

executa o seguinte processo:

1. busca os veículos cadastrados;
2. cria chunks de resumo e especificações;
3. gera embeddings;
4. remove os chunks antigos;
5. salva a nova base no PostgreSQL.

Para executar:

```bash
npm run ingest:rag
```

Exemplos de chunks:

```text
BYD Dolphin - resumo
BYD Dolphin - especificações
Toyota Corolla Cross - resumo
Toyota Corolla Cross - especificações
```

### Recuperação

Quando o cliente envia uma pergunta:

1. a pergunta recebe um embedding;
2. sua similaridade é comparada com os chunks salvos;
3. os trechos mais relevantes são recuperados;
4. filtros objetivos também são aplicados;
5. somente os veículos relacionados são enviados ao modelo.

Esse processo reduz o consumo de tokens e melhora a precisão.

### Regras do assistente

O assistente foi configurado para:

- responder em português do Brasil;
- utilizar somente os dados fornecidos;
- não inventar preços ou especificações;
- respeitar simultaneamente os critérios pedidos;
- recomendar somente elétricos quando o cliente solicitar elétricos;
- não recomendar veículos manuais quando o cliente solicitar automáticos;
- respeitar limites de preço;
- informar quando não houver opção compatível;
- sugerir no máximo três veículos por resposta, salvo pedido de lista completa.

## Proteção de crédito

Como a integração utiliza um crédito limitado da Gemini, foram implementadas medidas para reduzir e controlar o consumo:

- perguntas limitadas a 600 caracteres;
- recuperação limitada aos chunks mais relevantes;
- envio de apenas parte do catálogo;
- respostas limitadas em tamanho;
- limite por visitante;
- limite global diário;
- bloqueio antes da chamada à Gemini quando o limite é atingido.

Configuração atual:

```text
10 perguntas por hora por visitante
60 perguntas por dia no site
```

O endereço IP não é armazenado diretamente. O sistema salva apenas um hash usado para diferenciar os visitantes.

## Rotas

### Páginas

```text
/                           Home
/catalogo                   Catálogo
/carros/[id]                Detalhes do veículo
/comparar                   Comparação
/assistente                 Assistente
/leads                      Painel de leads
/admin/login                Login administrativo
/admin/carros               Gerenciamento de veículos
/admin/carros/novo          Cadastro de veículo
/admin/carros/[id]/editar   Edição de veículo
```

### APIs

```text
/api/cars                   Consulta de veículos
/api/leads                  Cadastro e consulta de leads
/api/chat                   Assistente
/api/admin/login            Login administrativo
/api/admin/logout           Logout administrativo
/api/admin/cars             Criação e listagem de veículos
/api/admin/cars/[id]        Edição e exclusão de veículos
```

## Variáveis de ambiente

Use o arquivo `.env.example` como referência.

Crie `.env` ou `.env.local` na raiz do projeto:

```env
DATABASE_URL="sua_conexao_pooler_do_neon"
DATABASE_URL_UNPOOLED="sua_conexao_direta_do_neon"

GEMINI_API_KEY="sua_chave"
GEMINI_MODEL="gemini-3.1-flash-lite"
GEMINI_EMBEDDING_MODEL="gemini-embedding-001"

ADMIN_PASSWORD="sua_senha_segura"
ADMIN_SESSION_SECRET="seu_segredo_longo_e_aleatorio"
```

Nunca envie para o GitHub:

```text
.env
.env.local
chaves de API
senhas
URLs reais do banco
segredos de sessão
```

Somente o `.env.example`, sem dados reais, deve ser versionado.

## Instalação local

Clone o projeto:

```bash
git clone https://github.com/giovannacmc/autostore-ai.git
```

Entre na pasta:

```bash
cd autostore-ai
```

Instale as dependências:

```bash
npm install
```

O script `postinstall` executará automaticamente:

```bash
prisma generate
```

Configure as variáveis de ambiente.

Valide o schema:

```bash
npx prisma validate
```

Aplique as migrations:

```bash
npx prisma migrate dev
```

Popule o catálogo:

```bash
npm run seed
```

Gere a base do assistente:

```bash
npm run ingest:rag
```

Inicie o desenvolvimento:

```bash
npm run dev
```

Abra:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera o build de produção.

```bash
npm run start
```

Executa o build em modo de produção.

```bash
npm run lint
```

Verifica o código com ESLint.

```bash
npm run seed
```

Popula o banco com os veículos iniciais.

```bash
npm run ingest:rag
```

Cria os chunks e embeddings do assistente.

```bash
npm run postinstall
```

Gera o Prisma Client. Esse script também é executado automaticamente após a instalação das dependências.

## Deploy

O deploy é realizado pela Vercel a partir da branch `main` do GitHub.

Fluxo:

```text
Commit
→ Push para o GitHub
→ Build na Vercel
→ Prisma Client gerado
→ Next.js compilado
→ Publicação
```

As variáveis de ambiente devem ser cadastradas nas configurações do projeto na Vercel.

As migrations são versionadas dentro de:

```text
prisma/migrations/
```

## Segurança

Medidas adotadas:

- variáveis sensíveis fora do repositório;
- chave Gemini utilizada somente no servidor;
- credenciais administrativas fora do front-end;
- cookie HTTP-only para sessão administrativa;
- validação de entradas;
- limite de tamanho das mensagens;
- limite de requisições do assistente;
- IP transformado em hash;
- leads persistidos no PostgreSQL;
- nenhuma persistência de leads em `localStorage`;
- bloqueio da exclusão de veículos com leads relacionados;
- mensagens de erro sem exposição de detalhes internos;
- `.env` e `.env.local` ignorados pelo Git.

## Validação

Antes da publicação foram executados:

```bash
npm run lint
npm run build
```

O build validou:

- compilação do Next.js;
- TypeScript;
- Prisma Client;
- páginas estáticas;
- páginas dinâmicas;
- rotas da API;
- rota do assistente;
- integração do rate limit.

Também foram testados:

- catálogo;
- filtros;
- detalhes;
- galeria;
- comparação;
- formulário;
- persistência dos leads;
- login administrativo;
- CRUD de veículos;
- tema claro e escuro;
- versão responsiva;
- assistente local;
- assistente em produção.

## Decisões técnicas

### Next.js

Foi utilizado para reunir interface, páginas dinâmicas e APIs no mesmo projeto.

### TypeScript

Foi adotado para melhorar a segurança de tipos e facilitar a manutenção.

### Prisma e PostgreSQL

O Prisma organiza o schema, as migrations e as consultas ao banco PostgreSQL hospedado no Neon.

### Gemini com RAG

O assistente não depende apenas de uma resposta genérica do modelo. Ele recupera informações do catálogo e fornece esse contexto antes de gerar a resposta.

### Catálogo no contexto

Além dos chunks, a API seleciona veículos relevantes para garantir que filtros objetivos, como combustível, transmissão e preço, sejam respeitados.

### Rate limit persistente

O controle de uso foi salvo no PostgreSQL, em vez de depender apenas da memória do servidor. Isso é mais adequado para o ambiente serverless da Vercel.

### Proteção de histórico

Veículos relacionados a leads não podem ser excluídos, evitando a perda do histórico comercial.

## Limitações

- O painel administrativo não possui upload de imagens.
- As imagens devem existir previamente em `public/images/cars`.
- O rate limit controla requisições, mas não representa um cálculo financeiro exato por tokens.
- A ingestão deve ser executada novamente quando os dados relevantes dos veículos forem alterados.
- O catálogo final deve permanecer consistente com o conjunto oficial do desafio.

## Possíveis melhorias

- Upload de imagens pelo painel.
- Histórico de conversas do assistente.
- Busca vetorial nativa com `pgvector`.
- Métricas de consumo da Gemini.
- Painel de acompanhamento do limite diário.
- Paginação do catálogo e dos leads.
- Testes automatizados.
- Recuperação de senha administrativa.
- Perfis com diferentes permissões.
- Envio de confirmação por e-mail ao cliente.

## Autora

Desenvolvido por **Giovanna Carolina** para o Hackathon AutoStore.
