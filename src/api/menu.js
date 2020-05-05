import graphqlRequest from '@/utils/graphqlRequest'
import * as userQuery from '../operation/userQuery'

// 获取路由
export const getRouters = () => {
  return  graphqlRequest.graphql(userQuery.userRouterQuery, {
    'username': ''
  })
}
