<template lang='pug'>
  div
    tag(
      :type='"error"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"error"'
      :size='tagSize'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"error"'
      :size='"hidden"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )

    tag(
      :type='"success"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"success"'
      :size='tagSize'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"success"'
      :size='"hidden"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )

    tag(
      :type='"warn"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"warn"'
      :size='tagSize'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"warn"'
      :size='"hidden"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )

    tag(
      :type='"log"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"log"'
      :size='tagSize'
      :tittle='tagTittle'
      :detail='tagDetail'
    )
    tag(
      :type='"log"'
      :size='"hidden"'
      :tittle='tagTittle'
      :detail='tagDetail'
    )

    div WS State: {{state}}
    div WS Current: {{current}}
    div WS Previous:{{previous}}
    div WS History: {{history}}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import tag from '<c>/common/tag';

export default {
  components: {
    tag
  },

  data() {
    return {
      tagType: 'log',
      tagSize:    'normal',
      tagTittle: '标签标题',
      tagDetail:
        '这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字这是一段很长很长的文字'
    };
  },

  computed: {
    ...mapState('ws', ['state', 'history']),
    ...mapGetters('ws', ['current', 'previous'])
  }
};
</script>
