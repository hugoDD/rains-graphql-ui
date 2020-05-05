export const initPostQuery = `query postPageQuery($request:QueryRequest){
  pages:postPage(page: $request){
    data {
      postId
      postCode
      postName
      postSort
      status
      remark
      createBy
      createTime
      updateBy
      updateTime
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

export const postQuery = `query postPageQuery($request:QueryRequest){
  pages:postPage(page: $request){
    data {
      postId
      postCode
      postName
      postSort
      status
      remark
      createBy
      createTime
      updateBy
      updateTime
    }
    total
  }
}`

export const postBaseMutation = `mutation postBaseMutation($request:QueryRequest){
  postBaseMutation(request:$request)
}`
