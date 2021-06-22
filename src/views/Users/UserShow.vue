<template>
  <div class="users-show">
    <h2>{{ user.name }}</h2>
    <img v-bind:src="user.url" v-bind:alt="user.name" />
    <p>Width: {{ user.width }}</p>
    <p>Height: {{ user.height }}</p>
    <router-link to="/users">Back to all users</router-link>
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
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("users show", response);
      this.user = response.data;
    });
  },
  methods: {},
};
</script>
