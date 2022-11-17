module.exports = async function beforeUpdateAuth ({ model, params = {}, body = {}, filter = {} }) {
  const private = await this.ndutAcl.helper.isPrivateModel(model)
  const updatedBy = await this.ndutAcl.helper.isUpdatedByModel(model)
  const filterGid = (filter.group || {}).id
  if (updatedBy && filterGid) body.updatedByGid = filterGid
  if (private && filterGid) params.gid = filterGid
}
