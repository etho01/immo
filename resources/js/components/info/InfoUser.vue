<template>

    <div class="">
        <Title title="Informations" />
        <div class="grid grid-cols-1 mt-3">
            <Text label="Nom" :value="getUserUse.name"/>
            <Text label="Email" :value="getUserUse.email" />
        </div>

        <div v-if="canUpdatePassword" class="flex flex-col justify-center">
            <Title title="Changer le mot de passe" />
            <div class="grid grid-cols-1 w-1/2 self-center">
                <Text label="Mot de passe" />
                <Text label="Retaper le mot de passe" />
            </div>
        </div>

    </div>

</template>
<script>
import Text from '../utils/input/Text.vue';
import Title from '../utils/title/Title.vue';


    export default {
        props: [
            'userBase',
            'updatePassword'
        ],
        computed: {
            getUserUse() {
                return this.userBase
            },
            canUpdatePassword() {
                if (this.updatePassword == true){
                    return true
                }
                return false
            }
        },
        components: { Title, Text }
}

</script>