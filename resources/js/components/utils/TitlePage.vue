<template>
    <section class="container-fluid pt-5 w-full text-center text-5xl shadow-lg pb-2 mb-5">
        {{ title }}
    </section>
</template>
<script>
    export default {
        name: 'TitlePage',
        props: {
            title: String
        },
    }
</script>