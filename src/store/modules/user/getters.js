export default {
  user: state => state.user,
  menu: state => state.menu,
  token: state => state.token,
  admin: state => state.user.role === "admin"
};
