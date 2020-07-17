<template>
  <section class="container">
    <b-row>
      <!-- di sini section filter -->
      <b-row class="mb-3" align-h="between">  
        <b-col cols="4" class="inputFind">
          <b-form-input v-model="keyword" placeholder="Cari" type="text"></b-form-input>
        </b-col>
        <b-col class="d-flex align-items-center" cols="2">
          <div class="mr-2">Tampilkan</div>
          <b-form-select
            :options="[{text:10,value:10},{text:25,value:25},{text:50,value:50},{text:100,value:100}]" 
            v-model="perPage">
          </b-form-select>
        </b-col>
      </b-row>
      
      <!-- di sini bagian table body -->
      <b-table id="my-table"  
        :fields="fields"
        :items="search"
        :keyword="keyword"
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

// let dataItems = axios.get("https://jsonplaceholder.typicode.com/comments")
// console.log(dataItems);

export default {
  data () {
    return {
      comments: [],
      perPage: 10,
      keyword: '',
      currentPage: 1,
      fields: [
        { key: 'id', label: 'No.' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'body', label: 'About' },
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
    search () {
      return this.comments.filter(item => {
        return item.name.includes(this.keyword)
      })
    }    
  },
}
</script>
