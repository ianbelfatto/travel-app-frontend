<template>
  <div class="users-show">
    <!-- ====================================
———	USER PROFILE
===================================== -->
    <section class="bg-light py-7 py-md-10">
      <div class="container">
        <div class="bg-white rounded shadow mb-8">
          <div class="row">
            <div class="col-sm-4">
              <div>
                <img
                  class="w-100 rounded rounded-md-left"
                  data-src="assets/img/user/profile_user.jpg"
                  :src="user.image_url"
                />
              </div>
            </div>

            <div class="col-sm-8">
              <div class="p-6">
                <h3 class="font-weight-normal mb-0">{{ user.first_name }} {{ user.last_name }}</h3>
                <ul class="list-unstyled mb-5">
                  <li>
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <a href="mailto:info@listy.com">&nbsp;{{ user.email }}</a>
                  </li>
                </ul>
                <button v-on:click="showEditUser = !showEditUser" class="btn btn-primary">Edit Account</button>
                &nbsp;
                <button v-on:click="destroyUser()" class="btn btn-warning">Delete Account</button>
                <!-- Edit User -->
                <form v-on:submit.prevent="editUser()" v-if="showEditUser">
                  <br />
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
                  <input type="submit" class="btn btn-primary" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row"></div>
    </section>
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
          this.$router.push("/signup");
        });
      }
    },
    editUser: function () {
      axios
        .patch(`/users/me`, this.user)
        .then((response) => {
          this.$notify({ type: "success", text: "Successfully edited User!" });
          console.log(response.data);
          this.showEditUser = false;
          this.errors = "";
        })
        .catch((error) => {
          this.$notify({ type: "error", text: "Something went wrong...", title: error });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
