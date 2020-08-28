<template>
  <div>
    <ul :id="elementId" class="vc-menu" v-click-outside="onClickOutside">
      <MenuOption
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        :handle-click="optionClicked"
        :vcstyle="{
          item: option.class || 'vc-menu__item',
          submenu: 'vc-menu__submenu',
          symbol: 'vc-menu__symbol'
        }"
      />
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import vClickOutside from "v-click-outside";
Vue.use(vClickOutside);

import MenuOption from "./VueContextOption";

export default {
  name: "VueContext",
  components: {
    MenuOption: MenuOption
  },
  props: {
    elementId: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      item: null,
      menuWidth: null,
      menuHeight: null,
      submenuWidth: null,
    };
  },
  methods: {
    showMenu(event, item) {
      this.item = item;

      var menu = document.getElementById(this.elementId);

      if (!menu) {
        return;
      }

      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.menuWidth = menu.offsetWidth;
        this.menuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }

      if (this.menuWidth + event.pageX >= window.innerWidth) {
        menu.style.left = event.pageX - this.menuWidth + 2 + "px";
      } else {
        menu.style.left = event.pageX - 2 + "px";
      }

      if (this.menuHeight + event.pageY >= window.innerHeight) {
        menu.style.top = event.pageY - this.menuHeight + 2 + "px";
      } else {
        menu.style.top = event.pageY - 2 + "px";
      }

      menu.classList.add("vc-menu--active");
    },
    hideContextMenu() {
      let element = document.getElementById(this.elementId);
      if (element) {
        element.classList.remove("vc-menu--active");
      }
    },
    onClickOutside() {
      this.hideContextMenu();
    },
    optionClicked(option) {
      this.hideContextMenu();
      this.$emit("option-clicked", {
        item: this.item,
        option: option
      });
    },
    onEscKeyRelease(event) {
      if (event.keyCode === 27) {
        this.hideContextMenu();
      }
    }
  },
  mounted() {
    document.body.addEventListener("keyup", this.onEscKeyRelease);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onEscKeyRelease);
  }
};
</script>

<style lang="scss">
$main: #f9fafa;
$secondary: #f3f3f5;
$text: #545454;
$text--active: #716fff;

$main__dark: #1b1c1d;
$secondary__dark: #0f0f10;
$text__dark: #ebebeb;

.vc-menu {
  // Display
  display: none;
  list-style: none;
  z-index: 999;

  &--active {
    display: block;
  }

  // Size
  margin: 0;
  padding: 12px;
  width: auto;

  // Position
  position: absolute;
  top: 0px;
  left: 0px;

  // Border
  border-bottom: unset;
  border-radius: 13px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.13);

  // Text
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen", "Helvetica Neue", sans-serif;

  // Color
  background-color: $main;

  // Item
  &__item {
    display: flex;
    color: $text;
    cursor: pointer;
    align-items: center;
    padding: 10px 13px;
    border-radius: 11px;
    position: relative;

    &:hover {
      background-color: $secondary;
      color: $text--active;
    }
  }

  &__symbol {
    padding-left: 23px;
    float: right;
    opacity: 50%;
  }

  li {
    &:first-of-type {
      margin-top: 3px;
    }
    &:last-of-type {
      margin-bottom: 3px;
    }
  }

  &__submenu {

    // Size
    margin: 0;
    padding: 12px;

    // Position
    position: absolute;
    top: -10px;
    left: calc(100% + 13px);

    // Border
    border-bottom: unset;
    border-radius: 13px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.13);

    // Text
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen", "Helvetica Neue", sans-serif;

    // Color
    background-color: $main;
    }
}
</style>