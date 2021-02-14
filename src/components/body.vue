<template>
  <div class="todosList">
      <div class="container">
          <div class="d-flex flex-column align-items-center ">
            <body-nav :todoList="todoList"></body-nav>
                <h5 class="mt-4" v-if="!donelist && checkLength">there aren't any works to do</h5>
                    <div class="tab-content" v-if="!load">
                        <template v-for="workTodo of todoList">  
                            <div :key="workTodo.id" class="col-12 mb-2" v-if="workTodo.done === donelist">
                                <div v-if="!workTodo.edit" class="d-flex justify-content-between align-items-center border rounded p-3">
                                    <div>{{workTodo.item}}</div>
                                    <div>{{workTodo.yourDate}}</div>
                                    <div>{{workTodo.time}}</div>
                                    <div>
                                        <button type="button" :class="{'btn' : true, 'btn-success' : !workTodo.done , 'btn-warning' : workTodo.done,'btn-sm' : true ,'mr-1' : true}"  @click="changeDone(workTodo)">{{workTodo.done ? "undone" : "done"}}</button>
                                        <button  type="button" class="btn btn-secondary btn-sm" @click="workTodo.edit = true">edit</button>
                                        <button type="button" class="btn btn-danger btn-sm ml-1" @click="remove(workTodo.id)">delete</button>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center border rounded p-3" v-if="workTodo.edit">
                                    <div>
                                        <input class="form-control" v-model="workTodo.item"/>
                                        <input type="date" class="form-control mt-2" v-model="workTodo.yourDate"/>
                                        <input type="time" class="form-control mt-2" v-model="workTodo.time"/>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-secondary btn-sm" @click="editHandler(workTodo)">edit</button>
                                    </div>
                                    </div>
                            </div>
                        </template>
                    </div>
                <app-loader v-if="load"></app-loader>
            </div>
        </div>
    </div>

</template>

<script>
import {bus} from "../main"
import Loading from "./loading"
import Nav from "./nav"
import API from "../api"

export default {
    components : {
        "app-loader" : Loading,
        "body-nav" : Nav
    },
    data(){
        return{
           todoList : [],
           load : false,
           checkLength : false,
           donelist : false,
        }
    },
    created(){
        //recieved from these 2 methods from content.vue
        bus.$on("changeLoad" , (data) => {
            this.load = data
        })
        bus.$on("checkLength" , (data) => {
            this.checkLength = data
        })
        bus.$on("changeDoneList" , (data) => {
            this.donelist = data
        })

        this.load = true

        //get datas
        
        API.get("todoList.json").then((data) => {
            return data.data
        }).then((data) => {

            //add key to each of worksTodo
            for(let key in data){
                data[key].id = key
                this.todoList.push(data[key])
            }
        }).then((data) => {
            this.load = false
        }).then((data) => {
            //check if there weren't any works to do 
            if(this.todoList.filter(item => !item.done).length === 0) this.checkLength = true
        })
        
    },
    methods : {
        remove(data){
            this.load = true

            //deleting data from firebase
            this.$http.delete("https://vue-todolist-f1235-default-rtdb.firebaseio.com/todoList/" + data +".json").then((result) => {

                //deleting data from todoList
                let deletedItem = this.todoList.find(workTodo => workTodo.id === data)
                this.todoList = this.todoList.filter(item => item !== deletedItem)
            }).then((result) => {
                this.load = false
            }).then((result) => {

            //check if there weren't any works to do 
            if(this.todoList.filter(item => !item.done).length === 0) this.checkLength = true
        })

        },
        //change work done
        changeDone(workTodo){
            this.load = true
            API.put("todoList/" + workTodo.id +".json" , {item : workTodo.item , done : !workTodo.done , edit : workTodo.edit}).then((result) => {
                    for(let val of this.todoList){
                    if(val.id === workTodo.id) val.done= !val.done
                }
            }).then((result) => {
                this.load = false
            })
        },
        //edit description of work
        editHandler(workTodo){
            this.load = true
            API.put("todoList/" + workTodo.id +".json" , {item : workTodo.item, yourDate : workTodo.yourDate ,time : workTodo.time , done : workTodo.done , edit : false}).then((result) => {
                workTodo.edit = false
                this.load = false
            })
        }

    },
}
</script>

<style scoped>
.tab-content{
    width : 50%
}
</style>