export const initLoginLogQuery = `query initLoginLogQuery($request:QueryRequest){
  pages:loginLogPage(page: $request){
    data {
      id
      username
      loginTime
      location
      ip
      system
      browser
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

export const loginLogPageQuery = `query initLoginLogQuery($request:QueryRequest){
  pages:loginLogPage(page: $request){
    data {
      id
      username
      loginTime
      location
      ip
      system
      browser
    }
    total
  }
}`

export const loginLogBaseMutation = `mutation loginLogBaseMutation($request:QueryRequest){
  loginLogBaseMutation(request:$request)
}`
