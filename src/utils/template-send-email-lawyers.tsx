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
  Text,
} from '@react-email/components'
import React from 'react'

import { getCurrentDateInfo } from '@/utils/get-current-date-info'

import { formatCPF } from './format-cpf'
import { formtarDateBirth } from './format-date-birth'

interface TemplateSendEmailLawyersProps {
  name: string
  cpf: string
  oab: string
  email: string
  birth: string
}

export function TemplateSendEmailLawyers({
  name,
  cpf,
  oab,
  email,
  birth,
}: TemplateSendEmailLawyersProps) {
  const { day, fullMonth, year } = getCurrentDateInfo()

  return (
    <Html>
      <Head />
      <Preview>Informações do Usuário - INSS Digital OAB</Preview>
      <Body className="bg-gray-100 font-sans">
        <Container className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto my-12">
          <Section className="bg-gradient-to-r from-blue-600 to-blue-800 p-12">
            <Row>
              <Column align="center">
                <Heading className="text-3xl font-bold text-white m-0 text-center">
                  INSS Digital OAB
                </Heading>
                <Text className="text-blue-200 text-lg m-0 text-center">
                  Informações do Advogado(a)
                </Text>
              </Column>
            </Row>
          </Section>
          <Section className="px-12 py-8">
            <Heading className="text-2xl font-bold text-gray-800 mb-6">
              Olá, {name}!
            </Heading>
            <Text className="text-gray-700 mb-6 text-lg">
              Este é um email automático contendo suas informações que foram
              registradas no GERID
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
                    Número do CPF: <b>{formatCPF(cpf)}</b>
                  </Text>
                </Column>
              </Row>
              <Row className="mb-6">
                <Column className="w-1/3">
                  <Text className="text-blue-600 font-semibold text-lg">
                    Número de OAB: <b>{oab}</b>
                  </Text>
                </Column>
              </Row>
              <Row className="mb-6">
                <Column className="w-1/3">
                  <Text className="text-blue-600 font-semibold text-lg">
                    Seu -email: <b>{email}</b>
                  </Text>
                </Column>
              </Row>
              <Row className="mb-6">
                <Column className="w-1/3">
                  <Text className="text-blue-600 font-semibold text-lg">
                    Data de nascimento: <b>{formtarDateBirth(birth)}</b>
                  </Text>
                </Column>
              </Row>
            </Section>
            <Text className="text-gray-700 mb-8 text-lg">
              Cadastro no GERID realizado em ${day} de ${fullMonth} de ${year}
            </Text>
            <Hr className="border-gray-300 my-8" />
            <Text className="text-gray-700 mb-8 text-lg">
              Por favor, verifique se todas as informações estão corretas. Caso
              haja alguma discrepância, entre em contato conosco.
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
    </Html>
  )
}
