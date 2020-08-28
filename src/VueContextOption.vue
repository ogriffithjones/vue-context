<template>
  <!-- If the option has further options -->
  <li v-if="option.options" :class="vcstyle.item">
    {{ option.name }}

    <ul :class="vcstyle.submenu">
      <MenuOption
        v-for="(option, index) in option.options"
        :key="index"
        :option="option"
        :handle-click="handleClick"
        :vcstyle="vcstyle"
      />
    </ul>
  </li>

  <!-- Else show the option with a click handler -->
  <li v-else :class="vcstyle.item" @click.stop="handleClick(option)">
    {{ option.name }} 
    <span :class="vcstyle.symbol">{{ option.symbol }}</span>
  </li>
</template>

<script>
export default {
  name: "MenuOption",
  props: {
    option: {
      type: Object,
      required: true
    },
    handleClick: Function,
    vcstyle: {
      type: Object,
      required: true
    }
  }
};
</script>
