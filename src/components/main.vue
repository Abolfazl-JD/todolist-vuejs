<template>
  <div>
      <top-section></top-section>
      <main-body :key="componentKey"></main-body>
  </div>
</template>

<script>
import Content from "./content"
import Body from "./body"
import {bus} from "../main"

export default {
    components : {
        
        "top-section" : Content,
        "main-body" : Body
    },
    data(){
        return{
            componentKey : 0
        }
    },
    created(){
        bus.$on("changeKey" , (data) => {
            this.componentKey += data
        })
    }
}
</script>

<style>

</style>