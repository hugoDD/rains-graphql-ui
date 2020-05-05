import request from '@/utils/request'
import { listQuery } from '../commonApi'
import { genBaseMutation, genInfo, genPageQuery, previewCodeQuery } from '../../operation/genCode'
import { objToRsql, requestParam, requestParamOpt } from '../../utils'
import graphqlRequest from '../../utils/graphqlRequest'

// 查询生成表数据
export function listTable(query) {
  return listQuery(query,genPageQuery)
  // return request({
  //   url: '/tool/gen/list',
  //   method: 'get',
  //   params: query
  // })
}
// 查询db数据库列表
export function listDbTable(query) {
  const req = Object.create(requestParam)
  req.opt = 'dbTable'
  req.pageSize = query.pageSize
  req.pageNum = query.pageNum
  req.filter = objToRsql(query)

  return graphqlRequest.graphql(genPageQuery,{request:req})
}

// 查询表详细信息
export function getGenTable(tableId) {
// 获取表详细信息
  const  req = Object.create(requestParam)
  req.filter = "tableId=="+tableId

  return graphqlRequest.graphql(genInfo,{request:req})

  // return request({
  //   url: '/tool/gen/' + tableId,
  //   method: 'get'
  // })
}

// 修改代码生成信息
export function updateGenTable(data,cloumns) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]

  const  genTableColumnReq = {svc:'genTableColumn',datas:cloumns,opt:'update'}
  req.child = [genTableColumnReq]
  return graphqlRequest.graphql(genBaseMutation,{request:req})

}

// 导入表
export function importTable(data) {
  const req = Object.create(requestParam)
  req.opt = 'importTable'
  req.datas = data
  return graphqlRequest.graphql(genBaseMutation, {request:req})

}
// 预览生成代码
export function previewTable(tableId) {
  const req = Object.create(requestParam)
  req.filter = `tableId==${tableId}`
  return  graphqlRequest.graphql(previewCodeQuery,{request:req})
}
// 删除表数据
export function delTable(tableId) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  req.filter = `tableId==${tableId}`
  Array.isArray(tableId)?req.ids = tableId : req.ids=[tableId]

  const genTableColumnReq = {svc:'genTableColumn',filter:`tableId==${tableId}`,opt:requestParamOpt.delete}

  req.child = [genTableColumnReq]

  return graphqlRequest.graphql(genBaseMutation,{request:req})

}

