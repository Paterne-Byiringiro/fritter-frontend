<!-- Reusable component representing a single comment and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <div>
    <p>@{{this.authorName}}</p>
    <p>{{this.content}}</p>
    </div>
</template>
  
  <script>
  import CreateCommentForm from '@/components/Comment/CreateCommentForm.vue';

  export default {
    name: 'CommentComponent',
    components: {CreateCommentForm},
    props: ['authorId','content']
      // Data from the stored comment
    //   comment: {
    //     type: Object,
    //     required: true
    //   }
    ,
    data() {
      return {
        authorName: "",
      };
    },
    async created() {
    //this.$refs.getCommentsForm.submit();
    const options = {
        method: "GET", headers: {'Content-Type': 'application/json'}
    };
    const r = await fetch(`/api/users/usernames/${this.authorId}`, options);
    const res = await r.json();
    this.authorName = res["user"]["username"];
  }

  


};
  </script>
  
  <style scoped>
  .comment {
      border: 1px solid #111;
      padding: 20px;
      position: relative;
  }
  </style>
  