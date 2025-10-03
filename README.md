# Gerenciador de Tarefas - Frontend

Aplicação frontend desenvolvida em **Angular 20** para gerenciamento de tarefas, com autenticação de usuários e exibição de gráficos.  

Este projeto consome duas APIs RESTful:  
- [Autenticação API](https://github.com/a-devrepo/autenticacaoApi)  
- [Agenda API](https://github.com/a-devrepo/agendaApi)  

## Funcionalidades

- Login e registro de usuários  
- Autenticação via **JWT**  
- Criação, edição, exclusão e listagem de tarefas  
- Exibição de estatísticas com **Highcharts**  
- Estilização responsiva com **Bootstrap**

## Tecnologias

- **Angular 20**  
- **JWT** e **CryptoJS** para autenticação  
- **Highcharts** para gráficos interativos  
- **Bootstrap** para layout e estilos  

## Interface

### Login
![Login](https://github.com/a-devrepo/docsimages/blob/main/telas_agenda/login.png)

### Cadastro
![Cadastro](https://github.com/a-devrepo/docsimages/blob/main/telas_agenda/cadastro.png)

### Dashboard
![Dashboard](https://github.com/a-devrepo/docsimages/blob/main/telas_agenda/dashboard.png)

### Formulário de tarefas
![Formulario](https://github.com/a-devrepo/docsimages/blob/main/telas_agenda/nova_tarefa.png)

### Lista de tarefas
![Lista](https://github.com/a-devrepo/docsimages/blob/main/telas_agenda/lista_tarefas.png)

### Edição de tarefas
![Lista](https://github.com/a-devrepo/docsimages/blob/main/telas_agenda/edicao.png)

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/a-devrepo/agendaWeb
   cd agendaWeb
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute a aplicação:
   ```bash
   ng serve
   ```

4. Acesse em:
   ```
   http://localhost:4200
   ```
## Integração

- A autenticação é realizada pela [Autenticação API](https://github.com/a-devrepo/autenticacaoApi).  
- O gerenciamento de tarefas é realizado pela [Agenda API](https://github.com/a-devrepo/agendaApi).