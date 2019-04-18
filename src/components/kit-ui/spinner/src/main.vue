<template>
    <div class="kit-spinner">
        <div @click="expandList" class="kit-spinner-content">
            <slot></slot>
        </div>
        <transition name="fade">
            <div v-show="showSpinner" class="kit-spinner-list">
                <div v-for="(item, index) in list" :key="index" @click="item.option">{{item.name}}</div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "KitSpinner",
    props: {
        list: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            showSpinner: false
        };
    },
    methods: {
        expandList() {
            this.showSpinner = !this.showSpinner;
        }
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.kit-spinner {
    position: relative;
    .kit-spinner-content {
        display: inline-block;
    }
    .kit-spinner-list {
        position: absolute;
    }
}
</style>