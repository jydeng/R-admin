import Rbreadcrumb from "./Rbreadcrumb";
import Rtable from "./Rtable";
import Rtheme from "./Rtheme";
import RuploadImg from "./RuploadImg";

const components = [Rbreadcrumb, Rtable, Rtheme, RuploadImg];

export default {
  install: Vue => {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
