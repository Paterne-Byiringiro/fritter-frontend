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
    <!-- <p>{{test}}</p> -->
  </div>
</template>

<script>
export default {
  name: "LikeComponent",
  props: ["freetId"],
  data() {
    return {
      liked: false,
      incre: 0,
      test: "Paterne"
    };
  },
  async created() {
    // I need to write code here to check if the like is already there when you first load/refresh a page
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    console.log(`freet ID fetching: ${this.freetId}`)
    const r = await fetch(`/api/freets/likes/${this.freetId}`, options);

    const res = await r.json();
    console.log("this is res", res)
    this.test = res[0];
    console.log(`store username: ${this.$store.state.username}`)
    for(const l of res){
      if(l.authorId.username === this.$store.state.username){
        console.log("Yesssss")
        this.liked = true;
      }
    }
    this.incre = res.length;
    this.test = res;
  
  },
  methods: {
    async likeFreet() {
      /**
       * Like this freet
       */
      console.log("this.liked",this.liked);
      if (this.liked) {

        this.liked = false;
        this.incre -= 1;
        //get the likeId
        let options = {
             method: "GET",
             headers: {'Content-Type': 'application/json'}
         };
         console.log("LIKEID");
         let response = await fetch(`/api/freets/${this.freetId}/likeId`, options);
         const likeId = await response.json()
         console.log("LIKEID",likeId);
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
        console.log("freetID", this.freetId);

        const options = {
            method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({freetId: this.freetId, dislike: false})
        };

        await fetch(`/api/freets/${this.freetId}/like`, options);
        console.log("freetID adding ", this.freetId);
      }
      
    }
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
