<template>
  <div class="trips-index">
    <section class="pt-md-10 sec-pb-70 pb-6 bg-white">
      <!-- CREATE A TRIP -->
      <div class="section-title pt-md-8">
        <h1>
          Create a New Trip &nbsp;

          <router-link to="/trips" class="btn btn-success btn-sm">
            <i class="fas fa-plus"></i>
          </router-link>
        </h1>
        <!-- <br />
        <br />
        <router-link to="/trips" class="btn btn-primary">Create</router-link> -->
      </div>
    </section>
    <section class="bg-light py-5">
      <div class="container">
        <!-- USER TRIPS -->
        <h2 style="text-align: center">My Trips</h2>
        <div class="search-result-bar mb-0">
          <div class="ml-md-auto d-flex align-items-center justify-content-between"></div>
        </div>

        <div v-for="trip in trips" v-bind:key="trip.id">
          <div class="card card-list card-listing" data-lat="-33.922125" data-lag="151.159277" data-id="1">
            <div class="row">
              <div class="col-md-4 col-xl-3">
                <div class="card-list-img">
                  <router-link :to="`/trips/${trip.id}`">
                    <img class="listing-img" :src="trip.image_url" alt="" />
                  </router-link>
                </div>
              </div>

              <div class="col-md-8 col-xl-9">
                <div class="card-body p-0">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h3 class="card-title listing-title mb-0">
                      <h4>
                        {{ trip.name }}
                      </h4>
                    </h3>
                    <button
                      class="btn-like px-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Favourite this listing"
                    ></button>
                  </div>
                  <span class="d-block mb-4 listing-address">City: {{ trip.city }}</span>
                  <span class="d-block mb-4 listing-address">State: {{ trip.state }}</span>
                  <br />
                  <div v-if="trip.trip_businesses.length > 0">
                    <router-link :to="`/trips/${trip.id}`" class="btn btn-primary btn-sm">More Info</router-link>
                    &nbsp;
                    <router-link :to="`/trips/${trip.id}/edit`" class="btn btn-primary btn-sm">
                      Edit This Trip
                    </router-link>
                  </div>
                  <div v-else>
                    <h6>Add a Business or Edit Your Trip:</h6>
                    <router-link :to="`/businesses`" class="btn btn-warning btn-sm">Business</router-link>
                    &nbsp;
                    <router-link :to="`/trips/${trip.id}/edit`" class="btn btn-primary btn-sm">
                      Edit This Trip
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
