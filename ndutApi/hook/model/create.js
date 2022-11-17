module.exports = async function beforeCreateAcl ({ model, body = {}, filter = {} }) {
  const supported = await this.ndutAcl.helper.isGroupSupportedModel(model)
  const private = await this.ndutAcl.helper.isPrivateModel(model)
  const createdBy = await this.ndutAcl.helper.isCreatedByModel(model)
  const updatedBy = await this.ndutAcl.helper.isUpdatedByModel(model)
  const filterGid = (filter.group || {}).id
  if (createdBy && filterGid) body.createdByGid = filterGid
  if (updatedBy && filterGid) body.updatedByGid = filterGid
  if (private && filterGid) {
    body.gid = filterGid
    return
  }
  if (supported && filterGid && !body.gid) body.gid = filterGid
}
