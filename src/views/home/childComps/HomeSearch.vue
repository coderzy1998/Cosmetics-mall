<template>
  <div class="search">
    <slot name="left"></slot>
    <el-input type="text" placeholder="请输入内容" class="search-input"
              v-model="search"
              prefix-icon="el-icon-search"
              clearable>
    </el-input>
    <el-button icon="el-icon-search"
               class="button" circle @click="searchClick">
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "HomeSearch",
    data(){
      return{
        search:""
      }
    },
    methods:{
      searchClick(){
        this.$emit('searchClick',this.search)
      }
    }
  }
</script>

<style scoped>
  .search{
    background-color: #fff;
    z-index: 10;
    position: relative;
    display: flex;
    padding: 1px;
    border-radius: 5px;
  }
  .button{
    border: 0;
  }
</style>
