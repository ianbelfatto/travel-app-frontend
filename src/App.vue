<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home &nbsp;</router-link>

      <!-- <router-link to="/about">About</router-link> -->

      <router-link to="/signup" v-if="!isLoggedIn()">Signup &nbsp;</router-link>

      <router-link to="/login" v-if="!isLoggedIn()">Login &nbsp;</router-link>

      <router-link to="/trips/mytrips" v-if="isLoggedIn()">Trips &nbsp;</router-link>

      <router-link :to="`/users/me`" v-if="isLoggedIn()">User &nbsp;</router-link>

      <router-link to="/logout" v-if="isLoggedIn()">Logout &nbsp;</router-link>

      <router-link to="/businesses" v-if="isLoggedIn()">Search for a Business</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserID: function () {
      return localStorage.getItem("id");
    },
  },
};
</script>

create method to retrieve id from localstorage, call method in nav bar
