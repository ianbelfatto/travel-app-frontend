<template>
  <div class="signup">
    <section class="py-7 py-md-10 bg-light height100vh">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-9 col-xl-7">
            <div class="bg-white p-5 rounded border">
              <h2 class="font-weight-normal mb-4">Account Registration</h2>
              <p>
                Please fill out the fields below to create your account. If you already have an account, please,
                <a :href="`/login`">click here</a>
                .
              </p>

              <form class="py-7" action="#" v-on:submit.prevent="submit()">
                <h3 class="h4 font-weight-normal mb-4">Account Information</h3>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="inputText">First Name*</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                      required
                      v-model="newUserParams.first_name"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputText">Last Name*</label>
                    <input type="text" class="form-control" placeholder="" required v-model="newUserParams.last_name" />
                  </div>
                </div>
                <div class="form-group mb-8">
                  <label for="inputAddress">Email Address*</label>
                  <input type="email" class="form-control" placeholder="" required v-model="newUserParams.email" />
                </div>
                <div class="form-group mb-8">
                  <label for="inputAddress">Profile Picture URL*</label>
                  <input type="email" class="form-control" placeholder="" v-model="newUserParams.image_url" />
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="inputText">Password*</label>
                    <input type="password" class="form-control" placeholder="" v-model="newUserParams.password" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputText">Password Confirmation*</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder=""
                      v-model="newUserParams.password_confirmation"
                    />
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="newUserParams.first_name" />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="newUserParams.last_name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="newUserParams.email" />
      </div>
      <div class="form-group">
        <label>Profile Picture URL:</label>
        <input type="text" class="form-control" v-model="newUserParams.image_url" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="newUserParams.password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="newUserParams.password_confirmation" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form> -->
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
