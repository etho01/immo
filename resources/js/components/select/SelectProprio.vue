<template>

    <Select label="propritaire" :param="proprietaires" :fonc="(param) => param.nom + ' ' + param.prenom" @changeValue="changeValue">
        <Text @changeValue="changeFiltre" label="Nom du proprietaire"/>
    </Select>

</template>
<script>
    import Text from '../utils/input/Text.vue';
    import Select from '../utils/input/select.vue';
    import useProprietaire from '../../services/proprietaireServices';

    const { getProprietaires, proprietaires } = useProprietaire();

    export default {
        data() {
            return {
                proprietaires
            }
        },
        methods: {
            getProprietaires,
            changeFiltre(text) {
                this.getProprietaires({
                    recherche: text
                })
            },
            changeValue (id) {
                this.$emit('changeValue', id)
            }
        },
        mounted() {
            this.getProprietaires();
        },
        components: { Select, Text }
    }

</script>