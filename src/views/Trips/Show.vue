<template>
  <div class="trips-show">
    <h2>{{ trip.name }}</h2>
    <img :src="trip.image_url" alt="" />
    <p>{{ trip.city }}</p>
    <p>{{ trip.state }}</p>
    <h2>Businesses</h2>
    <div v-for="business in trip.trip_businesses" v-bind:key="business.id">
      <!-- <p>{{ business }}</p> -->
      <h3>Name: {{ business.business.name }}</h3>
      <img :src="business.business.image_url" alt="" />
      <p>Open: {{ business.business.open }}</p>
      <p>Phone: {{ business.business.phone || "No Number Listed" }}</p>
      <p>Phone: {{ business.business.location[0] + "," + " " + business.business.location[1] }}</p>
      <p>My Comments: {{ business.comments }}</p>
    </div>

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
      trip_businesses: {
        business: {},
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
