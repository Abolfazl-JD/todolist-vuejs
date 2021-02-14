<template>
  <div class="form-group">
    <input v-model="yourDate" type="date" class="form-control mx-sm-3" value="">
        <button type="submit" class="btn btn-primary" @click.prevent="sendDate">choose time</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            yourDate : ""
        }
    },
    methods : {
        sendDate(){
            this.$emit("getDate" , this.yourDate)
        }
    }
}
</script>

<style>

</style>