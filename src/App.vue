<template>
  <div>
    <app-header></app-header>
    <app-main></app-main>
  </div>
</template>

<script>
import Header from "./components/header"
import Main from "./components/main"

export default {
    components : {
        "app-header" : Header,
        "app-main" : Main,
    },
    data(){
      return{
        load : false
      }
    }
}
</script>

<style>

</style>