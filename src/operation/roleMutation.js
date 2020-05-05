export const addRole = `mutation addRole($roleInfo: RoleCondition) {
  addRole(role: $roleInfo) {
    roleId
    roleName
    remark
    createTime
    modifyTime
  }
}`

export const updateRole = `mutation updateRole($role: RoleCondition) {
  updateRole(role: $role) {
    roleId
    roleName
  }
}`

export const delRoles = `mutation delRoles($roleIds: [String!]!){
  deleteRoles(roleIds:$roleIds )
}`

export const excelExport = `mutation roleExport($page:QueryRequest,$entity:RoleCondition){
  roleExport(page:$page,role:$entity)
}`
