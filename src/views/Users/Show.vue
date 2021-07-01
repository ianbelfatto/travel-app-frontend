<template>
  <div class="users-show">
    <p>First Name: {{ user.first_name }}</p>
    <p>Last Name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
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
};
</script>
