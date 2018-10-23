export default {
  user: state => state.user,
  menu: state => state.menu,
  admin: state => state.user.role === "1",
  themeColor: state => state.themeColor
};
