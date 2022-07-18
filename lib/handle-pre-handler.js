module.exports = async function (request, reply) {
  if (!request.user) return
  if (!request.protected) return
  let groupUser
  try {
    const where = { uid: request.user.id }
    const item = await this.ndutApi.helper.findOne({ model: 'AclGroupUser', params: { where } })
    groupUser = item.data
  } catch (err) {}
  if (!groupUser) throw this.Boom.badData('userDoesntBelongsToAnyGroup', { ndut: 'acl' })

  let group
  try {
    const where = { gid: groupUser.gid, status: 'ENABLED' }
    const item = await this.ndutApi.helper.findOne({ model: 'AclGroup', params: { where } })
    group = item.data
  } catch (err) {}
  if (!group) throw this.Boom.badData('noGroupFoundOrGroupIsDisabled', { ndut: 'acl' })

  // TODO: if route belongs to group private model, it should be handled automatically
  let groupRoute
  try {
    const where = { gid: group.gid }
    const item = await this.ndutApi.helper.find({ model: 'AclGroupRoute', params: { where } })
    groupRoute = item.data
  } catch (err) {}
  if (!groupRoute || groupRoute.length === 0) throw this.Boom.badData('noRouteAvailable', { ndut: 'acl' })
  const isMatch = this.ndutAuth.helper.routeMatch(request, groupRoute)
  if (!isMatch) throw this.Boom.forbidden('accessDenied', { ndut: 'acl' })
  request.group = group
}
