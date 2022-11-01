<!-- Default page that also displays freets -->

<template>
    <article>
        <CreateCommentForm v-bind:freetId="this.freetId"/>
        <CommentComponent v-if="!noComments"
        v-for="comment in this.comments"
        :authorId="comment.authorId"
        :content="comment.content"/>
        <p v-if="noComments">no comments</p>
    </article>
</template>

<script>
import CommentComponent from '@/components/Comment/CommentComponent.vue';
import CreateCommentForm from '@/components/Comment/CreateCommentForm.vue';
import GetCommentsForm from '@/components/Freet/GetFreetsForm.vue';

export default {
  name: 'CommentPage',
  props: ['freetId'],
  components: {CommentComponent, GetCommentsForm, CreateCommentForm},
  data(){
    return{
        noComments: true,
        comments: "",
    }
  },

  async created() {
    //this.$refs.getCommentsForm.submit();
    const options = {
        method: "GET", headers: {'Content-Type': 'application/json'}
    };
    const r = await fetch(`/api/freets/comments/?freetId=${this.freetId}`, options);
    const res = await r.json();
    if(res.length > 0){
        this.comments = res;
        this.noComments = false;
    }
    else{
        this.noComments = true;
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>