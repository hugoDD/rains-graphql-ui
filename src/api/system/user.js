import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi"
import graphqlRequest from '../../utils/graphqlRequest'
import { userBaseMutation } from '../../operation/userMutation'
import { requestParam, requestParamOpt } from '../../utils'
import { updatePwd, userDetailQuery } from '../../operation/userQuery'

// 查询用户列表
export function listUser(query) {

  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/system/user/' + praseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const reqParam = Object.create(requestParam)
  reqParam.opt = requestParamOpt.update
  reqParam.datas = []
  reqParam.datas.push({userId:userId,password:password})
  return  graphqlRequest.graphql(userBaseMutation,{request:reqParam})

}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const reqParam = Object.create(requestParam)
  reqParam.opt = requestParamOpt.update
  reqParam.filter = 'userId=='+userId
  reqParam.datas = [{userId:userId,status:status}]
  return  graphqlRequest.graphql(userBaseMutation,{request:reqParam})

}

// 查询用户个人信息
export function getUserProfile() {
  return graphqlRequest.graphql(userDetailQuery,{username:''})

}

// 修改用户个人信息
export function updateUserProfile(data) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [data]

  return graphqlRequest.graphql(userBaseMutation,{request:req})

}

// 用户密码重置
export function updateUserPwd(username, newPassword) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  req.datas = [{username:username,password:newPassword}]

  return graphqlRequest.graphql(updatePwd,{request:req})
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}
