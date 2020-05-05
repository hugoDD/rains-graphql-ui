export const menuPages = `query menuPages($request:QueryRequest){
  pages:menuPageQuery(page: $request){
    data {
      id
      label
      menuId
      parentId
      menuName
      path
      component
      perms
      icon
      type
      orderNum
      createTime
      modifyTime
      visible
    }
    total
  }
 }`

export const initMenPages = `query menuPages($request:QueryRequest){
  pages:menuPageQuery(page: $request){
    data {
      id
      label
      menuId
      parentId
      menuName
      path
      component
      perms
      icon
      type
      orderNum
      createTime
      modifyTime
      visible
    }
    total
  }
  dictShowHide: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_show_hide"}){
     data {
      # 字典编码
      dictCode
      # 字典标签
      dictLabel
      # 字典类型
      dictType
      # 字典键值
      dictValue
    }
  }
}`

export const menuTree = `query menuTree($request:QueryRequest){
  menuTree :menuPageQuery(page: $request){
    data {
      id
      parentId
      label
    }

  }
}`

export const menuList = `query menuList($condition: MenuCondition) {
  menuTree: list(condition: $condition) {
    menuId
    parentId
    menuName
    path
    component
    perms
    icon
    type
    orderNum
    createTime
    modifyTime
  }
}`

export const menuBaseMutation = `mutation menuBaseMutation($request:QueryRequest){
  menuBaseMutation(page:$request)
}`
