# Financy

## Funcionalidades e Regras

Assim como na API, temos as seguintes funcionalidades e regras:

- [x]  O usuário pode criar uma conta e fazer login
- [x]  O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [x]  Deve ser possível criar uma transação
- [x]  Deve ser possível deletar uma transação
- [x]  Deve ser possível editar uma transação
- [x]  Deve ser possível listar todas as transações
- [x]  Deve ser possível criar uma categoria
- [x]  Deve ser possível deletar uma categoria
- [x]  Deve ser possível editar uma categoria
- [x]  Deve ser possível listar todas as categorias

Além disso, também temos algumas regras importantes específicas para o front-end:

- [x]  É obrigatória a criação de uma aplicação React usando GraphQL para consultas na API e Vite como `bundler`;
- [x]  Siga o mais fielmente possível o layout do Figma;

## Páginas

Essa aplicação possui 6 páginas e dois modais com os formulários (Dialog):

- A página raiz (`/`) que exibe:
    - Tela de login caso o usuário esteja deslogado
    - Tela dashboard caso usuário esteja logado

## Ferramentas

É obrigatório o uso de:

- Typescript
- React
- Vite sem framework
- [GraphQL](https://graphql.org/)

É flexível o uso de:

- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/docs)
- [React Query](https://tanstack.com/query/v5/docs/framework/react/overview)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias:

```
VITE_BACKEND_URL=
```

## Dicas

- Comece o projeto pela aba `Style Guide` no [Figma](https://www.figma.com/design/E790OZDhJfue0D7v7jwOIf/Financy--Community-?node-id=1085-814&t=20QRTE6Mf19vfHJQ-0). Dessa forma, você prepara todo o seu tema, fontes e componentes e quando for criar as páginas vai ser bem mais tranquilo;
- Assim com a experiência do usuário é importante (UX), a sua experiência no desenvolvimento (DX) também é muito importante. Por isso, apesar de ser possível criar essa aplicação sem nenhuma biblioteca, recomendamos utilizar algumas bibliotecas que vão facilitar tanto o desenvolvimento inicial quanto a manutenção do código;
- Em caso de dúvidas, utilize o espaço da comunidade e do nosso fórum para interagir com outros alunos/instrutores e encontrar uma solução que funcione para você.

## O que falta
### Tela de Dashboard
- [x] Os cards, Receitas e Despesas do Mês deve apenas trazer os valores do mês corrente.
- [x] Exibir os 10 registros mais recentes
- [x] Alinhar os elementos da linha usando grid em vez de flex.
- [x] Adicionar um link ao selecionar "Ver todas" para a pagina Transações.
 
### Tela de Transações
- [x] Arrumar o filtro período
- [x] Paginação
- [x] Ajustar o layout da paginação.
- [x] Editar

### Tela de Categorias
- [x] O card mais utilizado deve ser atualizado (quando eu tiver mais de uma categoria qual usar?)