export const machineinfoPrivilegeinitQuery = `query machineinfoPrivilegeQuery($request: QueryRequest) {
  pages: arthasMachineinfoPrivilegePage(request:$request){
    data{
    //$column.comment
    id
    //服务器ID
    machineId
    //用户ID
    userId
    //创建时间
    createTime
    }
    total
  }
                }`

export const machineinfoPrivilegePageQuery = `query pageQuery($request: QueryRequest) {
  pages: arthasMachineinfoPrivilegePage(request:$request){
    data{
    //$column.comment
    id
    //服务器ID
    machineId
    //用户ID
    userId
    //创建时间
    createTime
    }
    total
  }
}`

export const machineinfoPrivilegeBaseMutation = `mutation baseMutation($request:QueryRequest){
  arthasMachineinfoPrivilegeBaseMutation(request:$request)
}`