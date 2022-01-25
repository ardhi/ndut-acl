module.exports = async function (request, reply) {
  if (!request.user) return
  if (!request.protected.rest) return
  const roleUser = await this.ndutDb.findOne('AclRoleUser', request, { where: { userId: request.user.id } })
  if (!roleUser) throw this.Boom.forbidden('User doesn\'t have any role yet')
  const role = await this.ndutDb.findOne('AclRole', request, { where: { id: roleUser.roleId, status: 'ENABLED' } })
  if (!role) throw this.Boom.forbidden('No such role found or role is currently disabled')
  const roleRoutes = await this.ndutDb.find('AclRoleRoute', request, { where: { roleId: roleUser.roleId } })
  const isMatch = this.ndutAuth.helper.routeMatch(request, roleRoutes)
  if (!isMatch) throw this.Boom.forbidden('Access Denied')
  request.role = role
}
