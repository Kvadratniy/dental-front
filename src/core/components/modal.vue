<template>
  <div :class="$style.container">
    <!-- OVERLAY -->
    <div
      :class="{
        [$style.overlay]: overlay,
      }"
      @click="onClickOutside"
    ></div>

    <!-- MODAL -->
    <div
      :class="{
        [$style.panel]: true,
        [$style[`position-${position}`]]: true,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    overlay: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'center',
      validator: (value) => ['center', 'right'].includes(value),
    },

    clickOutside: {
      type: Boolean,
      default: true,
    }
  },

  methods: {
    onClickOutside() {
      if (this.clickOutside) {
        this.$emit('close');
      }
    }
  }
};
</script>

<style module lang="scss">
@mixin box {
  border: 1px solid #e2e8ed;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 8px;
  padding: 24px;
  font-size: 14px;
}

.container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.overlay {
  background: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
  overflow: hidden;
}

.panel {
  display: flex;
  flex-direction: column;
}

.position {
  &-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
    @include box;
  }

  &-right {
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    transition: 0.3s;
  }
}
</style>
