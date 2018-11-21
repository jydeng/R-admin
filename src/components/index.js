import Rbreadcrumb from "./Rbreadcrumb";
import Rtable from "./Rtable";
import Rtheme from "./Rtheme";

const components = [Rbreadcrumb, Rtable, Rtheme];

export default {
  install: Vue => {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
