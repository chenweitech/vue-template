import Vue from "vue";
import App from "./App";

import router from "./controller";
import { Spinner } from "kit-ui";

Vue.use(Spinner);

if (process.env.NODE_ENV !== "production" && process.env.MOCK) {
    // eslint-disable-next-line no-unused-vars
    const Mock = require("./mock");
}

new Vue({
    router,
    components: {
        App
    },
    template: "<App/>"
}).$mount("#app");
