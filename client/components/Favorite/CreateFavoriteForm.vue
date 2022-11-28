<!-- Form for creating favorites (block style) --> 
<template>
     <form id="create-favorite">
          <h3>Create Favorite</h3>
          <div class="contentArea">
            <label for="name">Name:</label>
            <textarea v-model="name" id="name"></textarea>
          </div>
          <div class="contentArea">
            <label for="url">URL:</label>
            <textarea v-model="url" id="url"></textarea>
          </div>
          <button @click = "createFavorite()">Create a favorite</button>
          
        </form>
</template>

<!--

 Form for creating comments (block style) 

This was helping mw to debug !!!!!!
<template>
    <form id="create-comment">
          <h3>Create Comment</h3>
          <div class = "contentArea">
            <label for="content">Content:</label>
            <textarea v-model="content" id="content"></textarea>
          </div>
          <button @click = "createComment()">Create a comment</button>
    </form>
</template>
-->

<script>
export default {
  name: 'CreateFavoriteForm',
  data() {
    return {
        name: "",
        url: "",
    };
  },
  methods: {
    async createFavorite(content) {
        //this.$refs.getCommentsForm.submit();
        const options = {
            method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: this.name, url: this.url})
        };
        const r = await fetch(`/api/favorites`, options);


        //const name1 = this.name.trim();
        //const url1 = this.url.trim();
        if (this.name && this.url) {
          //console.log({"name":this.name, "url":this.url});
          this.$store.commit("addFavorite",this.name,this.url);
          this.$store.commit("alert", {
            message: `Made favorite item with content: ${this.name}`,
            status: "success",
          });
        } else {
          this.$store.commit("alert", {
            message: "Favorite item content cannot be empty.",
            status: "error",
          });
        }
        this.name = "";
        this.url = "";
        return r;
      }



    }
  }

</script>

<style scoped>
.contentArea{
    display: flex;
    flex-direction: column;
}
</style>
