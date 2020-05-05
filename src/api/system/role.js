import request from '@/utils/request'
import { objToRsql, requestParam, requestParamOpt } from '../../utils'
import graphqlRequest from '../../utils/graphqlRequest'
import { initUpdateRoleQuery, roleBaseMutation } from '../../operation/roleQuery'

// 查询角色详细
export function getRole(roleId) {
  const req = Object.create(requestParam)
  req.filter = `roleId==${roleId}`
  return graphqlRequest.graphql(initUpdateRoleQuery,{request : req})

}

// 新增角色
export function addRole(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.insert
  req.datas = [data]

  const roleMenuParam = {svc:'roleMenuService',datas:[],opt:'insert'}
  data.menuIds.forEach(menuId=>{
    roleMenuParam.datas.push({roleId:data.roleId,menuId:menuId})
  })
  req.child.push(roleMenuParam)
  return graphqlRequest.graphql(roleBaseMutation,{request:req})
}

// 修改角色
export function updateRole(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]

  const  delRoleMenuParam = {runOrder:-1,svc:'roleMenuService',filter:'roleId=='+data.roleId,opt:'delete'}
  const roleMenuParam = {svc:'roleMenuService',datas:[],opt:'insert'}
  data.menuIds.forEach(menuId=>{
    roleMenuParam.datas.push({roleId:data.roleId,menuId:menuId})
  })

  req.child = [delRoleMenuParam,roleMenuParam]

  return graphqlRequest.graphql(roleBaseMutation,{request:req});
}

// 角色数据权限
export function dataScope(data) {
  const req = Object.create(requestParam)
  req.opt = "dataScope"
  req.datas=[data]


  return graphqlRequest.graphql(roleBaseMutation,{request:req})
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [{roleId:roleId,status:status}]
  return graphqlRequest.graphql(roleBaseMutation,{request:req});

}

// 删除角色
export function delRole(roleId) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  req.ids=[roleId]
  return  graphqlRequest.graphql(roleBaseMutation,{request:req})
}

// 导出角色
export function exportRole(query) {
  const reqParam = Object.create(requestParam);
  reqParam.opt = requestParamOpt.export
  reqParam.pageNum = query.pageNum;
  reqParam.pageSize = query.pageSize;

  reqParam.filter = objToRsql(query);

  graphqlRequest.graphqlDownload(roleBaseMutation,{request: reqParam},`role_${new Date().getTime()}.xlsx`)

}
