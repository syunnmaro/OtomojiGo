// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0'

// eslint-disable-next-line import/prefer-default-export
export const GET = handleAuth()
