import { addOpt, delOpt, getOne, listQuery, updateOpt } from '../commonApi'
import {  cmdlogPageQuery, cmdlogBaseMutation } from '../../operation/ArthasCmdlogQuery'

// 查询公告列表
export function listArthasCmdlog(query) {
  return listQuery(query,cmdlogPageQuery)
}

// 查询公告详细
export function getArthasCmdlog(id) {
  return getOne(id,cmdlogPageQuery)
}

// 新增公告
export function addArthasCmdlog(data) {
  return addOpt(data,cmdlogBaseMutation)
}

// 修改公告
export function updateArthasCmdlog(data) {
  return updateOpt(data,cmdlogBaseMutation)
}

// 删除公告
export function delArthasCmdlog(id) {
  return delOpt(id,cmdlogBaseMutation)
}

// 导出登录日志
export function exportArthasCmdlog(query) {
  return exportExcel(query,cmdlogBaseMutation,'ArthasCmdlog')
}