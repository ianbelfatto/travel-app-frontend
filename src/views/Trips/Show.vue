<template>
  <div class="trips-show">
    <h2>{{ trip.name }}</h2>
    <img :src="trip.image_url" alt="" />
    <p>{{ trip.city }}</p>
    <p>{{ trip.state }}</p>
    <div v-for="trip_business in trip_businesses" v-bind:key="trip_business.id">
      <p>Restaurants: {{ trip.trip_businesses[0].business }}</p>
      <p>Restaurants: {{ trip.trip_business.name }}</p>
    </div>
    <router-link to="/trips">All Trips</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      trip: { user: {} },
    };
  },
  created: function () {
    axios.get(`/trips/${this.$route.params.id}`).then((response) => {
      console.log("Trip object", response.data);
      this.trip = response.data;
    });
  },
};
</script>
