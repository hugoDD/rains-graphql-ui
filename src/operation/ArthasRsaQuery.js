export const rsainitQuery = `query rsaQuery($request: QueryRequest) {
  pages: arthasRsaPage(request:$request){
    data{
    //主键ID
    id
    //私钥名称
    rsaName
    //私钥内容
    rsaValue
    //私钥用户
    rsaUsername
    //私钥密码
    rsaPassword
    //状态
    status
    //创建时间
    createTime
    //创建人员ID
    createPersonId
    //创建人员姓名
    createPersonName
    }
    total
  }
                        sysNormalDisable: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_normal_disable"){
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

export const rsaPageQuery = `query pageQuery($request: QueryRequest) {
  pages: arthasRsaPage(request:$request){
    data{
    //主键ID
    id
    //私钥名称
    rsaName
    //私钥内容
    rsaValue
    //私钥用户
    rsaUsername
    //私钥密码
    rsaPassword
    //状态
    status
    //创建时间
    createTime
    //创建人员ID
    createPersonId
    //创建人员姓名
    createPersonName
    }
    total
  }
}`

export const rsaBaseMutation = `mutation baseMutation($request:QueryRequest){
  arthasRsaBaseMutation(request:$request)
}`