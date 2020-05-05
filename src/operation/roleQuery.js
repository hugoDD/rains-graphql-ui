export const rolePageQuery = `query rolePageQuery( $request:QueryRequest){
  pages:rolePageQuery(page: $request){
    data {
      roleId
      roleName
      roleKey
      roleSort
      dataScope
      status
      delFlag
      createBy
      createTime
      modifyBy
      modifyTime
    }
    total
  }
}`

export const initScopeDataQuery = `query rolePageQuery( $request:QueryRequest){
  pages:rolePageQuery(page: $request){
    data {
      roleId
      roleName
      roleKey
      roleSort
      dataScope
      status
      delFlag
      createBy
      createTime
      modifyBy
      modifyTime
      deptIds
      depts {
        id
        parentId
        label
      }
    }
  }
}`

export const initUpdateRoleQuery = `query rolePageQuery( $request:QueryRequest){
  pages:rolePageQuery(page: $request){
    data {
      roleId
      roleName
      roleKey
      roleSort
      dataScope
      status
      delFlag
      createBy
      createTime
      modifyBy
      modifyTime
      menuIds
      menus {
        parentId
        id
        label
      }
    }
  }
}`

export const initRoleQuery = `query rolePageQuery( $request:QueryRequest){
  pages:rolePageQuery(page: $request){
    data {
      roleId
      roleName
      roleKey
      roleSort
      dataScope
      status
      delFlag
      createBy
      createTime
      modifyBy
      modifyTime
    }
    total
  }
  dictNormalDisable: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_normal_disable"}) {
    data {
      createBy
      # 创建时间
      createTime
      # 样式属性（其他样式扩展）
      cssClass
      # 字典编码
      dictCode
      # 字典标签
      dictLabel
      # 字典排序
      dictSort
      # 字典类型
      dictType
      # 字典键值
      dictValue
      # 是否默认（Y是 N否）
      isDefault
      # 表格回显样式
      listClass
      # 备注
      remark
      # 状态（0正常 1停用）
      status
      # 更新者
      updateBy
      # 更新时间
      updateTime
    }
  }
}`

export const checkRoleNameQuery = `query detail($roleName: String!) {
  roleDetail(roleName: $roleName) {
    roleId
    roleName
  }
}`

export const roleDetail = `query roleDetail($roleName: String!){
  roleDetail(roleName: $roleName) {
    roleId
    roleName
    remark
    createTime
    modifyTime
    menuIds
  }
}`

export const roleBaseMutation = `mutation roleBaseMutation($request:QueryRequest){
  roleBaseMutation(page:$request)
}`
