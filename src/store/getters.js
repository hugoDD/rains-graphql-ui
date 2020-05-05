const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.permission.avatar,
  name: state => state.permission.name,
  // introduction: state => state.user.introduction,
  roles: state => state.permission.roles,
  permissions: state => state.permission.permissions,
  permission_routes: state => state.permission.routes
}
export default getters
