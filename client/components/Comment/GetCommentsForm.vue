<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetCommentsForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.filter};
  },
  methods: {
    async submit() {
        ///api/freets/comments?freetId=${fields.freetId}
      const url = `/api/freets/comments?freetId=${this.value}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateFilter', this.value);
        this.$store.commit('updateComments', res);
      } catch (e) {
        ///
        // Didn't understand well some parts of the code

         ////
        ///
        if (this.value === this.$store.state.filter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateFilter', null);
          this.value = ''; // Clear filter to show all users' comments
          this.$store.commit('refreshComments');
        } else {
          // Otherwise reset to previous fitler
          this.value = this.$store.state.filter;
          
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
