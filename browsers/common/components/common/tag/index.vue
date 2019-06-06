<template functional lang='pug'>
  div(
    :class="['tag-wrapper', `tag-wrapper--${props.type}`, `tag-wrapper--${props.size}`]"
  )
    div.tag
      div.tag__title.
        {{props.tittle}}
      div(
        :class="['tag__detail', `tag__detail--${props.size}`]"
      ).
        {{props.detail}}
</template>

<script>
import VueType from 'vue-types';

export default {
  functional: true,

  props: {
    type: VueType.oneOf(
      ['log', 'warn', 'success', 'error']
    ).def('log'),

    size: VueType.oneOf(
      ['hidden', 'mini', 'normal']
    ).def('mini'),

    tittle: VueType.string.isRequired,
    detail: VueType.string.isRequired,
  }
}
</script>

<style scoped lang='scss'>
  @mixin mini-detail {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tag-wrapper {
    width: 300px;
    padding-left: 40px;
    margin-bottom: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    transition: border-radius 1s;

    .tag {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 8px;

      &__title {
        margin-bottom: 12px;
      }

      &__detail {
        width: 284px;
        font-size: 12px;
        color: #383838;
        line-height: 18px;
        overflow: hidden;

        &--hidden,
        &--mini {
          @include mini-detail();
        }
      }
    }

    &--hidden {
      height: 64px;
      border-top-left-radius: 64px;
      border-bottom-left-radius: 64px;
    }

    &--mini {
      height: 64px;
    }

    &--log {
      background: #52becf;

      .tag {
        background: #c3eff7;
      }
    }

    &--warn {
      background: #fc3;

      .tag {
        background: #ffe8a5;
      }
    }

    &--success {
      background: #bde540;

      .tag {
        background: #e9ffad;
      }
    }

    &--error {
      background: #ed6358;

      .tag {
        background: #ffc4bc;
      }
    }
  }
</style>

