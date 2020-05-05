import request from '@/utils/request'
import { objToRsql, requestParam, requestParamOpt } from '../../utils'
import graphqlRequest from '../../utils/graphqlRequest'
import { postBaseMutation, postQuery } from '../../operation/postQuery'
import { roleBaseMutation } from '../../operation/roleQuery'

// 查询岗位列表
export function listPost(query) {
  const req = Object.create(requestParam)
  req.pageNum = query.pageNum
  req.pageSize = query.pageSize
  req.sortField = 'postSort'
  req.filter = objToRsql(query)

  return graphqlRequest.graphql(postQuery,{request:req})

  // return request({
  //   url: '/system/post/list',
  //   method: 'get',
  //   params: query
  // })
}

// 查询岗位详细
export function getPost(postId) {
  const req = Object.create(requestParam)
  req.filter = `postId==${postId}`
  return graphqlRequest.graphql(postQuery,{request:req})
  // return request({
  //   url: '/system/post/' + postId,
  //   method: 'get'
  // })
}

// 新增岗位
export function addPost(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.insert
  req.datas = [data]
  return graphqlRequest.graphql(postBaseMutation,{request:req})
  // return request({
  //   url: '/system/post',
  //   method: 'post',
  //   data: data
  // })
}

// 修改岗位
export function updatePost(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]
  return graphqlRequest.graphql(postBaseMutation,{request:req})
  // return request({
  //   url: '/system/post',
  //   method: 'put',
  //   data: data
  // })
}

// 删除岗位
export function delPost(postId) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  Array.isArray(postId)?req.ids = postId : req.ids = [postId]
  return graphqlRequest.graphql(postBaseMutation,{request:req})
  // return request({
  //   url: '/system/post/' + postId,
  //   method: 'delete'
  // })
}

// 导出岗位
export function exportPost(query) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.export
  req.pageNum = query.pageNum;
  req.pageSize = query.pageSize;
  req.filter = objToRsql(query);
  //reqParam.filter = addRsqlDateRange(reqParam.filter,'createTime',this.dateRange)
  graphqlRequest.graphqlDownload(postBaseMutation,{request: req},`post_${new Date().getTime()}.xlsx`)
  // return request({
  //   url: '/system/post/export',
  //   method: 'get',
  //   params: query
  // })
}
