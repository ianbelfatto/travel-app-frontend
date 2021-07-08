<template>
  <div class="trips-show" data-role="page">
    <h1>{{ trip.name }}</h1>
    <p>{{ trip.city }}, {{ trip.state }}</p>
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
      <!-- <p>{{ trip_business.business.coordinates }}</p> -->
      <h3>Name: {{ trip_business.business.name }}</h3>
      <img :src="trip_business.business.image_url" alt="" />
      <p>Open: {{ trip_business.business.open | yesno }}</p>
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
    <!-- Displays Events within a Trip -->
    <h2>My Saved Events</h2>
    <div v-for="trip_event in trip.trip_events" v-bind:key="trip_event.id">
      <h3>Name: {{ trip_event.event.name }}</h3>
      <img :src="trip_event.event.image_url" alt="" />
      <br />
      <a :href="`${trip_event.event.event_link}`">Event Link</a>
      <p>$ - {{ trip_event.event.cost || "Free/No Price Listed" }}</p>
      <p>{{ trip_event.event.description }}</p>
      <p>{{ trip_event.event.location[0] }}</p>
      <p>My Comments: {{ trip_event.comments }}</p>
      <!-- Edit Comments -->
      <button v-on:click="showEditTripEventComments = !showEditTripEventComments">Edit Comments</button>
      <br />
      <br />
      <form v-on:submit.prevent="editTripEventComments(trip_event)" v-if="showEditTripEventComments">
        <div class="form-group">
          <label>Edit Your Comments:</label>
          <br />
          <textarea
            type="text"
            class="form-control"
            v-model="trip_event.comments"
            placeholder="Enter some comments about this event"
            rows="4"
            cols="50"
          />
          <br />
          <input type="submit" class="btn btn-primary" value="Submit" />
          <br />
          <br />
        </div>
      </form>
      <!-- Remove an Event from a Trip -->
      <button v-on:click="removeTripEventFromTrip(trip_event)">Remove Event from Trip</button>
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
      trip_events: [],
      placeholder: "Enter some comments",
      showEditTripBusinessComments: false,
      showEditTripEventComments: false,
      currentTripBusiness: {},
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
        style: "mapbox://styles/ibelfatto/ckqv41u360am217nyjrxl4gjl", // style URL
        center: [
          this.trip.trip_businesses[0].business.coordinates[1],
          this.trip.trip_businesses[0].business.coordinates[0],
        ], // starting position [lng, lat]
        zoom: 11, // starting zoom
        interactive: true,
      });

      this.trip.trip_businesses.forEach((place) => {
        // console.log(place.business.coordinates);
        var businessCoords = [place.business.coordinates[1], place.business.coordinates[0]];
        var businessDetails = ["Name: " + place.business.name + " " + "Location: " + place.business.location];
        var businessDetailsPopup = new mapboxgl.Popup({ offset: 25 }).setText(businessDetails).addTo(map);
        new mapboxgl.Marker({ color: "yellow" }).setLngLat(businessCoords).setPopup(businessDetailsPopup).addTo(map);
        // console.log("place", place.business.name);
      });

      this.trip.trip_events.forEach((place) => {
        // console.log(place.business.coordinates);
        var eventCoords = [place.event.coordinates[1], place.event.coordinates[0]];
        var eventDetails = ["Name: " + place.event.name + " " + "Location: " + place.event.location];
        var eventDetailsPopup = new mapboxgl.Popup({ offset: 25 }).setText(eventDetails).addTo(map);
        new mapboxgl.Marker({ color: "blue" }).setLngLat(eventCoords).setPopup(eventDetailsPopup).addTo(map);
        // console.log("place", place.business.name);
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
          this.$router.push("/trips/mytrips");
        });
      }
    },
    editTripBusinessComments: function (trip_business) {
      axios.patch(`/tripbusiness/${trip_business.id}}`, { comments: trip_business.comments }).then((response) => {
        console.log(response.data);
        this.showEditTripBusinessComments = false;
        this.$notify({ type: "success", text: "Comments have been updated!" });
      });
    },
    editTripEventComments: function (trip_event) {
      axios.patch(`/tripevent/${trip_event.id}}`, { comments: trip_event.comments }).then((response) => {
        console.log(response.data);
        this.showEditTripEventComments = false;
        this.$notify({ type: "success", text: "Comments have been updated!" });
      });
    },
    removeTripBusinessFromTrip: function (trip_business) {
      if (confirm("Are you sure you want to remove this business from the trip?\nClick OK to remove!")) {
        axios.delete(`/tripbusiness/${trip_business.id}`).then((response) => {
          console.log(response.data);
          var index = this.trip.trip_businesses.indexOf(trip_business);
          this.trip.trip_businesses.splice(index, 1);
          this.$notify({ type: "success", text: "Business has been successfully removed from this trip." });
        });
      }
    },
    removeTripEventFromTrip: function (trip_event) {
      if (confirm("Are you sure you want to remove this event from the trip?\nClick OK to remove!")) {
        axios.delete(`/tripevent/${trip_event.id}`).then((response) => {
          console.log(response.data);
          var index = this.trip.trip_events.indexOf(trip_event);
          this.trip.trip_events.splice(index, 1);
          this.$notify({ type: "success", text: "Event has been successfully removed from this trip." });
        });
      }
    },
  },
};
</script>
