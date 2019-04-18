<template>
    <div>
        <kit-spinner :list="list">Click</kit-spinner>
        <p>Hello Vue</p>
    </div>
</template>

<script>
export default {
    name: "demo-page1",
    data() {
        return {
            name: '123',
            list: [
                {
                    name: '1233',
                    option: ()=>{
                        console.log("1");
                    }
                },
                {
                    name: '23',
                    option: ()=>{
                        console.log("2");
                    }
                }
            ]
        }
    }
}
</script>

<style>

</style>
