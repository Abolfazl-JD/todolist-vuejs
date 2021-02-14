<template>
    <nav class="col-6 mb-3">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a :class="{active:active , ...linkClasses}" @click="undoneList">undone<span class="badge badge-secondary">{{todoList.filter(item => !item.done).length}}</span></a>
            <a :class="{active:!active , ...linkClasses}" @click="doneList">done <span class="badge badge-success">{{todoList.filter(item => item.done).length}}</span></a>
        </div>
    </nav>
</template>

<script>
import {bus} from "../main"

export default {
    data(){
        return{
            active : true,
            linkClasses : {
                'nav-item' : true ,
                'nav-link' : true ,
                'font-weight-bold' : true
            }
        }
    },
    methods : {
        undoneList(){
            bus.$emit("changeDoneList" , false)
             this.active = !this.active
        },
        doneList(){
            bus.$emit("changeDoneList" , true)
             this.active = !this.active
        }
    },
    props : ["todoList"]
}
</script>

<style scoped>
    
a{
    color : #495057;
    cursor : pointer
}
.badge{
    margin-left: 5px;
}
</style>