export const initNoteQuery = `query initNoticeQuerry($request:QueryRequest){
  pages:noticePage(page: $request){
    data {
      noticeId
      noticeTitle
      noticeType
      noticeContent
      status
      createBy
      createTime
      updateBy
      updateTime
    }
    total
  }
  sysNoticeStatus: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_notice_status"}){
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
  sysNoticeType: dictDataPage(page: { pageNum: 1, pageSize: 200 ,filter:"dictType==sys_notice_type"}){
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

export const notePageQuery = `query noticeQuerry($request:QueryRequest){
  pages:noticePage(page: $request){
    data {
      noticeId
      noticeTitle
      noticeType
      noticeContent
      status
      createBy
      createTime
      updateBy
      updateTime
    }
    total
  }
}`
export const noticeBaseMutation = `mutation noticeBaseMutation($request:QueryRequest){
  noticeBaseMutation(request:$request)
}`
