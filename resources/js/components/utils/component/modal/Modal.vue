<template>

<div class="bloc-modale" v-show="isShow">
    <div class="overlay "></div>
    <div class="sm:container bg-white border-2 rounded p-2 z-50">
        <div class="flex justify-between text-3xl">
            <span>
                {{ title }}
            </span>
            <div class="flex align-middle px-3 py-1 rounded-md cursor-pointer" @click="toogle">
                <font-awesome-icon :icon="['fas', 'xmark']"  size="xl"/>
            </div>
        </div>

        <div class="max-h-96 overflow-auto p-5">
            <slot />
        </div>
    </div>
</div>

</template> 
<script>

export default {
    props: ['title'],
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        toogle(){
            this.isShow = !this.isShow
        }
    }
    
}

</script>

<style>

    .bloc-modale{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .overlay{
        background: rgba(0,0,0,0.5);
        position:  fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0%;
        z-index: 40;
    }

    .modale-card{
        width: 300px;
        height: 300px;
    }

</style>