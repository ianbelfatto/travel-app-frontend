<template>
  <div class="businesses-index">
    <section class="pt-md-10 sec-pb-70 pb-6 bg-light">
      <div class="section-title pt-md-8">
        <h1>Search for Businesses:</h1>
        Term:
        <input type="text" v-model="term" class="form-control" />
        <br />
        Location:
        <input type="text" v-model="location" class="form-control" />
        <br />
        <button v-on:click="runSearch()" class="btn btn-primary">Search</button>
      </div>
    </section>
    <!-- BUSINESS SEARCH RESULTS -->
    <section class="bg-light py-5">
      <div class="container">
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
        <div v-for="business in businesses" v-bind:key="business.id">
          <div class="card card-list card-listing" data-lat="-33.922125" data-lag="151.159277" data-id="1">
            <div class="row">
              <div class="col-md-4 col-xl-3">
                <div class="card-list-img">
                  <img class="listing-img" :src="business.image_url" alt="" />
                </div>
              </div>

              <div class="col-md-8 col-xl-9">
                <div class="card-body p-0">
                  <ul class="list-inline list-inline-rating">
                    <li class="list-inline-item">
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li class="list-inline-item">
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li class="list-inline-item">
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li class="list-inline-item">
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li class="list-inline-item">
                      <i class="far fa-star" aria-hidden="true"></i>
                    </li>
                  </ul>

                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h3 class="card-title listing-title mb-0">
                      <p>{{ business.name }}</p>
                    </h3>
                    <button
                      class="btn-like px-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Favourite this listing"
                    >
                      <i class="far fa-heart text-primary" aria-hidden="true"></i>
                      <span>8 k</span>
                    </button>
                  </div>
                </div>
                <span class="d-block mb-4 listing-address">
                  {{ business.location.display_address[0] + "," + " " + business.location.display_address[1] }}
                </span>
                <span class="d-block mb-4 listing-address">
                  <p>Open: {{ business.is_closed }}</p>
                </span>
                <span class="d-block mb-4 listing-address">
                  <p>Phone: {{ business.display_phone || "No Number Listed" }}</p>
                </span>
                <span>
                  <div v-for="trip in trips" v-bind:key="trip.id">
                    <i>{{ trip.name }}</i>
                    <br />
                    <button @click="addBusinessToTrip(trip, business)" class="btn btn-primary">Add to This Trip</button>
                  </div>
                </span>
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
      businesses: [],
      currentBusiness: {},
      term: "",
      location: "",
    };
  },
  created: function () {
    axios.all([
      // axios.get(`/businesses/${this.$route.params.yelp_business_id}`).then((response) => {
      //   console.log("business object", response.data);
      //   this.business = response.data;
      // }),
      axios.get("/trips").then((response) => {
        console.log("Trips array", response.data);
        this.trips = response.data;
      }),
    ]);
  },
  methods: {
    runSearch: function () {
      axios.get(`/businesses?terms=${this.term}&location=${this.location}`).then((response) => {
        console.log("Businesses array", response.data);
        this.businesses = response.data;
      });
    },
    addBusinessToTrip: function (trip, business) {
      const formData = new FormData();
      formData.append("trip_id", trip.id);
      formData.append("yelp_business_id", business.id);
      axios
        .post("/tripbusiness", formData)
        .then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Business has been added to the trip!" });
          // setTimeout(() => {
          //   this.$router.push(`/trips/${trip.id}`);
          // }, 2000);
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            text: "Something went wrong...Business already exists in this trip.",
            title: error,
          });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
