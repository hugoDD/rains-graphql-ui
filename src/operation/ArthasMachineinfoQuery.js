export const machineinfoinitQuery = `query machineinfoQuery($request: QueryRequest) {
  pages: arthasMachineinfoPage(request:$request){
    data{
    //id
    id
    //机器名称
    hostname
    //登录类型
    loginType
    //RSA
    rsaId
    //登陆账号
    username
    //密码
    password
    //SSH端口号
    port
    //agentIP
    arthasIp
    //agent端口
    arthasPort
    //agentId
    arthasAgentId
    //服务器连接状态
    serverStatus
    //模块名称
    moduleName
    //状态
    status
    //创建时间
    createTime
    //创建人员ID
    createPersonId
    //操作人员名称
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

export const machineinfoPageQuery = `query pageQuery($request: QueryRequest) {
  pages: arthasMachineinfoPage(request:$request){
    data{
    //id
    id
    //机器名称
    hostname
    //登录类型
    loginType
    //RSA
    rsaId
    //登陆账号
    username
    //密码
    password
    //SSH端口号
    port
    //agentIP
    arthasIp
    //agent端口
    arthasPort
    //agentId
    arthasAgentId
    //服务器连接状态
    serverStatus
    //模块名称
    moduleName
    //状态
    status
    //创建时间
    createTime
    //创建人员ID
    createPersonId
    //操作人员名称
    createPersonName
    }
    total
  }
}`

export const machineinfoBaseMutation = `mutation baseMutation($request:QueryRequest){
  arthasMachineinfoBaseMutation(request:$request)
}`