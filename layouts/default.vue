<template>
  <div>
    <TheHeader @sidenav-toggle="displaySidenav = !displaySidenav" />
    <TheSidenav 
      :show="displaySidenav"
      @close="displaySidenav = false" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      displaySidenav: false
    }
  }
}
</script>

<style>
/* html {
  font-family: 'Open Sans', sans-serif;
} */

body {
  margin: 0;
}
</style>