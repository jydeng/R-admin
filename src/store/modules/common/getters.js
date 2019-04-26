export default {
  themeColor: state => state.themeColor,
  isCollapse: state => state.isCollapse,
  asideWidth: state => (state.isCollapse ? "55px" : "210px"),
  fullScreen: state => state.fullScreen
};
