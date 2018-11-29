export default {
  user: state => state.user,
  menu: state => state.menu,
  admin: state => state.user.role === "1",
  logon: state => state.user.username !== "",
  themeColor: state => state.themeColor
};
