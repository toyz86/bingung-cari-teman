<template>
  <div class="error-page">
    <div class="content">
      <h1>No Network Connection</h1>
      <p>
        <br />
        <button class="link" @click="onClick">Retry</button>
      </p>
    </div>
  </div>
</template>
<style scoped>
.error-page {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.795);
  color: #fff;
  z-index: 99;
  top: 0;
}
.error-page .content {
  top: 50%;
  width: 100%;
  position: relative;
}
.error-page h1,
.error-page p {
  text-align: center;
}

</style>

<script>

export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onClick: () => {
      window.location.reload();
    },
  },
};
</script>
