<template>
  <div class="img-button">
    <div class="img"></div>
    <div class="text">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
  .img-button {
    display: inline-block;
  }
</style>
