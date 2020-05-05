export const addMenu = `mutation add($entity:MenuCondition){
  addMenu(entity: $entity){
    menuId
    parentId
    menuName
  }
}`

export const updateMenu = `mutation update($entity:MenuCondition){
  updateMenu(entity: $entity){
    menuId
    parentId
    menuName
  }
}`

export const delmenu = `mutation delete($menuIds:[String!]!){
  deleteMenus(menuIds: $menuIds)
}`

export const excelExport = `mutation menuExport($entity:MenuCondition){
  menuExport(entity:$entity)
}`
