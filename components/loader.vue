<template lang="html">
  <div class="loading-page">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.795);
  text-align: center;
  z-index: 99999999;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 8em;
  height: 8em;
}
.loader {
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 242, 230, 0.2);
  border-right: 1.1em solid rgba(0, 242, 230, 0.2);
  border-bottom: 1.1em solid rgba(0, 242, 230, 0.2);
  border-left: 1.1em solid #0fbec4;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
