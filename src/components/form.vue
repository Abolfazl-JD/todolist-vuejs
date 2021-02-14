<template>
    <div>
        <workTodo v-if="comp === 'chooseItem'" @getWork="updateItem($event)"></workTodo>
        <choose-date v-else-if="comp === 'chooseDate'" @getDate="updateDate($event)"></choose-date>
        <choose-time v-else @submit="submit($event)"></choose-time>
    </div>
</template>

<script>
import {bus} from "../main"
import Item from "./form-group/item"
import myDate from "./form-group/date"
import Time from "./form-group/time"

export default {
    components : {
        "workTodo" : Item,
        "choose-date" : myDate,
        "choose-time" : Time,
    },
    data(){
        return{
             workTodo : {
                 item : "",
                 yourDate : "",
                 time : "",
                 done : false,
                 edit : false,
             },
             comp : "chooseItem"
        }
    },
    methods : {
        submit : function(data){
            this.workTodo.time = data
            //send these to body.vue
            bus.$emit("changeLoad" , true)
            bus.$emit("checkLength" , false)
            //post datas
            this.$http.post("https://vue-todolist-f1235-default-rtdb.firebaseio.com/todoList.json", this.workTodo).then((data) => {
                return data.json()
            }).then((data) => {
                //force to re-render body.vue component by adding one to key of body.vue in main.vue
                bus.$emit('changeKey' , 1)
            }).then((data) => {
                bus.$emit("changeLoad" , false)
                this.comp = 'chooseItem'
            })
            //place value of input empty
            this.workTodo.item = ""
        },
        updateItem(data){
            this.workTodo.item = data
            this.comp = "chooseDate"
        },
        updateDate(data){
            this.workTodo.yourDate = data
            this.comp = "chooseTime"
        }
    },
}
</script>

<style>

</style>