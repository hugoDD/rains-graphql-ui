export const initDictDataQuery = `query dictPageQuery($request:QueryRequest){
  dictTypes:dictTypePage(page: {filter:"status==1"}){
    data {
      dictId
      dictName
      dictType
    }
    total
  }
  dictDatas: dictDataPage(page: $request){
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
    total
  }
}`

export const dictDataPageQuery = `query dictDataPageQuery($request:QueryRequest){
  pages: dictDataPage(page: $request){
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
    total
  }
}`
export const dictDataBaseMutation = `mutation dictDataBaseMutation($request:QueryRequest){
  dictDataBaseMutation(request:$request)
}`
