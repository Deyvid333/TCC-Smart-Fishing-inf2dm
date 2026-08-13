# Como contribuir com o projeto

Guia rápido para quem está entrando no time. Siga esses passos na ordem.

## 1. Aceitar o convite

Você precisa ser adicionado como colaborador no repositório do GitHub. Aceite o convite que chega por e-mail ou na aba de notificações do GitHub.

## 2. Instalar as ferramentas necessárias

- [Git](https://git-scm.com/)
- Uma IDE, recomendado [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) (para o front-end em React)
- JDK + Maven (para o back-end) — pergunte ao time a versão usada, se necessário

## 3. Clonar o repositório

Só na primeira vez. Escolha uma pasta no seu computador e rode:

```
git clone https://github.com/Deyvid333/TCC-Smart-Fishing-inf2dm.git
cd TCC-Smart-Fishing-inf2dm
```

Como você é colaborador, esse clone já vem com permissão de `push` — **não é necessário dar fork**.

## 4. Instalar as dependências

Front-end (React):

```
cd React
npm i
```

Back-end: siga as instruções do time (ex: `./mvnw` na pasta do back).

## 5. Rodar o projeto localmente

```
npm run dev
```

Abre em `http://localhost:5173/`. Se estiver usando o GitHub Codespaces, use o botão da aba **PORTS** para abrir a URL — não digite a URL manualmente, ela pode mudar.

## 6. Fluxo de trabalho com branches

**Nunca codar direto na `main`.** Sempre criar uma branch por tarefa.

Antes de começar qualquer tarefa nova:

```
git checkout main
git pull
git checkout -b feature/nome-da-tarefa
```

Exemplo: `git checkout -b feature/tela-login`

Durante o trabalho, para ver em qual branch você está:

```
git branch
```

A branch atual aparece marcada com `*`.

## 7. Commitar e subir as mudanças

```
git add .
git commit -m "Descrição do que foi feito"
git push -u origin feature/nome-da-tarefa
```

(o `-u` só é necessário na primeira vez que você sobe aquela branch)

## 8. Abrir o Pull Request

No GitHub, depois do push, geralmente aparece um botão **"Compare & pull request"** na página do repositório. Clique, descreva o que foi feito, e abra o PR contra a `main`.

Alguém do time revisa e faz o merge. Depois disso, todo mundo deve atualizar a `main` local antes de começar a próxima tarefa:

```
git checkout main
git pull
```

## 9. Se der conflito ao atualizar

Acontece quando duas pessoas mexeram na mesma linha do mesmo arquivo. O Git marca o trecho conflitante assim:

```
<<<<<<< HEAD
seu código
=======
código do colega
>>>>>>> nome-da-branch
```

Edite o arquivo, decida o que fica (pode ser um dos dois ou os dois combinados), apague as marcações `<<<<<<<`, `=======`, `>>>>>>>`, salve, e finalize com:

```
git add nome-do-arquivo
git commit
```

## Resumo das regras

- Sempre `git pull` na `main` antes de criar uma branch nova.
- Uma branch por tarefa, nunca codar direto na `main`.
- Commits pequenos e frequentes são mais fáceis de revisar e de resolver conflito.
- Ao abrir a URL do Codespaces, use o botão da aba PORTS, não digite manualmente.