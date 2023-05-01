<template>

<div class="bg-neutral-900 h-screen justify-items-stretch w-60 flex flex-col" v-if="isShow"  @mouseout="hideMouseHover">
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
    <div class="mt-auto my-4 px-4">

        <Dropdown 
            :textBotton="userStore.getNom" 
            btnClass="text-xl text-neutral-400 my-2 px-1 hover:bg-neutral-700 border-slate-500  rounded-xl border-2 w-full cursor-pointer"
            dropClass="border-2 rounded-lg border-neutral-700 absolute bg-neutral-900 mt-2 z-50 flex flex-wrap w-40"
            dataPlacement="top"
        > 
            <router-link :to="{name: 'me'}" class="text-xl text-neutral-400 hover:bg-neutral-700 border-slate-500  rounded-xl border-2 w-full px-4 my-4" >Profil</router-link>
            <div class="text-xl text-neutral-400 my-2 px-1 hover:bg-neutral-700 border-slate-500  rounded-xl border-2 w-full cursor-pointer" @click="disconect">
                Se deconnecter
            </div>
        </Dropdown>
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

    import router from '../../router';
import userStore from '../../store/userStore';
import Dropdown from '../utils/component/Dropdown.vue';

    export default {
    data() {
        return {
            pages: [
                {
                    nom: "Contrat",
                    name: "contrat.menu"
                },
                {
                    nom: "Locataire",
                    name: "locataire.menu"
                },
                {
                    nom: "Appartement",
                    name: "appart.menu"
                },
                {
                    nom: "Proprietaire",
                    name: "proprio.menu"
                },
                {
                    nom: "Agence",
                    name: 'agence.menu'
                },
                {
                    nom: "User",
                    name: 'user.menu'
                }
            ],
            show: true,
            mouseOver: false,
            userStore
        };
    },
    computed: {
        isShow() {
            return this.show || this.mouseOver;
        }
    },
    methods: {
        changeVisibility() {
            this.show = !this.show;
        },
        showMouseHover() {
            this.mouseOver = true;
        },
        hideMouseHover() {
            this.mouseOver = false;
        },
        disconect() {
            userStore.disconect();
        }
    },
    components: { Dropdown, router }
}

</script>
