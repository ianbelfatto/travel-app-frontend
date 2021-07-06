<template>
  <div class="trips-show" data-role="page">
    <h1>{{ trip.name }}</h1>
    <!-- Twitter Share -->
    <button
      class="button"
      data-sharer="twitter"
      :data-title="`Checkout my trip named: ${trip.name}`"
      data-hashtags="trip,travel,itinerary,bars,restaurants,coffee"
      :data-url="`https://www.localhost:8080/trips/${this.trip.id}`"
    >
      Share on Twitter
    </button>
    <br />
    <br />
    <!-- <img :src="trip.image_url" alt="" /> -->
    <p>City: {{ trip.city }}</p>
    <p>State: {{ trip.state }}</p>
    <router-link tag="button" to="/trips/mytrips">Back to All Trips</router-link>
    <br />
    <router-link tag="button" :to="`/trips/${trip.id}/edit`">Edit Trip</router-link>
    <br />
    <button v-on:click="destroyTrip()">Delete Trip</button>
    <br />
    <br />
    <!-- Mapbox -->
    <div id="map">Map Page Here</div>
    <!-- Displays Businesses within a Trip -->
    <h2>My Saved Businesses</h2>
    <div v-for="trip_business in trip.trip_businesses" v-bind:key="trip_business.id">
      <p>{{ trip_business.business.coordinates }}</p>
      <h3>Name: {{ trip_business.business.name }}</h3>
      <img :src="trip_business.business.image_url" alt="" />
      <p>Open: {{ trip_business.business.open }}</p>
      <p>Phone: {{ trip_business.business.phone || "No Number Listed" }}</p>
      <p>Location: {{ trip_business.business.location[0] + "," + " " + trip_business.business.location[1] }}</p>
      <p>My Comments: {{ trip_business.comments }}</p>
      <!-- Edit Comments -->
      <button v-on:click="showEditTripBusinessComments = !showEditTripBusinessComments">Edit Comments</button>
      <br />
      <br />
      <form v-on:submit.prevent="editTripBusinessComments(trip_business)" v-if="showEditTripBusinessComments">
        <div class="form-group">
          <label>Edit Your Comments:</label>
          <br />
          <textarea
            type="text"
            class="form-control"
            v-model="trip_business.comments"
            placeholder="Enter some comments about this business"
            rows="4"
            cols="50"
          />
          <br />
          <input type="submit" class="btn btn-primary" value="Submit" />
          <br />
          <br />
        </div>
      </form>
      <!-- Remove a Business from a Trip -->
      <button v-on:click="removeTripBusinessFromTrip(trip_business)">Remove Business from Trip</button>
    </div>
  </div>
</template>

<style scoped>
#map {
  width: 1000px;
  height: 500px;
  margin: auto;
}
</style>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";
export default {
  data: function () {
    return {
      trip: {
        name: "",
      },
      trip_businesses: [],
      placeholder: "Enter some comments",
      showEditTripBusinessComments: false,
      places: [],
    };
  },
  created: function () {
    axios.get(`/trips/${this.$route.params.id}`).then((response) => {
      console.log("Trip object", response.data);
      this.trip = response.data;
      mapboxgl.accessToken =
        "pk.eyJ1IjoiaWJlbGZhdHRvIiwiYSI6ImNrcTExbnl2MjBhaXYyd2sxMnljeWc5aDgifQ.BAOYySyRiLY8iGwyugHqEw";
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [
          this.trip.trip_businesses[0].business.coordinates[1],
          this.trip.trip_businesses[0].business.coordinates[0],
        ], // starting position [lng, lat]
        zoom: 11, // starting zoom
      });

      this.trip.trip_businesses.forEach((place) => {
        // console.log(place.business.coordinates);
        var businessCoords = [place.business.coordinates[1], place.business.coordinates[0]];
        new mapboxgl.Marker({ color: "yellow" }).setLngLat(businessCoords).addTo(map);
      });
      window.Sharer.init();
    });
  },
  // Mapbox
  methods: {
    destroyTrip: function () {
      if (confirm("Are you sure you want to delete this trip?\nClick OK to delete!")) {
        axios.delete(`/trips/${this.trip.id}`).then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Successfully deleted the Trip!" });
          setTimeout(() => {
            this.$router.push("/trips/mytrips");
          }, 1500);
        });
      }
    },
    editTripBusinessComments: function (trip_business) {
      axios.patch(`/tripbusiness/${trip_business.id}}`, { comments: trip_business.comments }).then((response) => {
        console.log(response.data);
        this.$notify({ type: "success", text: "Comments have been updated!" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    },
    removeTripBusinessFromTrip: function (trip_business) {
      if (confirm("Are you sure you want to remove this business from the trip?\nClick OK to remove!")) {
        axios.delete(`/tripbusiness/${trip_business.id}`).then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Business has been successfully removed from this trip." });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    },
  },
};
</script>
