# Nomos App

## RFs (Requisitos funcionais)
> Advogado
* [X] Deve ser possível se cadastrar (numéro de oab, cpf e data de nascimento)
* [X] Deve ser possível se autenticar (numéro de oab e cpf)
* [ ] Deve ser possível obter o perfil com os dados do advogado logado
* [ ] Deve ser possível confirmar a intenção de cadastro ao sistema do GERID
* [ ] Deve ser possível se deslogar do sistema

> Administrador
* [X] Deve ser possível se cadastrar somente usando um código de segurança
* [X] Deve ser possível se autenticar (email e senha) 
* [X] Deve ser possível obter o perfil de um usuário logado
* [ ] Deve ser possível obter todos os advogados cadastrados (nome, cpf, email e telefone, posição financeira)
* [ ] Deve ser possível obter o número de solicitações (advogados) de acesso ao sistema
* [ ] Deve ser possível obter o número de solicitações (advogados) de acesso ao sistema que estão confirmados
* [ ] Deve ser possível confirmar se um advogado foi cadastrado no sistema do GERID 

## RNs (Regras de negócio)
> Advogado
* [X] O usuário não poderá ser logar se não for um advogado
* [X] O usuário caso for um advogado não poderá se logar com um cpf diferente do seu
* [ ] O usuário precisará confirmar sua solicitação de acesso ao sistema

> Administrador
* [ ] O advogado só poderá ser confirmado no sistema do GERID por administradores
  

## RNFs (Requisitos não-funcionais)
* [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
* [ ] Todas as listas com os dados dos advogados precisam estar paginadas com 10 itens por página
* [X] Um administrador deve ser identificado por um JWT (JSON Web Token)
* [X] Um advogado deve ser identificado por um JWT (JSON Web Token)
* [X] A consulta dos dados dos advogados virão de uma API externa