<template>
  <div class="login">
    <!-- LOGIN PAGE -->
    <section class="py-7 py-md-10 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card">
              <div class="bg-primary text-center py-4">
                <h2 class="text-white mb-0 h4">Members Log In</h2>
              </div>
              <div class="card-body px-7 pt-7 pb-0">
                <form v-on:submit.prevent="submit()">
                  <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                  </ul>
                  <div class="form-group mb-7">
                    <label for="exampleInputText">Email*</label>
                    <input type="text" class="form-control" aria-describedby="emailHelp" required v-model="email" />
                    <em>Enter your email.</em>
                  </div>
                  <div class="form-group mb-7">
                    <label for="exampleInputPassword1">Password*</label>
                    <input type="password" class="form-control" v-model="password" />
                    <em>Enter the password that accompanies your email.</em>
                  </div>
                  <div class="form-group d-flex justify-content-between align-items-center mb-7">
                    <button type="submit" class="btn btn-outline-primary text-uppercase">Log in</button>
                  </div>
                </form>
              </div>
              <div class="card-footer bg-transparent text-center py-3">
                <p class="mb-0">
                  Not a member yet?
                  <a :href="`/signup`" class="link">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("id", response.data.user_id);
          this.$router.push("/trips/mytrips");
          this.$notify({ type: "success", text: "You have been logged in." });
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.$notify({ type: "error", text: "Something went wrong...", title: error });
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
