module.exports = async function beforeFindOneAcl ({ model, params = {}, filter = {} }) {
  const private = await this.ndutAcl.helper.isPrivateModel(model)
  params.where = params.where || {}
  if (private && (filter.group || {}).id) params.where.gid = filter.group.id
}
