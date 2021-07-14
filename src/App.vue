<template>
  <div id="app">
    <div class="main-wrapper">
      <!-- HEADER -->
      <header class="header">
        <nav class="nav-menuzord navbar-sticky">
          <div class="container clearfix">
            <div id="menuzord" class="menuzord menuzord-responsive">
              <!-- WEBSITE IMAGE IN NAVBAR -->
              <a :href="`/`" class="menuzord-brand">
                <img src="/assets/img/logo-plnnr-3.png" alt="" />
              </a>
              <ul class="menuzord-menu menuzord-right">
                <li class="active">
                  <router-link to="/" v-if="!isLoggedIn()">Home</router-link>
                </li>
                <li class="active">
                  <router-link to="/trips/mytrips" v-if="isLoggedIn()">&#128506; &nbsp; &nbsp;Trips</router-link>
                </li>
                <li class="active">
                  <router-link to="/signup" v-if="!isLoggedIn()">Signup</router-link>
                </li>
                <li class="active">
                  <router-link to="/login" v-if="!isLoggedIn()">Login</router-link>
                </li>
                <li class="active">
                  <router-link to="/businesses" v-if="isLoggedIn()">
                    &#128270; &nbsp; &nbsp; Search Businesses
                  </router-link>
                </li>
                <li class="active">
                  <router-link to="/events" v-if="isLoggedIn()">&#128270; &nbsp; &nbsp; Search Events</router-link>
                </li>
                <li class="active">
                  <router-link :to="`/users/me`" v-if="isLoggedIn()">&#128100; &nbsp; &nbsp;User</router-link>
                </li>
                <li class="active">
                  <router-link to="/logout" v-if="isLoggedIn()">&#128075; &nbsp; &nbsp;Logout</router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <!-- ROUTER VIEW -->

      <router-view />
      <notifications position="bottom right" />

      <!-- FOOTER -->
      <footer class="pt-7 pt-md-8 bg-white">
        <div class="container">
          <!-- <hr /> -->
          <div class="row">
            <div class="col-sm-7 col-xs-12">
              <a class="d-inline-block mb-6" :href="`/`">
                <img src="/assets/img/plnnr-ftr-2.png" alt="" style="opacity: 0.7" />
              </a>
              <p class="text-muted pt-1 pb-3">
                PLNNR was developed by Ian Belfatto as part of the Actualize Coding Bootcamp. PLNNR is built on a Rails
                backend, and a Vue.js frontend with Bootstrap, HTML, CSS, SCSS, and Javascript elements. PLNNR was also
                built using YELP Fusion API, Mapbox GL JS, axios, moment.js,sharer.js, and vue-notifications.
              </p>
              <ul class="list-unstyled text-muted">
                <li class="mb-3">
                  <i class="fas fa-envelope mr-3" aria-hidden="true"></i>
                  <a class="text-muted" href="mailto:ibelfatto@gmail.com">ibelfatto@gmail.com</a>
                </li>
                <li class="mb-3">
                  <i class="fab fa-github" aria-hidden="true"></i>
                  &nbsp; &nbsp;
                  <a class="text-muted" href="https://github.com/ianbelfatto" target="_blank">github.com/ianbelfatto</a>
                </li>
                <li class="mb-3">
                  <i class="fas fa-splotch" aria-hidden="true"></i>
                  &nbsp; &nbsp;
                  <a class="text-muted" href="https://www.ianbelfatto.com" target="_blank">www.ianbelfatto.com</a>
                </li>
              </ul>
            </div>
          </div>

          <hr />

          <div class="row pb-md-6">
            <div class="col-sm-7 col-xs-12 align-self-center order-3 order-md-0">
              <p class="copy-right mb-0 pb-4 pb-md-0">
                Copyright &copy;
                <span id="copy-year"></span>
                . All Rights Reserved by
                <a href="http://www.ianbelfatto.com/" target="_blank">Ian Belfatto</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style></style>

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
