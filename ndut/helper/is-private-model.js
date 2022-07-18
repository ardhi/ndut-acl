module.exports = async function (instance) {
  const { _ } = this.ndut.helper
  const { isGroupSupportedModel } = this.ndutAcl.helper
  const { getSchemaByName } = this.ndutDb.helper
  const model = typeof instance === 'string' ? this.ndutDb.model[instance] : instance
  const groupSupported = await isGroupSupportedModel(model.name)
  const schema = await getSchemaByName(model.name)
  return groupSupported && _.get(schema, 'feature.ndutAclPrivate')
}
