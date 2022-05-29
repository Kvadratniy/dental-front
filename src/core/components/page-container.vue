<template>
  <div>
    <div :class="$style.head">
      <v-breadcrumbs
        :items="breadcrumbs"
        large
      ></v-breadcrumbs>
    </div>

    <div :class="$style.container">
      <div :class="$style.headerContainer">
        <slot name="header"/>
      </div>
      <template>
        <slot name="content"/>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style module>
.container {
  margin: 0 20px 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: -10px -20px 27px rgb(0 0 0 / 5%);
  /* h36 */
}

.head {
  display: flex;
  justify-content: space-between;
  margin: 0 0 12px 20px;
  /* padding: 16px; */
}

.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #DF9F46;
  padding: 0 0 16px 0;
  gap: 12px
}

@media (max-width: 768px) {
  .container {
    margin: 0;
    padding: 10px 0;
  }
  .head  {
    margin: 0;
    margin: 0 0 10px 0;
  }
  .headerContainer {
    padding: 0 0 5px 0;
  }
}
</style>