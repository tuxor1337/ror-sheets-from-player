<script setup lang="ts">
import { ref, computed } from 'vue'
import RAW_TUNES from './defaultTunes.ts'
import convertTune from './convertTune.ts'
import TunePage from './components/TunePage.vue'

const tune = ref(Object.keys(RAW_TUNES)[8])
const layout = computed(() => {
  return convertTune(tune.value, RAW_TUNES[tune.value])
})

const bookTunes = [
  "General Breaks",
  "Afoxe",
  "Angela Davis",
  "Angry Dwarfs",
  "Antitek",
  "Bella Ciao",
  "Bhangra",
  "Bomba",
  "Chichita",
  "Coupe-Decale",
  "Cochabamba",
  "Custard",
  "Crazy Monkey",
  "Drum&Bass",
  "Funk",
  "Hafla",
  "Hedgehog",
  "Jungle",
  "Kaerajaan",
  "Karla Shnikov",
  "Malkhas Akhber",
  "March for Biodiversity",
  "No Border Bossa",
  "Menaiek",
  "Norppa",
  "Nova Balanca",
  "Orangutan",
  "Pekurinen",
  "Rope Skipping",
  "Ragga",
  "Sambasso",
  "Samba Reggae",
  "Sheffield Samba Reggae",
  "Police",
  "Tequila",
  "The Roof Is on Fire",
  "The Sirens of Titan",
  "Trans-Europa-Express",
  "Van Harte Pardon",
  "Voodoo",
  "Walc(z)",
  "Wolf",
  "Xango",
  "Zurav Love / Truant",
];
</script>

<template>
  <header>
    <select v-model="tune">
      <option v-for="name in bookTunes" :key="name">{{ name }}</option>
    </select>
  </header>

  <main>
    <TunePage v-for="(_, pageno) in layout.pages" :layout="layout" :pageno="pageno" :key="pageno" />
  </main>
</template>
