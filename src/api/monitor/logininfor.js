import request from '@/utils/request'
import { delOpt, exportExcel, listQuery } from '../commonApi'
import { loginLogBaseMutation, loginLogPageQuery } from '../../operation/loginLog'
import { requestParam, requestParamOpt } from '../../utils'

// 查询登录日志列表
export function list(query) {
  return listQuery(query,loginLogPageQuery,'loginTime')
}

// 删除登录日志
export function delLogininfor(infoId) {
  return delOpt(infoId,loginLogBaseMutation)
}



// 导出登录日志
export function exportLogininfor(query) {
  return exportExcel(query,loginLogBaseMutation,'loginLog')
}
