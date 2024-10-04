Rotas de alunos, coordenadores, professores, turmas e cursos.
>É necessário fazer requisições para usar as rotas



## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Instale as dependências:
   ```bash
   npm install
    ```

3. Configure o banco de dados e as variáveis de ambiente no arquivo .env.

4. Execute as migrações e seeds para preparar o banco de dados:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
    ```
5. Inicie o servidor:
   ```bash
   npm start
    ```


# Explicação das rotas
Aluno
```js
GET /api/students
POST /api/students/store
POST /api/students/store-by-file
DELETE /api/students/{user_id}
PUT /api/students/{user_id}
```

Professor
```js
GET /api/teachers
POST /api/teachers/store
DELETE /api/teachers/{user_id}
PUT /api/teachers/{user_id}
```

Coordenador
```js
GET /api/coordinators
POST /api/coordinators/store
DELETE /api/coordinators/{user_id}
PUT /api/coordinators/{user_id}
```

Professor
```js
GET /api/teachers
POST /api/teachers/store
DELETE /api/teachers/{user_id}
PUT /api/teachers/{user_id}
```

Curso
```js
GET /api/courses
POST /api/courses/store
DELETE /api/courses/{user_id}
PUT /api/courses/{user_id}
```

Turma
```js
GET /api/classes
POST /api/classes/store
DELETE /api/classes/{user_id}
PUT /api/classes/{user_id}
```

<br>

# Rotas de Aluno

### Listar Alunos
`GET /api/students`

Retorna uma lista de todos os alunos cadastrados no sistema.

### Criar Aluno
`POST /api/students/store`

Cadastra um novo aluno. Requer os seguintes dados no corpo da requisição:
- `name`: Nome do aluno (string, obrigatório)
- `email`: Email do aluno (string, obrigatório)
- `password`: Senha do aluno (string, obrigatório)
- `code`: Código de matrícula ou identificação (string, opcional)

### Criar Alunos por Arquivo
`POST /api/students/store-by-file`

Permite o cadastro de vários alunos de uma só vez através de um arquivo XLSX. O arquivo deve conter os dados de cada aluno conforme o formato especificado.

### Deletar Aluno
`DELETE /api/students/{user_id}`

Remove um aluno específico pelo `user_id`.

### Atualizar Aluno
`PUT /api/students/{user_id}`

Atualiza os dados de um aluno específico pelo `user_id`. Os campos de atualização podem ser enviados no corpo da requisição.

<br>

# Rotas de Professor

### Listar Professores
`GET /api/teachers`

Retorna uma lista de todos os professores cadastrados no sistema.

### Criar Professor
`POST /api/teachers/store`

Cadastra um novo professor. Requer os seguintes dados no corpo da requisição:
- `name`: Nome do professor (string, obrigatório)
- `email`: Email do professor (string, obrigatório)
- `password`: Senha do professor (string, obrigatório)
- `code`: Código de identificação (string, opcional)

### Deletar Professor
`DELETE /api/teachers/{user_id}`

Remove um professor específico pelo `user_id`.

### Atualizar Professor
`PUT /api/teachers/{user_id}`

Atualiza os dados de um professor específico pelo `user_id`.

<br>

# Rotas de Coordenador

### Listar Coordenadores
`GET /api/coordinators`

Retorna uma lista de todos os coordenadores cadastrados no sistema.

### Criar Coordenador
`POST /api/coordinators/store`

Cadastra um novo coordenador. Requer os seguintes dados no corpo da requisição:
- `name`: Nome do coordenador (string, obrigatório)
- `email`: Email do coordenador (string, obrigatório)
- `password`: Senha do coordenador (string, obrigatório)
- `code`: Código de identificação (string, opcional)

### Deletar Coordenador
`DELETE /api/coordinators/{user_id}`

Remove um coordenador específico pelo `user_id`.

### Atualizar Coordenador
`PUT /api/coordinators/{user_id}`

Atualiza os dados de um coordenador específico pelo `user_id`.

<br>

# Rotas de Curso

### Listar Cursos
`GET /api/courses`

Retorna uma lista de todos os cursos cadastrados no sistema.

### Criar Curso
`POST /api/courses/store`

Cadastra um novo curso. Requer os seguintes dados no corpo da requisição:
- `name`: Nome do curso (string, obrigatório)
- `description`: Descrição do curso (string, opcional)
- `coordinator_id`: ID do coordenador responsável (inteiro, opcional)

### Deletar Curso
`DELETE /api/courses/{course_id}`

Remove um curso específico pelo `course_id`.

### Atualizar Curso
`PUT /api/courses/{course_id}`

Atualiza os dados de um curso específico pelo `course_id`.

<br>

# Rotas de Turma

### Listar Turmas
`GET /api/classes`

Retorna uma lista de todas as turmas cadastradas no sistema.

### Criar Turma
`POST /api/classes/store`

Cadastra uma nova turma. Requer os seguintes dados no corpo da requisição:
- `name`: Nome da turma (string, obrigatório)
- `course_id`: ID do curso relacionado (inteiro, obrigatório)

### Deletar Turma
`DELETE /api/classes/{class_id}`

Remove uma turma específica pelo `class_id`.

### Atualizar Turma
`PUT /api/classes/{class_id}`

Atualiza os dados de uma turma específica pelo `class_id`.

---

## Observações
- As rotas usam `user_id`, `course_id` e `class_id` para identificar usuários, cursos e turmas respectivamente.
- As requisições `POST` e `PUT` exigem o envio dos dados no corpo da requisição em formato JSON.
- As rotas protegidas não necessitam de autenticação

---

## Tecnologias Utilizadas
- **Node.js**
- **Express**
- **Sequelize** (ORM para o banco de dados)
- **MySQL**

---

