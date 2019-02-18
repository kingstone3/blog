<template lang='pug'>
  div
    div
      ='Base Components'
    base-button(@click='handleBaseButtonClick')
      ='Button'
</template>

<script>
  import { apiRequest } from '<utils>/request';

  export default {
    methods: {
      handleBaseButtonClick() {
        return apiRequest({
          method: 'post',
        })
      }
    }
  };
</script>
