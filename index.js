module.exports = async function () {
  const name = 'ndut-acl'
  const dependency = ['ndut-db', 'ndut-auth']
  return { name, dependency }
}
