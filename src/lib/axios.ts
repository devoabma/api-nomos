import axios from 'axios'

import { env } from '@/env'

export const API_PROTHEUS = axios.create({
  baseURL: env.API_PROTHEUS,
})

export const API_PROTHEUS_SITUATION = axios.create({
  baseURL: env.API_PROTHEUS_SITUATION,
})
