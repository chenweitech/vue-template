import Vue from 'vue';
import App from './App';

if(process.env.NODE_ENV!=='production'&&process.env.MOCK) {
    // eslint-disable-next-line no-unused-vars
    const Mock = require('./mock');
}

new Vue({
    components: {
        App
    },
    template: '<App/>'
}).$mount('#app');