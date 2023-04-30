<template>

<div class="bg-neutral-900 h-screen justify-items-stretch w-60" v-if="isShow"  @mouseout="hideMouseHover">
    <div class="flex-wrap justify-between flex px-6 pt-5">
        <div class="text-neutral-200 text-4xl self-center">
            Immo
        </div>
        <div>
            <button @click="changeVisibility" class="bg-slate-600 border-slate-500 rounded-xl border-2 aspect-square px-3 py-2">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </button>
        </div>
    </div>
    <div class="my-4 grid px-4">
        <router-link v-for="page in pages" :to="{name: page.name}" class="text-xl text-neutral-400 my-2 px-1 hover:bg-neutral-700 border-slate-500  rounded-xl border-2 w-full">{{ page.nom }}</router-link>
    </div>
</div>
<div v-else class="bg-neutral-900 h-screen justify-items-stretch">
    <div class="px-2 pt-2">
        <button @click="changeVisibility" class="bg-slate-600 border-slate-500 rounded-xl border-2 aspect-square px-3 py-2">
            <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
    </div>
    <div class="px-2 pt-4">
        <div v-for="page in pages" @mouseover="showMouseHover" class="my-3 px-3 py-3 border-slate-500 rounded-xl border-2"></div>
    </div>
</div>

</template>
<script>

    export default {
        data () {
            return {
                pages: [ 
                    {
                        nom: 'Contrat',
                        name: 'contrat.menu'
                    },
                    {
                        nom: 'Locataire',
                        name: 'locataire.menu'
                    },
                    {
                        nom: 'Appartement',
                        name: 'appart.menu'
                    },
                    {
                        nom: 'Proprietaire',
                        name: 'proprio.menu'
                    }
                ],
                show: true,
                mouseOver: false
            }
        },
        computed : {
            isShow (){
                return this.show || this.mouseOver;
            }
        },
        methods: {
            changeVisibility () {
                this.show = !this.show
            },
            showMouseHover() {
                this.mouseOver = true;
            },
            hideMouseHover() {
                this.mouseOver = false;
            }
        }
    }

</script>
