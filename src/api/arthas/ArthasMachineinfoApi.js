import { addOpt, delOpt, getOne, listQuery, updateOpt } from '../commonApi'
import {  machineinfoPageQuery, machineinfoBaseMutation } from '../../operation/ArthasMachineinfoQuery'

// 查询公告列表
export function listArthasMachineinfo(query) {
  return listQuery(query,machineinfoPageQuery)
}

// 查询公告详细
export function getArthasMachineinfo(id) {
  return getOne(id,machineinfoPageQuery)
}

// 新增公告
export function addArthasMachineinfo(data) {
  return addOpt(data,machineinfoBaseMutation)
}

// 修改公告
export function updateArthasMachineinfo(data) {
  return updateOpt(data,machineinfoBaseMutation)
}

// 删除公告
export function delArthasMachineinfo(id) {
  return delOpt(id,machineinfoBaseMutation)
}

// 导出登录日志
export function exportArthasMachineinfo(query) {
  return exportExcel(query,machineinfoBaseMutation,'ArthasMachineinfo')
}