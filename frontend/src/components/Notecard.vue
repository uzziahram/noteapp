<template>
<div>
    <h1 class="font-extrabold"> {{ note.title }}</h1>
    <p> {{ note.content }}</p>

</div>
</template>

<script setup>

    const prop = defineProps({
        note: {
            type: Object,
            required: true
        }
    })

</script>