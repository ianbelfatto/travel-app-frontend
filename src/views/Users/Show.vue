<template>
  <div class="users-show">
    <img :src="user.image_url" alt="" />
    <p>First Name: {{ user.first_name }}</p>
    <p>Last Name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
    <button v-on:click="destroyUser()">Delete Account</button>
    <br />
    <button v-on:click="showEditUser = !showEditUser">Edit Account</button>
    <!-- Edit User -->
    <form v-on:submit.prevent="editUser()" v-if="showEditUser">
      <h1>Edit User</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="user.first_name" />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="user.last_name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label>Profile Picture URL:</label>
        <input type="text" class="form-control" v-model="user.image_url" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="user.password" />
      </div>
      <div class="form-group">
        <label>Password Confirmation:</label>
        <input type="password" class="form-control" v-model="user.password_confirmation" />
      </div>
      <br />
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      errors: [],
      showEditUser: false,
    };
  },
  created: function () {
    axios.get(`/users/me`).then((response) => {
      console.log("User object", response.data);
      this.user = response.data;
    });
  },
  methods: {
    destroyUser: function () {
      if (confirm("Are you sure?\nClick OK to delete!")) {
        axios.delete(`/users/me`).then((response) => {
          localStorage.removeItem("jwt");
          localStorage.removeItem("id");
          console.log(response.data);
          this.$notify({ type: "success", text: "Successfully edited User!" });
          setTimeout(() => {
            this.$router.push("/signup");
          }, 1000);
        });
      }
    },
    editUser: function () {
      axios
        .patch(`/users/me`, this.user)
        .then((response) => {
          this.$notify({ type: "success", text: "Successfully edited User!" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log(response.data);
        })
        .catch((error) => {
          this.$notify({ type: "error", text: "Something went wrong...", title: error });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
