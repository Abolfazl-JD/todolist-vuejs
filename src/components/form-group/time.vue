<template>
  <div class="form-group">
        <input v-model="time" type="time" class="form-control mx-sm-3" value="">
            <button type="submit" class="btn btn-primary" @click.prevent="submit" >Add</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            time  : ""
        }
    },
    methods: {
        submit(){
            this.$emit("submit" , this.time)
        }
    }
}
</script>

<style>

</style>