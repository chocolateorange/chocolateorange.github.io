<template>
  <div>
    <h1>{{ meta.title }}</h1>
    <div v-html="body" />
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    async asyncData(context) {
      const {
        route,
      } = context;

      const {
        data,
      } = await axios.get(`http://localhost:3000/api/${route.fullPath}.md`)

      return data;
    },
  }
</script>
