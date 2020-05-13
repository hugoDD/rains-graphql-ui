import { addOpt, delOpt, getOne, listQuery, updateOpt } from '../commonApi'
import {  rsaPageQuery, rsaBaseMutation } from '../../operation/ArthasRsaQuery'

// 查询公告列表
export function listArthasRsa(query) {
  return listQuery(query,rsaPageQuery)
}

// 查询公告详细
export function getArthasRsa(id) {
  return getOne(id,rsaPageQuery)
}

// 新增公告
export function addArthasRsa(data) {
  return addOpt(data,rsaBaseMutation)
}

// 修改公告
export function updateArthasRsa(data) {
  return updateOpt(data,rsaBaseMutation)
}

// 删除公告
export function delArthasRsa(id) {
  return delOpt(id,rsaBaseMutation)
}

// 导出登录日志
export function exportArthasRsa(query) {
  return exportExcel(query,rsaBaseMutation,'ArthasRsa')
}