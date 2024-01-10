<script lang="ts">
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    handleChange() {
      this.$emit("name-changed", this.name)
    }
  }
}
</script>

<template>
  <div class="container">
    <label for="name">Your Name</label>

    <input type="text" id="name" name="name" v-model="name" required minlength="4" maxlength="8" size="10"/>
    <button @click="handleChange"></button>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}

label {
  font-size: 100px;
}
</style>