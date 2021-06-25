<template>
  <div class="trips-index">
    <h1>Create a New Trip</h1>
    <router-link to="/trips">Create</router-link>
    <div v-for="trip in trips" v-bind:key="trip.id">
      <h2>{{ trip.name }}</h2>
      <img :src="trip.image_url" alt="" />
      <p>City: {{ trip.city }}</p>
      <p>State: {{ trip.state }}</p>
      <router-link :to="`/trips/${trip.id}`">More Info</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      trips: [],
    };
  },
  created: function () {
    axios.get("/trips").then((response) => {
      console.log("Trips array", response.data);
      this.trips = response.data;
    });
  },
};
</script>
