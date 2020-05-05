export const initDictTypeQuery = `query dictTypePageQuery($request:QueryRequest){
  pages:dictTypePage(page: $request){
    data {
      createBy
      createTime
      dictId
      dictName
      dictType
      remark
      status
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

export const dictTypeQuery = `query dictTypePageQuery($request:QueryRequest){
  pages:dictTypePage(page: $request){
    data {
      createBy
      createTime
      dictId
      dictName
      dictType
      remark
      status
      updateBy
      updateTime
    }
    total
  }
}`

export const dictTypeSelect = `query dictTypePageQuery($request:QueryRequest){
  pages:dictTypePage(page: $request){
    data {
      dictId
      dictName
      dictType
    }
  }
}`

export const dictTypeBaseMutation = `mutation dictTypeBaseMutation($request:QueryRequest){
  dictTypeBaseMutation(request:$request)
}`
