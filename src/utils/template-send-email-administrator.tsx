import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface TemplateSendEmailAdministratorProps {
  name: string
  email: string
  password: string
}

export function TemplateSendEmailAdministrator({
  name,
  email,
  password,
}: TemplateSendEmailAdministratorProps) {
  return (
    <Html>
      <Head />
      <Preview>Informações do Usuário - INSS Digital OAB</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto my-12">
            <Section className="bg-gradient-to-r from-blue-600 to-blue-800 p-12">
              <Row>
                <Column align="center">
                  <Heading className="text-3xl font-bold text-white m-0 text-center">
                    INSS Digital OAB
                  </Heading>
                  <Text className="text-blue-200 text-lg m-0 text-center">
                    Informações do Administrador
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="px-12 py-8">
              <Heading className="text-2xl font-bold text-gray-800 mb-6">
                Olá, {name}!
              </Heading>
              <Text className="text-gray-700 mb-6 text-lg">
                Este é um email automático contendo suas informações registradas
                em nosso sistema:
              </Text>
              <Section className="bg-blue-50 flex flex-col items-start justify-start gap-4 border border-blue-100 rounded-lg p-8 mb-8">
                <Row className="mb-6">
                  <Column className="w-1/3">
                    <Text className="text-blue-600 font-semibold text-lg">
                      Nome completo: <b>{name}</b>
                    </Text>
                  </Column>
                </Row>
                <Row className="mb-6">
                  <Column className="w-1/3">
                    <Text className="text-blue-600 font-semibold text-lg">
                      Seu e-mail: <b>{email}</b>
                    </Text>
                  </Column>
                </Row>
                <Row className="mb-6">
                  <Column className="w-1/3">
                    <Text className="text-blue-600 font-semibold text-lg">
                      Sua senha: <b>{password}</b>
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Text className="text-gray-700 mb-8 text-lg">
                Por favor, verifique se todas as informações estão corretas.
                Caso haja alguma discrepância, entre em contato conosco.
              </Text>
              <Hr className="border-gray-300 my-8" />
              <Text className="text-base text-gray-600 text-center">
                Este é um email automático. Por favor, não responda a esta
                mensagem.
              </Text>
            </Section>
            <Section className="bg-gray-100 px-12 py-8">
              <Text className="text-sm text-gray-600 text-center">
                © 2024 Gerência de Tecnologia da Informação. Todos os direitos
                reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
