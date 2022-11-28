<template>
  <main>
    
    <CreateFavoriteForm />
    <!-- <section v-if="test.length" id="todo-list"> -->
    <section v-if="$store.state.favorites.length" id="todo-list">

      <ol>
        
    
       
        <div  v-for="item in test">
         <!-- <div  v-for="item in $store.state.favorites"> -->
          <p>{{item}}</p>

          <p>{{item["name"]}}</p>
          <p></p>
          <P></P>

          <p>{{item["url"]}}</p>
        
          
          <a :href="item['url']"><p>{{item["name"]}}</p></a>
          
        
          
          
          
        </div>

        <!--I also wanted to use component but, didn't know how to get eacg part of a dict-->


         
      
       
      </ol>
    </section>
    <section v-else id="todo-list">
      <p>No favorites.</p>
    </section>
  </main>
</template>

<script>

import CreateFavoriteForm from "./CreateFavoriteForm.vue";
import FavoriteComponent from "./FavoriteComponent.vue";

export default {
  components: {CreateFavoriteForm,FavoriteComponent },
  data(){
    return{
      items: this.$store.state.todos,
      test1: [],
      test: [{"name":"Google", "url":"https://www.google.com/"},
    {"name":"BBC", "url":"https://www.bbc.com/news"}],
    
       
    }
  },
  
};

</script>
