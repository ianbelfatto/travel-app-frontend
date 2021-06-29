<template>
  <div class="users-show">
    <!-- <h2>{{ user }}</h2> -->
    <!-- <img v-bind:src="user.url" v-bind:alt="user.name" /> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("user show", response.data);
      this.user = response.data;
    });
  },
};
</script>
