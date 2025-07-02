<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { SPromise } from './utils'
import './utils/bind.js'

const p = new SPromise((resolve, reject) => {
    resolve('success')
})

p.then((data: any) => {
  console.log(data)
})
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
