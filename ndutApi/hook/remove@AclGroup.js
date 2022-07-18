module.exports = async function beforeRemoveAuth ({ model, params = {}, filter = {} }) {
  const { _ } = this.ndut.helper
  const group = await this.ndutApi.helper.findOne({ model: 'AclGroup', params: { where: { id: params.id } } })
  if (['ADMINS'].includes(_.get(group, 'data.id'))) throw this.Boom.forbidden('cantRemoveAdministrators', { ndut: 'acl' })
}
