import request from '@/utils/request'
import { objToRsql, requestParam, requestParamOpt } from '../../../utils'
import graphqlRequest from '../../../utils/graphqlRequest'
import { dictDataBaseMutation, dictDataPageQuery } from '../../../operation/dictDataQuery'
import { dictTypeBaseMutation } from '../../../operation/dictTypeQuery'

// 查询字典数据列表
export function listData(query) {
  const req = Object.create(requestParam)
  req.pageSize = query.pageSize
  req.pageNum = query.pageNum
  req.filter = objToRsql(query)

  return graphqlRequest.graphql(dictDataPageQuery,{request:req})
  // return request({
  //   url: '/system/dict/data/list',
  //   method: 'get',
  //   params: query
  // })
}

// 查询字典数据详细
export function getData(dictCode) {
  const req = Object.create(requestParam)
  req.filter = `dictCode==${dictCode}`

  return graphqlRequest.graphql(dictDataPageQuery,{request:req})
  // return request({
  //   url: '/system/dict/data/' + dictCode,
  //   method: 'get'
  // })
}

// 根据字典类型查询字典数据信息
// export function getDicts(dictType) {
//   return request({
//     url: '/system/dict/data/dictType/' + dictType,
//     method: 'get'
//   })
// }

// 新增字典数据
export function addData(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.insert
  req.datas = [data]
  return graphqlRequest.graphql(dictDataBaseMutation,{request:req})
}

// 修改字典数据
export function updateData(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]
  return graphqlRequest.graphql(dictDataBaseMutation,{request:req})
  // return request({
  //   url: '/system/dict/data',
  //   method: 'put',
  //   data: data
  // })
}

// 删除字典数据
export function delData(dictCode) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  Array.isArray(dictCode)?req.ids=dictCode:req.ids=[dictCode]
  return graphqlRequest.graphql(dictDataBaseMutation,{request:req})
  // return request({
  //   url: '/system/dict/data/' + dictCode,
  //   method: 'delete'
  // })
}

// 导出字典数据
export function exportData(query) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.export
  //req.filter = objToRsql(query)

  graphqlRequest.graphqlDownload(dictDataBaseMutation,{request:req},`dictData_${new Date().getTime()}.xlsx`)
  // return request({
  //   url: '/system/dict/data/export',
  //   method: 'get',
  //   params: query
  // })
}
