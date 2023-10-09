import { VercelRequest, VercelResponse } from '@vercel/node';

import api from '../src/index.js'

/**
 * Serverless function handler
 */
export default async function handler(request: VercelRequest, response: VercelResponse): Promise<any> {
  await api.ready();

  api.emit(request, response);
}

/**
 * Handler for 'error' event that can be emitted by worker
 */
process.on('error', (err) => {
  console.error('\n\n❌ Process error: \n', err);
});

/**
 * Catch unhandled exceptions
 */
process.on('uncaughtException', (err) => {
  console.error('\n\n❌ Uncaught Exception: \n', err);
});

/**
 * Catch unhandled rejections
 */
process.on('unhandledRejection', (error) => {
  console.error('\n\n❌ Unhandled promise rejection: \n', error);
});
