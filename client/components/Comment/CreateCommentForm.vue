<!-- Form for creating comments (block style) -->
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
<script>
/* import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateCommentForm',
  props: ['freetId'],
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/freets/${this.freetId}/comment`,
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      title: 'Create a comment',
      refreshComments: true,
      callback: () => {
        const message = 'Successfully created a comment!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
}; */

export default {
  name: 'CreateCommentForm',
  props: ['freetId'],
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
        return r;
    }
    }
};
</script>

<style scoped>
.contentArea{
    display: flex;
    flex-direction: column;
}
</style>
