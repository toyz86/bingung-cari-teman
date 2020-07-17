<template>
  <section class="container">
    <b-row>
      <b-form-input class="mb-3" placeholder="Cari"></b-form-input>
      <b-table id="my-table" 
        :fields="fields" 
        :items="comments" 
        :per-page="perPage" 
        :current-page="currentPage">
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table">
      </b-pagination>
    </b-row>
  </section>
</template>

<script>

import axios from 'axios'

let dataItems = axios.get("https://jsonplaceholder.typicode.com/comments")
console.log(dataItems);

export default {
  data () {
    return {
      comments: [],
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id' },
        { key: 'name' },
        { key: 'email' },
        { key: 'body' },
      ]
    }
  },
  mounted () {
      axios.get("https://jsonplaceholder.typicode.com/comments")
      .then(response => (this.comments = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true
      })    
  },

  computed: {
    rows() {
      return this.comments.length
      console.log(comments.length)
    },
  },
}
</script>
