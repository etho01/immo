<template>

    <Select label="Agence" :param="agences" :fonc="(param) => param.nom" @changeValue="changeValue">
        <Text @changeValue="changeFiltre" label="Nom de l'agence"/>
    </Select>

</template>
<script>
    import useAgence from '../../services/agenceServices';
    import Select from '../utils/input/select.vue';
    import Text from '../utils/input/Text.vue';

    const {getAgences, agences} = useAgence()

    export default {
        data() {
            return {
                agences
            }
        },
        methods: {
            getAgences,
            changeFiltre(text) {
                this.getAgences({
                    recherche: text
                })
            },
            changeValue (id) {
                this.$emit('changeValue', id)
            }
        },
        mounted() {
            this.getAgences();
        },
        components: { Select, Text }
    }

</script>