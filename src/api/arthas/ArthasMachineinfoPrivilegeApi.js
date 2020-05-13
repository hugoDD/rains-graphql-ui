import { addOpt, delOpt, getOne, listQuery, updateOpt } from '../commonApi'
import {  machineinfoPrivilegePageQuery, machineinfoPrivilegeBaseMutation } from '../../operation/ArthasMachineinfoPrivilegeQuery'

// 查询公告列表
export function listArthasMachineinfoPrivilege(query) {
  return listQuery(query,machineinfoPrivilegePageQuery)
}

// 查询公告详细
export function getArthasMachineinfoPrivilege(id) {
  return getOne(id,machineinfoPrivilegePageQuery)
}

// 新增公告
export function addArthasMachineinfoPrivilege(data) {
  return addOpt(data,machineinfoPrivilegeBaseMutation)
}

// 修改公告
export function updateArthasMachineinfoPrivilege(data) {
  return updateOpt(data,machineinfoPrivilegeBaseMutation)
}

// 删除公告
export function delArthasMachineinfoPrivilege(id) {
  return delOpt(id,machineinfoPrivilegeBaseMutation)
}

// 导出登录日志
export function exportArthasMachineinfoPrivilege(query) {
  return exportExcel(query,machineinfoPrivilegeBaseMutation,'ArthasMachineinfoPrivilege')
}
