<template>
  <div class="trips-edit">
    <section class="py-7 py-md-10 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="container-fluid">
              <div class="d-flex justify-content-center">
                <!-- LOADING CIRCLE -->
                <!-- <div
                  class="spinner-border text-primary"
                  flex-column
                  align-items-center
                  style="width: 5rem; height: 5rem"
                  role="status"
                  v-if="isLoading"
                ></div> -->
              </div>
              <!-- LOADING CIRCLE TEXT -->
              <!-- <div v-if="isLoading">
                <br />
                <b><p style="text-align: center">Loading your content, please wait...</p></b>
              </div> -->
            </div>

            <div>
              <div class="card">
                <div class="bg-primary text-center py-4">
                  <h2 class="text-white mb-0 h4">Edit Trip</h2>
                </div>
                <div class="card-body px-7 pt-7 pb-0">
                  <form v-on:submit.prevent="editTrip()">
                    <ul>
                      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                    <div class="form-group mb-7">
                      <label for="exampleInputText">Name*</label>
                      <input
                        type="text"
                        class="form-control"
                        aria-describedby="emailHelp"
                        required
                        v-model="editTripParams.name"
                      />
                      <em>Enter a new name for this trip.</em>
                    </div>
                    <div class="form-group mb-7">
                      <label for="exampleInputPassword1">City*</label>
                      <input type="text" class="form-control" v-model="editTripParams.city" />
                      <em>Enter a new city for this trip.</em>
                    </div>
                    <div class="form-group mb-7">
                      <label for="exampleInputPassword1">State*</label>
                      <input type="text" class="form-control" v-model="editTripParams.state" />
                      <em>Enter a new state for this trip.</em>
                    </div>
                    <div class="form-group mb-7">
                      <label for="exampleInputPassword1">Cover Image*</label>
                      <input type="text" class="form-control" v-model="editTripParams.image_url" />
                      <em>Enter a new Cover Image URL for this trip.</em>
                    </div>
                    <div class="form-group d-flex justify-content-between align-items-center mb-7">
                      <router-link :to="`/trips/mytrips`" class="btn btn-secondary">Back to My Trips</router-link>
                      &nbsp;
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </form>
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
      editTripParams: {},
      errors: [],
      isLoading: true,
    };
  },
  created: function () {
    axios.get(`/trips/${this.$route.params.id}?q=edit`).then((response) => {
      console.log("Trips Object", response.data);
      this.editTripParams = response.data;
      console.log(this.editTripParams);

      this.isLoading = false;
    });
  },
  methods: {
    editTrip: function () {
      axios
        .patch(`/trips/${this.editTripParams.id}`, this.editTripParams)
        .then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Successfully edited the Trip!" });
          this.$router.push(`/trips/mytrips`);
        })
        .catch((error) => {
          this.$notify({ type: "error", text: "Something went wrong...", title: error });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
