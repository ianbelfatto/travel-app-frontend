<template>
  <div class="users-show">
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
        <input type="text" class="form-control" v-model="editUserParams.first_name" />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="editUserParams.last_name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="editUserParams.email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="editUserParams.password" />
      </div>
      <div class="form-group">
        <label>Password Confirmation:</label>
        <input type="password" class="form-control" v-model="editUserParams.password_confirmation" />
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
      editUserParams: {},
      errors: [],
      showEditUser: false,
    };
  },
  created: function () {
    axios.all([
      axios.get(`/users/${this.$route.params.id}`).then((response) => {
        console.log("User object", response.data);
        this.user = response.data;
      }),
      axios.get(`/users/${this.$route.params.id}`).then((response) => {
        console.log("User object", response.data);
        this.editUserParams = response.data;
      }),
    ]);
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
    editUser: function () {
      axios
        .patch(`/users/${this.editUserParams.id}`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
