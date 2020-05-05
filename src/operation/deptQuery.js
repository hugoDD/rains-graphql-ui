export const deptsQuery = `query deptQuery($request:QueryRequest){
  pages:deptPageQuery(page: $request){
    data {
      deptId
      parentId
      ancestors
      deptName
      orderNum
      leader
      phone
      email
      status
      delFlag
      createBy
      createTime
      modifyTime
      modifyBy
      id
      label
      key
      value
    }
    total
  }
}`

export const initDeptsQuery = `query initDeptQuery($request:QueryRequest){
  pages: deptPageQuery(page: $request){
    data {
      deptId
      parentId
      deptName
      status
      orderNum
      createTime
      modifyTime
      id
      label
      key
      value
    }
    total
  }
  sysNormalDisable: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_normal_disable"}){
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

export const roleDeptTree = `query roleDeptTree( $request:QueryRequest){
  pages:rolePageQuery(page: $request){
    data {
      roleId
      roleName
      depts {
        id
        parentId
        label
      }
    }
  }
}`

export const detail = `query detail($entity: DeptCondition){
  deptDetail(entity: $entity){
    deptId
    parentId
    deptName
    orderNum
    createTime
    modifyTime
  }
}`
export const deptBaseMutation = `mutation deptBaseMutation($request:QueryRequest){
  deptBaseMutation(page:$request)
}`
