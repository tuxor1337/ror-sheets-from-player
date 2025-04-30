<script setup lang="ts">
  import TuneHeader from './TuneHeader.vue'
  import TuneTable from './TuneTable.vue'

  const props = defineProps<{
    pageno: Number,
    layout: any
  }>();
</script>

<template>
  <section
    :style="{width: `${layout.sizing.total_width}rem`}"
  >
    <TuneHeader :sign="layout?.sign" :title="layout.name" :wide="layout.sizing.total_width > 80" />
    <TuneTable
      v-for="(name, i) in layout.pages[pageno]"
      :layout="layout"
      :name="name"
      :key="i"
    />
  </section>
</template>

<style scoped>
section {
  margin: 1rem 1rem 2rem;
  padding: 0;
  border-style: solid;
  border-color: #fee;
  border-width: 5.5rem 10.5rem 5rem 5.0rem;
  outline: 1px black solid;
  position: relative;
}

section.wide h1 div {
  max-width: 70rem;
}

section:not(.wide) h1.long div {
  max-width: 20rem;
}

@media print {
  section {
    break-after: always;
    margin: 0;
  }
}
</style>
