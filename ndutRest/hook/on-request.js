module.exports = async function (request, reply) {
  const { AclRoleUser, AclRoleRoute } = this.ndutDb.model
  const roleUser = AclRoleUser.findOne({ where: { userId: request.user.id } })
  // TODO: add status on role
  if (!roleUser) throw this.Boom.forbidden('No role found')
  const roleRoute = AclRoleRoute.findOne({ where: { roleId: roleUser.roleId } })

}
