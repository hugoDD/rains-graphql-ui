export const genPageQuery = `query pageQuery($request: QueryRequest) {
  pages:genTablePage(page:$request){
    data{
    tableId
    tableName
    tableComment
    className
    tplCategory
    packageName
    moduleName
    businessName
    functionName
    functionAuthor
    options
    createBy
    createTime
    updateBy
    updateTime
    remark
  }
  total
  }
}`

export const previewCodeQuery = `query previewQuery($request: QueryRequest) {
  genTablePage(page:$request){
    data{
    tableId
    tableName
    preview
    }
  }
}`

export const previewUiQuery = `query previewQuery($request: QueryRequest) {
  genTablePage(page:$request){
    data{
    tableId
    tableName
    preGenViewUI
    formConf
    }
  }
}`

export const genInfo = `query pageQuery($request: QueryRequest) {
  info: genTablePage(page: $request) {
    data {
      tableId
      tableName
      tableComment
      className
      tplCategory
      packageName
      moduleName
      businessName
      functionName
      functionAuthor
      options
      createBy
      createTime
      updateBy
      updateTime
      remark
    }
  }
  rows: genTableColumnPage(page: $request) {
    data {
      columnId
      tableId
      columnName
      columnComment
      columnType
      javaType
      graphqlType
      javaField
      isPk
      isIncrement
      isRequired
      isInsert
      isEdit
      isList
      isQuery
      queryType
      htmlType
      dictType
      sort
      createBy
      createTime
      updateBy
      updateTime
    }
  }
  dictTypes: dictTypePage(page: { pageNum: 1, pageSize: 200 }) {
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
  }
}`

export const genBaseMutation = `mutation genBaseMutation($request:QueryRequest){
  genTableBaseMutation(request:$request)
}`
