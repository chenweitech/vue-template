import Vue from "vue";
import Route from "vue-router";

Vue.use(Route);

export default new Route({
    routes: [
        {
            path: "/",
            redirect: "/page1"
        },
        {
            path: "/page1",
            name: "page1",
            component: resolve => require(["@pages/page1.vue"], resolve)
        }
    ]
});
