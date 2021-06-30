<template>
  <div class="trips-show">
    <h2>{{ trip.name }}</h2>
    <img :src="trip.image_url" alt="" />
    <p>{{ trip.city }}</p>
    <p>{{ trip.state }}</p>
    <!-- <p>{{ trip.trip_businesses[0].business.name }}</p> -->
    <!-- <div v-for="trip_business in trip_businesses" v-bind:key="trip_business.id">
      <p>Restaurants: {{ trip.trip_businesses[0].business }}</p>
      <p>Restaurants: {{ trip.trip_business.name }}</p>
    </div> -->
    <router-link tag="button" to="/trips/mytrips">All Trips</router-link>
    <br />
    <router-link tag="button" :to="`/trips/${trip.id}/edit`">Edit Trip</router-link>
    <br />
    <button v-on:click="destroyTrip()">Delete Trip</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      trip: {
        name: "",
      },
    };
  },
  created: function () {
    axios.get(`/trips/${this.$route.params.id}`).then((response) => {
      console.log("Trip object", response.data);
      this.trip = response.data;
    });
  },
  methods: {
    destroyTrip: function () {
      if (confirm("Are you sure?\nClick OK to delete!")) {
        axios.delete(`/trips/${this.trip.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/trips/mytrips");
        });
      }
    },
  },
};
</script>
