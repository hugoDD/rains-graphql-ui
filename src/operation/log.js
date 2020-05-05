export const initLogsQuery = `query initLogQuery($request:QueryRequest){
  pages:logPage(page: $request){
    data {
      id
      username
      operation
      time
      method
      params
      ip
      createTime
      location
      type
      status
    }
    total
  }
  sysOperType: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_oper_type"}){
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
  sysCommonStatus: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_common_status"}){
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

export const logsPageQuery = `query initLogQuery($request:QueryRequest){
  pages:logPage(page: $request){
    data {
      id
      username
      operation
      time
      method
      params
      ip
      createTime
      location
      type
      status
    }
    total
  }
}`

export const optLogBaseMutation = `mutation optLogBaseMutation($request:QueryRequest){
  optLogBaseMutation(request:$request)
}`
