<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetFreetsForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.filter};
  },
  methods: {
    async submit() {
      const url = this.value ? `/api/freets?author=${this.value}` : '/api/freets';
      //const url2 = '/api/freets/likes'
      try {
        const r = await fetch(url);
        //const r2 = await fetch(url2);
        const res = await r.json();
        //const likes = await r2.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateFilter', this.value);
        this.$store.commit('updateFreets', res);
        //this.$store.commit('updateLikes', likes);
      } catch (e) {
        if (this.value === this.$store.state.filter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateFilter', null);
          this.value = ''; // Clear filter to show all users' freets
          this.$store.commit('refreshFreets');
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
