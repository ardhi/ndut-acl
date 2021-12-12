module.exports = async function (request, reply) {
  if (!request.user) return
  const roleUser = await this.ndutDb.findOne('AclRoleUser', request, { where: { userId: request.user.id } })
  if (!roleUser) throw this.Boom.forbidden('User doesn\'t have any role yet')
  const role = await this.ndutDb.findOne('AclRole', request, { where: { id: roleUser.roleId, status: 'ENABLED' } })
  if (!role) throw this.Boom.forbidden('No such role found or role is currently disabled')
  const roleRoute = await this.ndutDb.findOne('AclRoleRoute', request, { where: { roleId: roleUser.roleId } })
  console.log(roleRoute)
}
