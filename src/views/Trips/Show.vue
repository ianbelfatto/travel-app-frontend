<template>
  <div class="trips-show">
    <h2>{{ trip.name }}</h2>
    <img :src="trip.image_url" alt="" />
    <p>{{ trip.city }}</p>
    <p>{{ trip.state }}</p>
    <router-link tag="button" to="/trips/mytrips">All Trips</router-link>
    <br />
    <router-link tag="button" :to="`/trips/${trip.id}/edit`">Edit Trip</router-link>
    <br />
    <button v-on:click="destroyTrip()">Delete Trip</button>
    <!-- Displays Businesses within a Trip -->
    <h2>My Saved Businesses</h2>
    <div v-for="trip_business in trip.trip_businesses" v-bind:key="trip_business.id">
      <h3>Name: {{ trip_business.business.name }}</h3>
      <img :src="trip_business.business.image_url" alt="" />
      <p>Open: {{ trip_business.business.open }}</p>
      <p>Phone: {{ trip_business.business.phone || "No Number Listed" }}</p>
      <p>Phone: {{ trip_business.business.location[0] + "," + " " + trip_business.business.location[1] }}</p>
      <p>My Comments: {{ trip_business.comments }}</p>
      <!-- Edit Comments -->
      <form v-on:submit.prevent="editTripBusinessComments(trip_business)">
        <div class="form-group">
          <label>Comments:</label>
          <input type="text" class="form-control" v-model="trip_business.comments" :placeholder="placeholder" />
          |
          <input type="submit" class="btn btn-primary" value="Submit" />
        </div>
      </form>
      <br />
      <!-- Remove a Business from a Trip -->
      <button v-on:click="removeTripBusinessFromTrip(trip_business)">Remove Business from Trip</button>
    </div>
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
      trip_businesses: [],
      placeholder: "Enter some comments",
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
    editTripBusinessComments: function (trip_business) {
      axios.patch(`/tripbusiness/${trip_business.id}}`, { comments: trip_business.comments }).then((response) => {
        console.log(response.data);
      });
    },
    removeTripBusinessFromTrip: function (trip_business) {
      if (confirm("Are you sure you want to remove this business from the trip?\nClick OK to delete!")) {
        axios.delete(`/tripbusiness/${trip_business.id}`).then((response) => {
          console.log(response.data);
          window.location.reload();
        });
      }
    },
  },
};
</script>
