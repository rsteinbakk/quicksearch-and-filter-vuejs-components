<template>
  <div
    class="dropdown-menu"
    v-on:click.prevent="openMenu"
    :class="{ open: open }"
  >
    <slot name="link">{{ label }}</slot>
    <div v-on:click="propagate">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "allowProp"],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    openMenu: function () {
      var model = this;
      if (!model.open)
        setTimeout(function () {
          model.open = true;
        }, 1);
    },
    propagate: function (e) {
      if (!this.allowProp) e.stopPropagation();
    },
  },
  created: function () {
    var model = this;

    document.body.addEventListener("click", function () {
      model.open = false;
      return true;
    });
  },
};
</script>

<style lang="css">
.dropdown-menu {
  position: relative;
  cursor: pointer;
}
.dropdown-menu::after {
  display: block;
  content: "";
  width: 0.4em;
  height: 0.4em;
  position: absolute;
  right: 0.5em;
  top: 0.16em;
  transform: rotate(45deg);
  border-right: 2px solid #666;
  border-bottom: 2px solid #666;
}
.dropdown-menu > div {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 3px;
  z-index: 5;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
}
.dropdown-menu.open > div {
  display: block;
}
.dropdown-menu li {
  display: block;
  padding: 0.3em 1em;
}
.dropdown-menu li:hover {
  background-color: #ddd;
}
ul {
  padding-left: 0;
}
</style>