# App - Gym CheckIn

## Requisitos Funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil do usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o histórico de check-ins;
- [x] Deve ser possível localizar as academias mais próximas (até 10km);
- [x] Deve ser possíve o usuário buscar a academia pelo nome;
- [x] Deve ser possível o usuário realizar o check-in em uma cademia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## Regras de Negócio

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [x] O usuário não pode fazer dois check-ins no mesmo dia;
- [x] O usuário não pode fazer check-ins se não estiver a 100m da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## Requisitos Não Funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco postgree
- [x] Todos os dados precisam estar paginados por 20 em cada página
- [x] Os usuŕios precisam estar identificados por um JWT
