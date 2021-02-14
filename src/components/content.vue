<template>
  <section class="jumbotron">
      <div class="container d-flex flex-column align-items-center">
          <h4 class="mb-3"> add some works to do:</h4>
          <form class="form-inline">
             <app-form></app-form>
            </form>
        </div>
    </section>
</template>

<script>
import {bus} from "../main"
import Form from "./form"

export default {
    components: {
        "app-form" : Form
    },
}
</script>

<style>

</style>