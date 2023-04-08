<template>

    <Select label="Locataire" :param="locataires" :fonc="(param) => param.nom + ' ' + param.prenom" @changeValue="changeValue">
        <Text @changeValue="changeFiltre" label="Nom locataire"/>
    </Select>

</template>
<script>
    import Text from '../utils/input/Text.vue';
    import Select from '../utils/input/select.vue';
    import useLocataire from '../../services/locataireServices';

    const { getLocataires, locataires } = useLocataire();

    export default {
        data() {
            return {
                locataires
            }
        },
        methods: {
            getLocataires,
            changeFiltre(text) {
                this.getLocataires({
                    recherche: text
                })
            },
            changeValue (id) {
                this.$emit('changeValue', id)
            }
        },
        mounted() {
            this.getLocataires();
        },
        components: { Select, Text }
    }

</script>