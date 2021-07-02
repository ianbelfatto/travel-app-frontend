<template>
  <div class="users-show">
    <p>First Name: {{ user.first_name }}</p>
    <p>Last Name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
    <button v-on:click="destroyUser()">Delete Account</button>
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
      console.log("User object", response.data);
      this.user = response.data;
    });
  },
  methods: {
    destroyUser: function () {
      if (confirm("Are you sure?\nClick OK to delete!")) {
        axios.delete(`/users/${this.user.id}`).then((response) => {
          localStorage.removeItem("jwt");
          localStorage.removeItem("id");
          console.log(response.data);
          this.$router.push("/signup");
        });
      }
    },
  },
};
</script>
