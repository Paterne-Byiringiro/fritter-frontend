<!-- Reusable component representing a single like and its actions -->

<template>
  <div>
    <!-- <p>{{this.$store.state.likes}}</p>-->
    <button class="likeAndDislike" v-if="!liked" @click="likeFreet">
      <font-awesome-icon icon="fa-regular fa-thumbs-up" /> {{ incre }}
    </button>

    <button class="likeAndDislike" v-if="liked" @click="likeFreet">
      <font-awesome-icon icon="fa-solid fa-thumbs-up" /> {{ incre }}
    </button>

    <button class="likeAndDislike" v-if="!disliked" @click="dislikeFreet">
      <font-awesome-icon icon="fa-regular fa-thumbs-down" /> {{ decr }}
    </button>
    <button class="likeAndDislike" v-if="disliked" @click="dislikeFreet">
      <font-awesome-icon icon="fa-solid fa-thumbs-down" /> {{ decr }}
    </button>
  </div>
</template>

<script>
export default {
  name: "LikeComponent",
  props: ["freetId"],
  data() {
    return {
      liked: false,
      disliked: false,
      incre: 0,
      decr: 0,
      test: ""
    };
  },
  async created() {
    // I need to write code here to check if the like is already there when you first load/refresh a page
    /*const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const r = await fetch(`/api/freets/likes/freets/${this.freetId}`, options);
    const re = await fetch(`/api/freets/dislikes/freets/${this.freetId}`, options);

    const res1 = await r.json();
    const res2 = await re.json();
    for(const l of res.likes){
      if(l.userId === this.$store.state.userId){
        this.liked = true;
      }
    }
    this.incre = res1.likes.length;
    this.decre = res2.dislikes.length;*/
  },
  methods: {
    async likeFreet() {
      /**
       * Like this freet
       */
      if (this.liked) {
        this.liked = false;
        this.incre -= 1;
        //get the likeId
        let options = {
             method: "GET",
             headers: {'Content-Type': 'application/json'}
         };
         let likeId = await fetch(`/api/freets/${this.freetId}/likeId`, options);
         this.test = likeId;
         // delete the like
        options = {
             method: "DELETE",
             headers: {'Content-Type': 'application/json'}
         };
         await fetch(`/api/freets/likes/${likeId}`, options);
      } else {
        this.liked = true;
        this.incre += 1;
        const options = {
            method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({freetId: this.freetId, dislike: false})
        };
        //const r = await fetch(`/api/freets/${this.freetId}/comment`, options);*/

        /*const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        };*/
        await fetch(`/api/freets/${this.freetId}/like`, options);
      }
      if (this.disliked) {
        this.disliked = false;
        this.decr -= 1;
      }
    },
    async dislikeFreet() {
      /**
       * Dislike this freet
       */
      if (this.disliked) {
        this.disliked = false;
        this.decr -= 1;
        //call delete dislike

        //(can do same thing I did on like)
      } else {
        this.disliked = true;
        this.decr += 1;
        //post a dislike
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        };
        await fetch(`/api/freets/${this.freetId}/dislike`, options);
      }
      if (this.liked) {
        this.liked = false;
        this.incre -= 1;
        // delte a like
      }
     
    },
  },
};
</script>

<style scoped>
@import "/components/globalCss.css";
.likeAndDislike {
  background-color: transparent;
  border: none;
  font-size: 20px;
  margin: 5px;
}
</style>
