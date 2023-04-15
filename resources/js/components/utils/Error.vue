<template>

    <div v-if="erreurTab.length != 0" class="rounded-xl bg-red-400 bg-red px-5 py-2">
        <div class="" v-for="erreur in erreurTab" :key="error">
            {{ erreur }}
        </div>
    </div>

</template>
<script>

export default {
    props: ['erreurTab']
}

</script>