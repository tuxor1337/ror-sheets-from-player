<script setup lang="ts">
  const props = defineProps<{
    title: String,
    sign: String,
    wide: boolean,
  }>();
</script>

<template>
  <h1 :class="{long: title.length > 15, wide: wide}">
    {{title}}
    <div :class="{long: !!sign && sign.length > 95}">
      {{!!sign ? `tune sign: ${sign}` : ""}}
    </div>
  </h1>
</template>

<style scoped>
h1 {
  padding: 0.2rem 0 0.1rem 0.2rem;
  margin: 0;
  line-height: 2.0rem;
  font-size: 1.7rem;
}

h1 div {
  position: absolute;
  top: 0.3rem;
  right: 0.5rem;
  margin: 0;
  padding: 0;
  max-width: 28rem;
  line-height: 1.4rem;
  font-size: 1.0rem;
  font-weight: normal;
}

h1 div.long {
  line-height: 1.1rem;
  font-size: 0.85rem;
}
</style>
