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
    <p>{{test}}</p>
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
      test: "Paterne"
    };
  },
  async created() {
    // I need to write code here to check if the like is already there when you first load/refresh a page
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const r = await fetch(`/api/freets/likes?=${this.freetId}`, options);
    const re = await fetch(`/api/freets/dislikes?=${this.freetId}`, options);

    const res1 = await r.json();
    const res2 = await re.json();
    this.test = res1;
    for(const l of res1){
      if(l.authorId._id === this.$store.state.userId){
        this.liked = true;
        this.disliked = false;
      }
    }
    if (! this.liked) {
      for (const d of res2) {
      if (d.authorId._id === this.$store.state.userId) {
        this.disliked = true;
        this.liked = false
      }
    }

    }
   
    this.incre = res1.length;
    this.decre = res2.length;
    //*/
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
        //const r = await fetch(`/api/freets/${this.freetId}/comment`, options);*/

        /*const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        };*/
        await fetch(`/api/freets/${this.freetId}/like`, options);
        console.log("freetID adding ", this.freetId);
      }
      /*if (this.disliked) {
        this.disliked = false;
        
        this.decr -= 1;
        
        //Get likeId
        let options = {
             method: "GET",
             headers: {'Content-Type': 'application/json'}
         };
         //console.log("LIKEID");
         let response = await fetch(`/api/freets/${this.freetId}/likeId`, options);
         const likeId = await response.json()
         //console.log("LIKEID",likeId);
         this.test = likeId;
         
         // delete the like
        options = {
             method: "DELETE",
             headers: {'Content-Type': 'application/json'}
         };
         await fetch(`/api/freets/dislikes/${likeId}`, options);
         
      }*/
    },
    async dislikeFreet() {
      /**
       * Dislike this freet
       */
      if (this.disliked) {
        this.disliked = false;
        this.decr -= 1;
        //call delete dislike
        //Get likeId
        let options = {
             method: "GET",
             headers: {'Content-Type': 'application/json'}
         };
         //console.log("LIKEID");
         let response = await fetch(`/api/freets/${this.freetId}/likeId`, options);
         const likeId = await response.json()
         //console.log("LIKEID",likeId);
         this.test = likeId;
         
         // delete the dislike
        options = {
             method: "DELETE",
             headers: {'Content-Type': 'application/json'}
         };
         await fetch(`/api/freets/dislikes/${likeId}`, options);//*/

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
     /*  if (this.liked) {
        this.liked = false;
        this.incre -= 1;
        
        // delete a like

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
         

         
      } */

     
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
