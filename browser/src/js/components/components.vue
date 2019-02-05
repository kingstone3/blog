<template lang='pug'>
  div
    div
      ='Base Components'
    base-button(@click='handleClick')
      ='Button'
</template>

<script>
  export default {
    methods: {
      handleClick() {
        return new Promise((res, rej) => {
          setTimeout(() => res(), 2000);
        })
      }
    }
  };
</script>
