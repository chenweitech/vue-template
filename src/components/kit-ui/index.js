/**
 * @desc  组件的统一入口
 */
import Spinner from "./spinner/index.js";

const components = [Spinner];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== undefined && window.Vue) {
    install(window.Vue);
}
export { Spinner };
