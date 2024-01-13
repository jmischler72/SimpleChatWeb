<script setup lang="ts">

</script>

<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  margin: 0;
  width: 90px;
  height: 90px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>