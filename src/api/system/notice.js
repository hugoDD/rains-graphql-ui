import { addOpt, delOpt, getOne, listQuery, updateOpt } from '../commonApi'
import { initNoteQuery, notePageQuery, noticeBaseMutation } from '../../operation/noticeQuery'

// 查询公告列表
export function listNotice(query) {
  return listQuery(query,notePageQuery)
}

// 查询公告详细
export function getNotice(noticeId) {
  return getOne('noticeId',noticeId,notePageQuery)
}

// 新增公告
export function addNotice(data) {
  return addOpt(data,noticeBaseMutation)
}

// 修改公告
export function updateNotice(data) {
  return updateOpt(data,noticeBaseMutation)
}

// 删除公告
export function delNotice(noticeId) {
  return delOpt(noticeId,noticeBaseMutation)
}
