module.exports = {
  schema: {
    description: 'Show your group profile',
    tags: ['Acl']
  },
  handler: async function (request, reply) {
    return {
      data: request.group
    }
  }
}
