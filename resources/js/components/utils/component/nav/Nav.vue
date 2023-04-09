<template>

    <div class="flex content-end">
        <div class="mr-2  content-end cursor-pointer" v-for="label in labels" :key="label.id" @click="changeShow(label.id)">
            <div class="round-nav px-3 py-1 self-end flex h-full" :class="[label.id == activeItem ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300']">
                {{ label.nom }}
            </div>

        </div>
          
    </div>
    <div class="px-3 py-2 rounded border-2">
        <slot></slot>
    </div>

</template>
<script>

    export default {

        props : [
            'labels',
            'refs',
            'activeItemDefault'
        ],
        data () {
            return {
                activeItem : this.activeItemDefault,
            }
        },
        mounted () {
            if (this.activeItemDefault == undefined){
                console.error('Erreur : le composant nav doit avoir un element par default')
            } else {
                this.changeShow(this.activeItemDefault)
            }
        },
        methods : {
            changeShow(idItem) {
                this.activeItem = idItem
                this.labels.forEach((label) => {
                    if (label.id == idItem){
                        document.querySelectorAll("[ref-nav='"+label.id+"']")[0].style.display = '';
                    } else {
                        document.querySelectorAll("[ref-nav='"+label.id+"']")[0].style.display = 'none';
                    }
                })
            },

        },
        computed : {

        }

    }

</script>

<style>

    .round-nav{
        margin-top: auto;
        margin-bottom: 0px;
        border-radius: 0.75rem 0.75rem 0px 0px;
    }

</style>