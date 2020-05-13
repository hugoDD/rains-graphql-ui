export const cmdloginitQuery = `query cmdlogQuery($request: QueryRequest) {
  pages: arthasCmdlogPage(request:$request){
    data{
    //$column.comment
    id
    //服务器地址
    hostname
    //应用名称
    appname
    //命令
    cmd
    //操作人员ID
    createPersonId
    //操作人员名称
    createPersonName
    //创建时间
    createTime
    }
    total
  }
                            }`

export const cmdlogPageQuery = `query pageQuery($request: QueryRequest) {
  pages: arthasCmdlogPage(request:$request){
    data{
    //$column.comment
    id
    //服务器地址
    hostname
    //应用名称
    appname
    //命令
    cmd
    //操作人员ID
    createPersonId
    //操作人员名称
    createPersonName
    //创建时间
    createTime
    }
    total
  }
}`

export const cmdlogBaseMutation = `mutation baseMutation($request:QueryRequest){
  arthasCmdlogBaseMutation(request:$request)
}`