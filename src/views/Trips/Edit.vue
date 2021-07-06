<template>
  <div class="trips-edit">
    <form v-on:submit.prevent="editTrip()">
      <h1>Edit Trip</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="editTripParams.name" />
      </div>
      <div class="form-group">
        <label>City:</label>
        <input type="text" class="form-control" v-model="editTripParams.city" />
      </div>
      <div class="form-group">
        <label>State:</label>
        <input type="text" class="form-control" v-model="editTripParams.state" />
      </div>
      <div class="form-group">
        <label>Cover Image:</label>
        <input type="text" class="form-control" v-model="editTripParams.image_url" />
      </div>
      <br />
      <router-link :to="`/trips/${editTripParams.id}`" tag="button">Back to Current Trip</router-link>
      |
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <br />
    editTripParams: {{ editTripParams }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      editTripParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/trips/${this.$route.params.id}`).then((response) => {
      console.log("Trips Object", response.data);
      this.editTripParams = response.data;
    });
  },
  methods: {
    editTrip: function () {
      axios
        .patch(`/trips/${this.editTripParams.id}`, this.editTripParams)
        .then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Successfully edited the Trip!" });
          this.$router.push(`/trips/${response.data.id}`);
        })
        .catch((error) => {
          this.$notify({ type: "error", text: "Something went wrong...", title: error });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
