import Spinner from "./src/main.vue";

Spinner.install = function(Vue) {
    Vue.component(Spinner.name, Spinner);
};

export default Spinner;
