<!-- Form for creating comments (block style) -->
<template>
    <form id="create-comment">
          <h3>Create Comment</h3>
          <div class = "contentArea">
            <label for="content">Content:</label>
            <textarea v-model="content" id="content"></textarea>
          </div>
          <button class= "button-4" @click = "createComment()">Comment</button>
    </form>
</template>
<script>



export default {
  name: 'CreateCommentForm',
  props: ['freetId'],
  emits: ['response'],
  data() {
    return {
        content: "",
    };
  },
  methods: {
    async createComment(content) {
        //this.$refs.getCommentsForm.submit();
        const options = {
            method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({freetId: this.freetId, content: this.content})
        };
        const r = await fetch(`/api/freets/${this.freetId}/comment`, options);
        if (r.ok){
          this.content = ""
          this.$emit('updateComments')
        }
        return r;
    }
    }
};
</script>

<style scoped>
@import "/components/globalCss.css";
.contentArea{
    display: flex;
    flex-direction: column;
}
change{
  background-color: blue,

}
</style>

