export const addUser = `mutation addUser($userInfo: UserCondition) {
  addUser(user: $userInfo) {
    userId
    username
  }
}`

export const updateUser = `mutation updateUser($user: UserCondition) {
  updateUser(user: $user) {
    userId
    username
  }
}`

export const delUsers = `mutation delUsers($userIds: [String!]!){
  deleteUsers(userIds: $userIds)
}`

export const resetPwd = `mutation resetPwd($usernames: [String!]!) {
  resetPassword(usernames: $usernames)
}`

export const excelExport = `mutation userExport($page:QueryRequest,$entity:UserCondition){
  userExport(page:$page,user:$entity)
}`


export const userBaseMutation = `mutation userBaseMutation($request:QueryRequest){
  userBaseMutation(request:$request)
}`
