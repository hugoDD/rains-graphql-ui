import request from '@/utils/request'
import { delOpt, exportExcel, listQuery } from '../commonApi'
import { logsPageQuery, optLogBaseMutation } from '../../operation/log'

// 查询操作日志列表
export function list(query) {
  return listQuery(query,logsPageQuery)
}

// 删除操作日志
export function delOperlog(operId) {
  return delOpt(operId,optLogBaseMutation)
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  })
}

// 导出操作日志
export function exportOperlog(query) {
  return exportExcel(query,optLogBaseMutation,'optLog')
}
