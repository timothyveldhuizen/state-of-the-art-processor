<template>
<div>
    <span @mouseenter="showPopover = true" @mouseleave="showPopover = false">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="black" strokeWidth="2" fill="yellow" strokeLinecap="round" strokeLinejoin="round" class="css-i6dzq1"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    </span>
    <div v-if="showPopover" class="popover-text"><p>{{ message }}</p></div>
</div>
</template>

<script>
export default {
    name: 'ErrorPopover',
    props: ['message'],
    data() {
        return {
            showPopover: false,
        }
    }
}
</script>

<style scoped>
.popover-text {
    background: lightgrey;
    padding: 0.4em;
    position: absolute;
    border-radius: 0.4em;
    box-shadow: 0.4em;
}
</style>