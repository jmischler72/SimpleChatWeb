<script lang="ts">
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    handleChange() {
      localStorage.setItem('username', this.name);

      this.$emit("name-changed", this.name)
    }
  },
}
</script>

<template>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
  <div class="body-class">
    <div class="Wrapper">
      <h1 class="Title">Simple Chat</h1>
      <div class="Input">
        <input v-on:keyup.enter="handleChange" type="text" id="input" class="Input-text" v-model="name" placeholder="Your name, ex: Jean">
        <button @click="handleChange"><span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>


</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Dosis');

:root {
  /* generic */
  --gutterSm: 0.4rem;
  --gutterMd: 0.8rem;
  --gutterLg: 1.6rem;
  --gutterXl: 2.4rem;
  --gutterXx: 7.2rem;
  --colorPrimary400: #7e57c2;
  --colorPrimary600: #5e35b1;
  --colorPrimary800: #4527a0;
  --fontFamily: "Dosis", sans-serif;
  --fontSizeSm: 1.2rem;
  --fontSizeMd: 1.6rem;
  --fontSizeLg: 2.1rem;
  --fontSizeXl: 2.8rem;
  --fontSizeXx: 3.6rem;
  --lineHeightSm: 1.1;
  --lineHeightMd: 1.8;
  --transitionDuration: 300ms;
  --transitionTF: cubic-bezier(0.645, 0.045, 0.355, 1);

  /* floated labels */
  --inputPaddingV: var(--gutterMd);
  --inputPaddingH: var(--gutterLg);
  --inputFontSize: var(--fontSizeLg);
  --inputLineHeight: var(--lineHeightMd);
  --labelScaleFactor: 0.8;
  --labelDefaultPosY: 60%;
  --labelTransformedPosY: calc(
      (var(--labelDefaultPosY)) -
      (var(--inputPaddingV) * var(--labelScaleFactor)) -
      (var(--inputFontSize) * var(--inputLineHeight))
  );
  --inputTransitionDuration: var(--transitionDuration);
  --inputTransitionTF: var(--transitionTF);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.body-class {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  font-family: var(--fontFamily);
  font-size: var(--fontSizeMd);
  line-height: var(--lineHeightMd);
  margin: 0;
}

.Wrapper {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  align-items: center;
  gap: 30px;
}

.Title {
  margin: 0 0 20px 0;
  padding: 0;
  color: var(--light-color);
  font-size: var(--fontSizeXx);
  font-weight: 400;
  line-height: var(--lineHeightSm);
  text-align: center;
  text-shadow: -0.1rem 0.1rem 0.3rem var(--dark-color2);
  width: 80%;
}

.Input {
  display: flex;
  flex-direction: row;
  position: relative;
}

.Input button{
  border: none;
  background-color: white;
  border-radius: 0.4rem;
  color: var(--dark-color2);
  padding: 0 10px;
}
.Input button:hover{
  background-color: var(--accent-color1);
}

.Input-text {
  display: block;
  margin: 0 auto;
  padding: 0.6rem 1.4rem;
  color: inherit;
  width: 80%;
  font-family: inherit;
  font-size: var(--inputFontSize);
  font-weight: inherit;
  line-height: var(--inputLineHeight);
  border: none;
  border-radius: 0.4rem;
  transition: box-shadow var(--transitionDuration);
}

.Input-text::placeholder {
  color: var(--dark-color2);
}

.Input-text:focus {
  outline: none;
  box-shadow: 0.2rem 0.8rem 1.6rem var(--light-color2);
}
</style>