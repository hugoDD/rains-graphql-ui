import request from '@/utils/request'
import { objToRsql, requestParam, requestParamOpt } from '../../utils'
import graphqlRequest from '../../utils/graphqlRequest'
import { menuBaseMutation, menuPages, menuTree } from '../../operation/menuQuery'

// 查询菜单列表
export function listMenu(query) {
  const reqParam = Object.create(requestParam);
  reqParam.pageSize = 1500;
  reqParam.sortField = 'orderNum'
  reqParam.filter = objToRsql(query);
  return graphqlRequest.graphql(menuPages,{request:reqParam})
  // return request({
  //   url: '/system/menu/list',
  //   method: 'get',
  //   params: query
  // })
}

// 查询菜单详细
export function getMenu(menuId) {
  const reqParam = Object.create(requestParam);
  reqParam.filter = `menuId==${menuId}`;
  return graphqlRequest.graphql(menuPages,{request:reqParam})
  // return request({
  //   url: '/system/menu/' + menuId,
  //   method: 'get'
  // })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  const req = Object.create(requestParam)

  return graphqlRequest.graphql(menuTree,{request : req})

  // return request({
  //   url: '/system/menu/roleMenuTreeselect/' + roleId,
  //   method: 'get'
  // })
}

// 新增菜单
export function addMenu(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.insert
  req.datas = [data]

  return graphqlRequest.graphql(menuBaseMutation,{request:req})

  // return request({
  //   url: '/system/menu',
  //   method: 'post',
  //   data: data
  // })
}

// 修改菜单
export function updateMenu(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]

  return graphqlRequest.graphql(menuBaseMutation,{request:req})

  // return request({
  //   url: '/system/menu',
  //   method: 'put',
  //   data: data
  // })
}

// 删除菜单
export function delMenu(menuId) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  req.ids = [menuId]

  return graphqlRequest.graphql(menuBaseMutation,{request:req})
  // return request({
  //   url: '/system/menu/' + menuId,
  //   method: 'delete'
  // })
}
