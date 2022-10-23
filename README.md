
# NaTrave
Projeto de aplicação web desenvolvido no evento Full Stack Challenge da Codar.me

## Conteúdo
* [Sobre a aplicação](#sobre-a-aplicação)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando a Aplicação](#car-iniciando-a-aplicação)
* [Pré-visualização](#camera_flash-pré-visualização)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre a aplicação
Este projeto de aplicação foi desenvolvido durante o evento __Full Stack Challenge__, edição Copa 2022, promovido pela Codar.me.<br />
Foram 5 dias de aula, totalizando um pouco mais de 10 horas de vídeo, desenvolvendo uma API em NodeJS e um Front-end em React.<br />
A aplicação possui uma tela de login, cadastro de usuário, dashboard e tela de perfil. Ao entrar no sistema, o usuário logado visualiza os jogos da Copa do Mundo 2022, de acordo com o dia e horário informado.<br/>
É possível acompanhar e filtrar os jogos por data. Além disso, permite realizar palpites sobre os resultados dos jogos.<br/>
Todos os palpites são armazenados na nuvem, em um banco de dados chamado [PlanetScale](https://planetscale.com).<br />
Novas melhorias foram realizadas no Front-end, como por exemplo, adicionado notificações de erro utilizando o plugin __React-Toastify__, adicionado um novo tratamento nas requisições feitas pelo __Axios__ com novas validações de usuário.<br />


## :hammer_and_wrench: Tecnologias
* Back-end
  * __Node__ + __Koa__ + __Cors__
  * __Prisma ORM__ para acessar o banco de dados
  * __JWT__ para autenticação JWT (JSON Web Tokens)
* Front-end
  * __React + Vite__
  * __Tailwind CSS__ para estilização.
  * __Formik / Yup__ para validação de formulários
  * __React-Use__ para Hooks
  * __Date-Fns__ para formatar datas.
  * __React-Toastify__ para exibição de notificações de mensagens
  * __Axios__ para acessar a API.
<br />

## :car: Iniciando a aplicação
Baixe o repositório com git clone e entre na pasta do projeto.<br/>
Renomeie os arquivos _.env.example_ para _.env_ e informe as URLs e o JWT secret. É necessário ter um login no __PlanetScale__ para configurar as credenciais no arquivo _.env_ do código.<br/>
```bash
$ git clone https://github.com/Ruanfrm/natrave.git

* Front-end
```bash
$ cd ..
$ cd web
$ npm install
$ npm run dev
```



## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**ruanfreire@protonmail.com**](ruanfreire@protonmail.com)
