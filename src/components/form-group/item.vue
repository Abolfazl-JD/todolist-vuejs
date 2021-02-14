<template>
  <div class="form-group">
    <input v-model="item" type="text" class="form-control mx-sm-3" placeholder="I want to do ..." value="">
        <button type="submit" class="btn btn-primary" @click.prevent="sendWork">choose date</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            item : ""
        }
    },
    methods : {
        sendWork(){
            this.$emit("getWork" , this.item)
        }
    }
}
</script>

<style>

</style>