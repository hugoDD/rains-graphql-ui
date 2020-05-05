import request from '@/utils/request'
import { objToRsql, requestParam, requestParamOpt } from '../../utils'
import graphqlRequest from '../../utils/graphqlRequest'
import { deptBaseMutation, deptsQuery, roleDeptTree } from '../../operation/deptQuery'

// 查询部门列表
export function listDept(query) {
  const reqParam = Object.create(requestParam);
  reqParam.pageSize = 1500
  reqParam.filter = objToRsql(query);

  return graphqlRequest.graphql(deptsQuery,{request:reqParam})
  // return request({
  //   url: '/system/dept/list',
  //   method: 'get',
  //   params: query
  // })
}

// 查询部门详细
export function getDept(deptId) {
  const reqParam = Object.create(requestParam);
  reqParam.filter = `deptId==${deptId}`
  return graphqlRequest.graphql(deptsQuery,{request:reqParam})

  // return request({
  //   url: '/system/dept/' + deptId,
  //   method: 'get'
  // })
}

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  const reqParam = Object.create(requestParam);
  reqParam.filter = `roleId==${roleId}`
  return graphqlRequest.graphql(roleDeptTree,{request:reqParam})

  // return request({
  //   url: '/system/dept/roleDeptTreeselect/' + roleId,
  //   method: 'get'
  // })
}

// 新增部门
export function addDept(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.insert
  req.datas = [data]

  return graphqlRequest.graphql(deptBaseMutation,{request:req})

  // return request({
  //   url: '/system/dept',
  //   method: 'post',
  //   data: data
  // })
}

// 修改部门
export function updateDept(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]

  return graphqlRequest.graphql(deptBaseMutation,{request:req})
  // return request({
  //   url: '/system/dept',
  //   method: 'put',
  //   data: data
  // })
}

// 删除部门
export function delDept(deptId) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  req.ids = [deptId]

  return graphqlRequest.graphql(deptBaseMutation,{request:req})
  // return request({
  //   url: '/system/dept/' + deptId,
  //   method: 'delete'
  // })
}
