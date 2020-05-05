import { objToRsql, requestParam, requestParamOpt } from '../utils'
import graphqlRequest from '../utils/graphqlRequest'

export function listQuery(query,graphqlQuery,dateField) {
  const req = Object.create(requestParam)
  req.pageSize = query.pageSize
  req.pageNum = query.pageNum
  req.filter = objToRsql(query,dateField)

  return graphqlRequest.graphql(graphqlQuery,{request:req})

}

// 查询字典类型详细
export function getOne(idName,idValue,graphqlQuery) {
  const req = Object.create(requestParam)
  req.filter = `${idName}==${idValue}`
  return graphqlRequest.graphql(graphqlQuery,{request:req})

}

// 新增字典类型
export function addOpt(data,graphqlQuery) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.insert
  Array.isArray(data)?req.datas = data:req.datas = [data]
  return graphqlRequest.graphql(graphqlQuery,{request:req})
}

// 修改字典类型
export function updateOpt(data,graphqlQuery) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.update
  Array.isArray(data)?req.datas = data:req.datas = [data]
  return graphqlRequest.graphql(graphqlQuery,{request:req})

}

// 删除字典类型
export function delOpt(id,graphqlQuery) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.delete
  Array.isArray(id)?req.ids=id:req.ids=[id]
  return graphqlRequest.graphql(graphqlQuery,{request:req})

}

// 导出字典类型
export function  exportExcel(queryParam,graphqlQuery,filename) {
  const req = Object.create(requestParam)
  req.opt = requestParamOpt.export
  req.filter = objToRsql(queryParam)

  graphqlRequest.graphqlDownload(graphqlQuery,{request:req},`${filename}_${new Date().getTime()}.xlsx`)

}


