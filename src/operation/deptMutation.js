export const add = `mutation add($entity: DeptCondition){
  addDept(entity: $entity){
    deptId
  }
}`

export const update = `mutation update($entity: DeptCondition){
  updateDept(entity: $entity){
    deptId
  }
}`

export const del = `mutation del($ids: [String!]!){
  deleteDepts(deptIds: $ids)
}`

export const excelExport = `mutation deptExport($page:QueryRequest,$entity:DeptCondition){
  deptExport(entity:$entity,page:$page)
}`
