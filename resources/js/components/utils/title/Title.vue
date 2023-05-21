<template>

    <div class=" line-title">

        <span class="text-xl relative bg-white ml-5 px-2"> {{ title }} </span>
    </div>

</template>
<script>
    export default {
        props: ['title'],
    }
</script>

<style>

.line-title::before{
    content: "";
    position: relative;
    display: flex;
    width: 100%;
    height: 3px;
    top: 1rem;
    background-color: #171717;
}

</style>