export default function handler(request, response) {
  const { name = 'World' } = request.query;
  return response.send(`Hello ${name}!`);
}
