import { config } from 'dotenv';
import { createHmac } from 'crypto';
config();

const hash = createHmac('sha256', process.env.SECRET_KEY)
  .update('I love cupcakes')
  .digest('hex');


console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e



// const fastify = require('fastify')();

// const { ADDRESS = 'localhost', PORT = '3000' } = process.env;

// fastify.get('/', async (request, reply) => {
//   return { message: 'Hello world!' }
// })

// fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })