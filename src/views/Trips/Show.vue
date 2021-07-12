<template>
  <div class="trips-show" data-role="page">
    <section class="pt-md-10 sec-pb-70 pb-6 bg-light">
      <div class="section-title pt-md-8">
        <!-- {{ isLoading }} -->
        <!-- <div class="spinner-grow text-primary" style="width: 5rem; height: 5rem" role="status" v-if="isLoading">
          <span class="sr-only">Loading...</span>
        </div> -->
        <div v-if="!isLoading">
          <h2>{{ trip.name }}</h2>
          <p>{{ trip.city }} {{ trip.state }}</p>

          <router-link to="/trips/mytrips" class="btn btn-primary">Back to My Trips</router-link>
          &nbsp;
          <router-link :to="`/trips/${trip.id}/edit`" class="btn btn-primary">Edit This Trip</router-link>
          &nbsp;
          <button class="btn btn-primary" v-on:click="destroyTrip()">Delete This Trip</button>
          <br />
          <br />
          <!-- Twitter Share -->
        </div>
        <button
          v-bind:class="{ hidden: isLoading }"
          class="btn btn-outline-primary text-uppercase"
          data-sharer="twitter"
          :data-title="`Checkout my trip named: ${trip.name}`"
          data-hashtags="trip,travel,itinerary"
          :data-url="`https://www.localhost:8080/trips/${this.trip.id}`"
        >
          Share on Twitter
        </button>
      </div>
    </section>
    <!-- MAP LISTING -->
    <div class="map-container bg-light">
      <div id="listing-main-map" class="map-half map-listing-full">
        <!-- Mapbox -->

        <div id="map">
          <div class="container-fluid">
            <div class="d-flex justify-content-center">
              <div
                class="spinner-border text-primary"
                flex-column
                align-items-center
                style="width: 5rem; height: 5rem"
                role="status"
                v-if="isLoading"
              ></div>
            </div>
          </div>
          <br />
          <b><p style="text-align: center">Loading your content, please wait...</p></b>
        </div>
      </div>
    </div>
    <!-- ====================================
