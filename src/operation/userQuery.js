export const userRouterQuery = `query userRouter($username: String!) {
  detail(username: $username) {
    roleKeys
    userDetail {
      userId
      username
      password
      deptId
      deptName
      email
      mobile
      status
      createTime
      modifyTime
      lastLoginTime
      sex
      description
      avatar
    }
    visitData {
      totalVisitCount
      todayVisitCount
      todayIp
      lastSevenVisitCount {
        days
        count
      }
      lastSevenUserVisitCount {
        days
        count
      }
    }
    routers {
      ...vueRouter
    }
    permissions
  }
}

fragment vueRouter on Router {
  id
  parentId
  path
  name
  component
  redirect
  meta {
    icon
    breadcrumb
    title
  }
  hasParent
  hasChildren
  children
}`

export const updatePwd = `mutation updatePassword($username:String!,$password:String!){
  updatePassword(username: $username, password: $password)
}`

export const userDetailQuery = `query userDetail($username: String!) {
  detail(username: $username) {
    userId
    username
    nickName
    deptId
    deptName
    email
    mobile
    status
    createTime
    modifyTime
    lastLoginTime
    sex
    description
    avatar
    posts {
      postId
      postCode
      postName
    }
    roles {
      roleId
      roleName
    }
  }
}`

export const usersPageQuery = `query userPageQuery($page: QueryRequest) {
  pageData: userPages(page: $page) {
    data {
      userId
      deptId
      username
      nickName
      deptName
      email
      mobile
      sex
      avatar
      password
      status
      createTime
      modifyTime
      lastLoginTime
    }
    total
  }
}`


export const initUserQuery = `query pageQuery($page: QueryRequest, $dept: DeptCondition) {
  pageData: userPage(page: $page) {
    data {
      userId
      deptId
      username
      nickName
      deptName
      email
      mobile
      sex
      avatar
      password
      status
      createTime
      modifyTime
      lastLoginTime
    }
    total
  }
  deptTree: deptPage(condition: $dept) {
    data {
      id
      parentId
      label
      key
      value
      deptName
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
  },
  dictUserSex: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_user_sex"}){
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

export const updateInitQuery =`query updateInit($request:QueryRequest){
  user: userPages(page:$request){
    data {
      userId
      deptId
      username
      nickName
      deptName
      description
      email
      mobile
      sex
      avatar
      status
      createTime
      modifyTime
      lastLoginTime
      postIds
      roleIds
    }
  }
  deptTree: deptPageQuery(page:{pageNum:1,pageSize:1000}){
    data {
      deptId
      parentId
      deptName
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
  posts: postPage(page: {pageNum:1,pageSize:1000}){
    data {
      postId
      postCode
      postName
      postSort
      status
      createBy
      createTime
      updateBy
      updateTime
    }
    total
  }
  roles : rolePage(page:{pageNum:1,pageSize:1000}){
    data {
      roleId
      roleName
      remark
      createTime
      modifyTime
      menuIds
    }
  }
}`

export const addInitQuery = `query addInit($request:QueryRequest){
  deptTree: deptPageQuery(page: $request){
    data {
      deptId
      parentId
      deptName
      orderNum
      createTime
      modifyTime
      id
      pId
      label
      key
      value
    }
    total
  }
  posts: postPage(page: $request){
    data {
      postId
      postCode
      postName
      postSort
      status
      createBy
      createTime
      updateBy
      updateTime
    }
    total
  }
  roles : rolePage(page:$request){
    data {
      roleId
      roleName
      remark
      createTime
      modifyTime
      menuIds
    }
  }
}`
