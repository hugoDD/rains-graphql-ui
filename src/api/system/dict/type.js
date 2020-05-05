import request from '@/utils/request'
import { objToRsql, requestParam, requestParamOpt } from '../../../utils'
import graphqlRequest from '../../../utils/graphqlRequest'
import { dictTypeBaseMutation, dictTypeQuery, dictTypeSelect } from '../../../operation/dictTypeQuery'

// 查询字典类型列表
export function listType(query) {
  const req = Object.create(requestParam)
  req.pageSize = query.pageSize
  req.pageNum = query.pageNum
  req.filter = objToRsql(query)

  return graphqlRequest.graphql(dictTypeQuery,{request:req})
  // return request({
  //   url: '/system/dict/type/list',
  //   method: 'get',
  //   params: query
  // })
}

// 查询字典类型详细
export function getType(dictId) {
  const req = Object.create(requestParam)
  req.filter = `dictId==${dictId}`
  return graphqlRequest.graphql(dictTypeQuery,{request:req})
  // return request({
  //   url: '/system/dict/type/' + dictId,
  //   method: 'get'
  // })
}

// 新增字典类型
export function addType(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.insert
  req.datas = [data]
  return graphqlRequest.graphql(dictTypeBaseMutation,{request:req})
  // return request({
  //   url: '/system/dict/type',
  //   method: 'post',
  //   data: data
  // })
}

// 修改字典类型
export function updateType(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]
  return graphqlRequest.graphql(dictTypeBaseMutation,{request:req})
  // return request({
  //   url: '/system/dict/type',
  //   method: 'put',
  //   data: data
  // })
}

// 删除字典类型
export function delType(dictId) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  Array.isArray(dictId)?req.ids=dictId:req.ids=[dictId]
  return graphqlRequest.graphql(dictTypeBaseMutation,{request:req})
  // return request({
  //   url: '/system/dict/type/' + dictId,
  //   method: 'delete'
  // })
}

// 导出字典类型
export function exportType(query) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.export
  req.filter = objToRsql(query)

  graphqlRequest.graphqlDownload(dictTypeBaseMutation,{request:req},`dictType_${new Date().getTime()}.xlsx`)
  // return request({
  //   url: '/system/dict/type/export',
  //   method: 'get',
  //   params: query
  // })
}

// 获取字典选择框列表
export function optionselect() {
  const req = Object.create(requestParam)
  req.pageNum = 1200

  return graphqlRequest.graphql(dictTypeSelect,{request:req})

  // return request({
  //   url: '/system/dict/type/optionselect',
  //   method: 'get'
  // })
}