———	CATEGORY LIST FULLWIDTH
===================================== -->
    <section class="bg-light py-5">
      <div class="container" v-if="!isLoading">
        <div class="search-result-bar mb-0">
          <div class="ml-md-auto d-flex align-items-center justify-content-between">
            <!-- <div class="select-bg-transparent select-border">
              <select class="select-location">
                <option>Popular</option>
                <option>Nearest</option>
                <option>Recent</option>
              </select>
            </div> -->
            <!-- <div class="icons">
              <a class="mr-2" href="listing-grid-fullwidth.html">
                <i class="fa fa-th" aria-hidden="true"></i>
              </a>
              <a class="active" href="listing-list-fullwidth.html">
                <i class="fa fa-th-list" aria-hidden="true"></i>
              </a>
            </div> -->
          </div>
        </div>
        <br />
        <h3 style="text-align: center">My Saved Businesses</h3>
        <br />
        <br />
        <div v-for="trip_business in trip.trip_businesses" v-bind:key="trip_business.id">
          <div class="card card-list card-listing" data-lat="-33.922125" data-lag="151.159277" data-id="1">
            <div class="row">
              <div class="col-md-4 col-xl-3">
                <div class="card-list-img">
                  <img class="listing-img" :src="trip_business.business.image_url" alt="" />
                </div>
              </div>

              <div class="col-md-8 col-xl-9">
                <div class="card-body p-0">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h3 class="card-title listing-title mb-0">
                      <p>{{ trip_business.business.name }}</p>
                    </h3>
                    <button
                      class="btn-like px-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Favourite this listing"
                    ></button>
                  </div>
                </div>
                <span class="d-block mb-4 listing-address">
                  {{ trip_business.business.location[0] + "," + " " + trip_business.business.location[1] }}
                </span>
                <span class="d-block mb-4 listing-address">
                  <a :href="`${trip_business.business.url}`" target="_blank">Business Link</a>
                </span>
                <span class="d-block mb-4 listing-address">
                  <p>Cost: {{ trip_business.business.cost || "No Cost Listed" }}</p>
                </span>
                <span class="d-block mb-4 listing-address">
                  <p>Phone: {{ trip_business.business.phone || "No Number Listed" }}</p>
                </span>
                <p class="mb-4">My Comments: {{ trip_business.comments }}</p>
                <div>
                  <button
                    v-on:click="trip_business.edit_comments = !trip_business.edit_comments"
                    class="btn btn-primary"
                  >
                    Edit Comments
                  </button>
                  &nbsp;
                  <button v-on:click="removeTripBusinessFromTrip(trip_business)" class="btn btn-primary">
                    Remove Business from Trip
                  </button>
                  <form
                    v-on:submit.prevent="editTripBusinessComments(trip_business)"
                    v-if="trip_business.edit_comments"
                  >
                    <div class="form-group">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <h3 style="text-align: center">My Saved Events</h3>
        <br />
        <br />
        <div v-for="trip_event in trip.trip_events" v-bind:key="trip_event.id">
          <div class="card card-list card-listing" data-lat="-33.922125" data-lag="151.159277" data-id="1">
            <div class="row">
              <div class="col-md-4 col-xl-3">
                <div class="card-list-img">
                  <img class="listing-img" :src="trip_event.event.image_url" alt="" />
                </div>
              </div>

              <div class="col-md-8 col-xl-9">
                <div class="card-body p-0">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h3 class="card-title listing-title mb-0">
                      <p>{{ trip_event.event.name }}</p>
                    </h3>
                    <button
                      class="btn-like px-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Favourite this listing"
                    ></button>
                  </div>
                </div>
                <span class="d-block mb-4 listing-address">
                  {{ trip_event.event.location[0] }}
                </span>
                <!-- <span class="d-block mb-4 listing-address">
                  {{ trip_event.event.time_start | formatDate }}
                </span> -->
                <span class="d-block mb-4 listing-address">
                  <a :href="`${trip_event.event.event_link}`" target="_blank">Event Link</a>
                </span>
                <span class="d-block mb-4 listing-address">
                  <p>$ - {{ trip_event.event.cost || "Free/No Price Listed" }}</p>
                </span>
                <span class="d-block mb-4 listing-address">
                  <p class="mb-4">{{ trip_event.event.description }}</p>
                </span>
                <p class="mb-4">My Comments: {{ trip_event.comments }}</p>
                <button v-on:click="trip_event.edit_comments = !trip_event.edit_comments" class="btn btn-primary">
                  Edit Comments
                </button>
                <!-- <div>
                  <button v-on:click="showEditTripEventComments = !showEditTripEventComments" class="btn btn-primary">
                    Edit Comments
                  </button> -->
                &nbsp;
                <button v-on:click="removeTripEventFromTrip(trip_event)" class="btn btn-primary">
                  Remove Event from Trip
                </button>
                <form v-on:submit.prevent="editTripEventComments(trip_event)" v-if="trip_event.edit_comments">
                  <div class="form-group">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ====================================
———	pagination
===================================== -->
      <!-- <section class="my-5">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item mr-2">
                <a class="page-link" href="javascript:void(0)">
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </a>
              </li>
              <li class="page-item active mr-2"><a class="page-link" href="javascript:void(0)">1</a></li>
              <li class="page-item mr-2"><a class="page-link" href="javascript:void(0)">2</a></li>
              <li class="page-item mr-2"><a class="page-link" href="javascript:void(0)">3</a></li>
              <li class="page-item mr-2"><a class="page-link" href="javascript:void(0)">4</a></li>
              <li class="page-item mr-2"><a class="page-link" href="javascript:void(0)">5</a></li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0)">
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </nav>
        </section> -->
    </section>
  </div>
</template>

<style scoped>
#map {
  width: auto;
  height: 540px;
  margin: auto;
}
.hidden {
  display: none;
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
      isLoading: true,
    };
  },
  mounted: function () {},
  created: function () {
    axios.get(`/trips/${this.$route.params.id}`).then((response) => {
      console.log("Trip object", response.data);
      this.trip = response.data;

      mapboxgl.accessToken =
        "pk.eyJ1IjoiaWJlbGZhdHRvIiwiYSI6ImNrcTExbnl2MjBhaXYyd2sxMnljeWc5aDgifQ.BAOYySyRiLY8iGwyugHqEw";
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/ibelfatto/ckqy2hj0d0rzh17thlbapfkh9", // style URL
        center: [
          this.trip.trip_businesses[0].business.coordinates[1],
          this.trip.trip_businesses[0].business.coordinates[0],
        ], // starting position [lng, lat]
        zoom: 10, // starting zoom
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

      this.isLoading = false;
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
        trip_business.edit_comments = false;
        this.$notify({ type: "success", text: "Comments have been updated!" });
      });
    },
    editTripEventComments: function (trip_event) {
      axios.patch(`/tripevent/${trip_event.id}}`, { comments: trip_event.comments }).then((response) => {
        console.log(response.data);
        trip_event.edit_comments = false;
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
