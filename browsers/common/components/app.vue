<template lang='pug'>
  div
    div
      ='Base Components'
    base-button(@click='handleBaseButtonClick')
      ='Button'
</template>

<script lang='babel'>
  export default {
    methods: {
      handleBaseButtonClick() {
        return new Promise((res, rej) => {
          setTimeout(() => res(), 2000);
        })
      }
    }
  };
</script>
