module.exports = async function (fastify) {
  const name = 'ndut-acl'
  const dependency = ['ndut-db', 'ndut-auth']
  return { name, dependency }
}
