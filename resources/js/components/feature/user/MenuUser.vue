<template>

    <main class="w-full" >
        <TitlePage title="Liste des utilisateurs" />
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">
            <Text label="Recherche" @changeValue="onChangeRecherche" />
        </section>
        <ListeUser :user="user" />

    </main>

</template>
<script>
import ListeUser from './ListeUser.vue';
import TitlePage from '../../utils/TitlePage.vue';
import Text from '../../utils/input/Text.vue';

import { useUserStore } from './userStore';
const user = useUserStore()

    export default {
        data() {
            return {
                recherche:'',
                user
            }
        },
        methods: {
            onChangeRecherche(value) {
                this.recherche = value;
            this.user.getUsersByFiltre(this.getFiltre)

            }
        },
        computed: {
            getFiltre() {
                return {
                    recherche: this.recherche
                }
            }
        },
        mounted() {
            this.user.getUsersByFiltre(this.getFiltre)
        },
        components: { TitlePage, Text, ListeUser }
    }

</script>