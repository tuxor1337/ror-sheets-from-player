<script setup lang="ts">
	import { computed } from "vue";
  import TuneRows from './TuneRows.vue'
  import BreakRows from './BreakRows.vue'
  import TextBreakRows from './TextBreakRows.vue'

  const props = defineProps<{
    layout: any,
    name: String,
  }>();

	const pattern = computed(() => {
    return props.layout.patterns[props.name];
	});

	const sizing = computed(() => {
    const result = pattern.value.sizing;
    result["n_subbeat_cells"] = (
        result["upbeats"]
        + result["subbeats_per_row"]
        + result["afterbeats"]
    )
    return result;
	});

	const is_tune_type = computed(() => {
    return (
      props.name.toLowerCase().indexOf('tune') >= 0
      || pattern.value.separate_instruments
    );
	});
</script>

<template>
    <table >
      <colgroup>
        <col :style="{width: `${sizing.pre_name_width}rem`}" />
        <col :style="{width: `${sizing.pre_count_width}rem`}" />
        <col
          v-for="i in sizing.n_subbeat_cells"
          :style="{width: `${sizing.subbeat_width}rem`}"
          :key="i"
        />
        <col :style="{width: `${sizing.after_width}rem`}" />
      </colgroup>

      <tbody v-if="name == 'Tune'">
          <tr class="empty">
            <td class="overline"></td>
            <td :colspan="sizing.ncols - 1"></td>
          </tr>
          <tr class="heading">
            <td class="text" colspan="2">Groove</td>
            <td v-if="sizing.upbeats > 0" class="count" :colspan="sizing.upbeats"></td>
            <td
              v-for="i in sizing.beats_per_row"
              class="count"
              :colspan="sizing.subbeats_per_beat"
              :key="i"
            >{{i}}</td>
          </tr>
          <tr class="empty"><td :colspan="sizing.ncols"></td></tr>
      </tbody>

      <TuneRows
        v-if="is_tune_type"
        :name="name"
        :pattern="pattern"
        :sizing="sizing"
      />
      <TextBreakRows
        v-else-if="pattern?.text"
        :name="name"
        :pattern="pattern"
        :sizing="sizing"
      />
      <BreakRows
        v-else
        :pattern="pattern"
        :sizing="sizing"
      />

      <tbody>
        <tr class="empty"><td :colspan="sizing.ncols"></td></tr>
      </tbody>
    </table>
</template>

<style scoped>
table {
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  table-layout: fixed;
}

col:nth-child(2) {
  width: 2.2rem;
}
</style>
