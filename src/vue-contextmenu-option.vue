<template>
  <li v-if="option.options" class="vue-simple-context__item">
    {{ option.name }}

    <ul class="vue-simple-context-submenu">
      <MenuOption
        v-for="(option, index) in option.options"
        :key="index"
        :option="option"
      />
    </ul>
  </li>

  <li v-else class="vue-simple-context__item">
    {{ option.name }}
  </li>
</template>

<script>
export default {
  name: "MenuOption",
  props: {
    option: {
      type: Array,
      required: true
    }
  }
};
</script>