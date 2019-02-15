import Rbreadcrumb from "./Rbreadcrumb";
import Rtable from "./Rtable";
import Rtheme from "./Rtheme";
import RuploadImg from "./RuploadImg";
import RurlInput from "./RurlInput";

const components = [Rbreadcrumb, Rtable, Rtheme, RuploadImg, RurlInput];

export default {
  install: Vue => {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
