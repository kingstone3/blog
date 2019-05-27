<template lang='pug'>
  div
    div state: {{ state }}
    div current: {{ current }}
    div previous: {{ previous }}
    div history: {{ history }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('ws', {
        state: state => state.state,
        history: state => state.history,
        current: state => state.current,
        previous: state => state.previous,
      }),
    },
  };
</script>

<style type="scss"></style>
