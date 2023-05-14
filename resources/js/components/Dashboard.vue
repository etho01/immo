<template>

    <div class="m-auto">
        <div class="mb-5">
            <Title :title="getMessage" />
        </div>
        <div class="mt-5">
            Veuillez commencer votre navigation sur une de ces pages:
            <div class="flex flex-col">
                <router-link v-for="page in pages" :to="{name: page.name}" >{{ page.nom }} </router-link>
            </div>
        </div>
    </div>

</template>
<script>
import Title from './utils/title/Title.vue';
import userStoreLog from './feature/user/userStoreLog';

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
            }
        },
        computed: {
            getMessage(){
                return 'Bienvenue '+ userStoreLog.getUserLog['name']
            }
        },
        components: { Title }
    }

</script>