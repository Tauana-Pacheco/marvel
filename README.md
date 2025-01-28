# O Infinito Marvel

Este projeto é uma aplicação web onde os usuários podem visualizar e buscar personagens do universo Marvel utilizando a [API da Marevel](https://developer.marvel.com/). Foi desenvolvido com tecnologias modernas para oferecer uma experiência rápida e responsiva.

## Tecnologias Utilizadas

- **Vite**: Ferramenta de build rápida para projetos modernos.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **TailwindCSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Vitest**: Framework de testes para Vite, React Testing Library.

## Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (geralmente vem com o Node.js)

## Como Rodar o Projeto Localmente

Siga os passos abaixo para rodar o projeto em sua máquina:

1. **Clone o repositório**

   git clone [https://github.com/Tauana-Pacheco/marvel.git](https://github.com/Tauana-Pacheco/marvel.git)

   ```bash
   cd marvel
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ou
   yarn install
   ```

3. **Configure a API da Marvel**

- Acesse o site da Marvel Developers e crie uma conta.
- Gere uma _public key_ e uma _private key_.
- Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

  ```bash
   VITE_MARVEL_PUBLIC_KEY=SUA_PUBLIC_KEY
   VITE_MARVEL_PRIVATE_KEY=SUA_PRIVATE_KEY
  ```

- Certifique-se de não compartilhar sua private key.

4. **Rode o projeto**

   ```bash
   npm run dev
   ```

- O servidor de desenvolvimento será iniciado e você poderá acessar a aplicação no endereço http://localhost:5173 (ou outra porta, se especificada).

5. **Rodar os testes**

   ```bash
   npm run test
   ```

## Estrutura do Projeto

```bash
 marvel/
 ├── public/               # Arquivos públicos (imagens, ícones, etc.)
 ├── src/                  # Código-fonte da aplicação
 │   ├── components/       # Componentes React reutilizáveis
 │   │    ├── Accordion    # Componente de acordeão
 │   │    ├── Button       # Componente de botão
 │   │    ├── Card         # Componente de card
 │   │    ├── Input        # Componente de input
 │   ├── pages/            # Páginas da aplicação
 │   │    ├── Marvel       # Página principal com a lista de personagens
 │   ├── services/         # Serviços para chamadas à API
 │   ├── index.css         # Estilos globais
 │   ├── main.tsx          # Ponto de entrada da aplicação
 │   ├── utils.tsx         # Funções utilitárias
 │   └── vite-env.d.ts     # Definições de tipos para Vite
 ├── .env                  # Variáveis de ambiente
 ├── .gitignore            # Arquivos e diretórios ignorados pelo Git
 ├── eslint.config.js      # Configuração do ESLint
 ├── index.html            # Página HTML principal
 ├── package-lock.json     # Versões exatas das dependências instaladas
 ├── package.json          # Dependências e scripts do projeto
 ├── postcss.config.cjs    # Configuração do PostCSS
 ├── tailwind.config.js    # Configuração do TailwindCSS
 ├── tsconfig.app.json     # Configuração do TypeScript para a aplicação
 ├── tsconfig.json         # Configuração principal do TypeScript
 ├── tsconfig.node.json    # Configuração do TypeScript para Node.js
 ├── vite.config.ts        # Configuração do Vite
 └── vitest-setup.ts       # Configuração do Vitest para testes
```
