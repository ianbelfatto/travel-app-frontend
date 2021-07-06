<template>
  <div class="logout"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    this.$router.push("/");
    this.$notify({ type: "success", text: "You have been logged out." });
  },
};
</script>
