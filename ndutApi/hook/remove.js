module.exports = async function beforeRemoveAcl ({ model, params = {}, filter = {} }) {
  const private = await this.ndutAcl.helper.isPrivateModel(model)
  if (private && (filter.group || {}).id) params.gid = filter.group.id
}
