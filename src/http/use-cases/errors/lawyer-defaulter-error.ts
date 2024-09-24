export class LawyerDefaulterError extends Error {
  constructor() {
    super(
      'Não podemos seguir com o cadastro! Por favor, entre em contato com o Setor Financeiro para regularização.',
    )
  }
}
