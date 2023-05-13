<template>

    <Select label="Appartement" :param="apparts" :fonc="(param) => param.adresse + ' ' + param.adresse_compl" @changeValue="changeValue">
        <Text @changeValue="changeFiltre" label="Adresse Appartement"/>
    </Select>

</template>
<script>
    import Select from '../../utils/input/select.vue';
    import useAppart from '../appart/appartServices';
    import Text from '../../utils/input/Text.vue';

    const { getApparts, apparts } = useAppart();


    export default {
        data() {
            return {
                apparts
            }
        },
        methods: {
            getApparts,
            changeFiltre(text) {
                this.getApparts({
                    recherche: text
                })
            },
            changeValue (id) {
                this.$emit('changeValue', id)
            }
        },
        mounted() {
            this.getApparts();
        },
        components: { Select, Text }
    }

</script>