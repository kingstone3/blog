<!--
  实例化 baseButton 的时候，
  v-on 和其他属性有区别，
  v-on 不会被传到 $attrs 属性中，
  而是会传到 $listeners 里，
  同时这个属性不会被传递到组件根节点下，
  需要在组件内主动 $emit 一下事件，
  如果带有 .native modifier 的话就会被传递到根节点下。
-->
<template lang='pug'>
  button(
    :disabled='disabled'
    :class='classObj'
    @click='handleClick'
  )
    slot
</template>

<!--
  每个组件都可以定义自己的 style，
  除此之外，还可以在 gulp 时编译 scss 文件，
  在 pug 模板中引入 css
-->
<style lang='scss'>
  .disabled{
    color: red
  }
</style>

<!--
  通过 disabled prop 和 isClick data 分别来控制组件的 disabled 状态，
  prop 是用户控制；isClick 是组件内部控制。
-->
<script>
  export default {
    name: 'baseButton',
    data() {
      return {
        isClick: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'button'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classObj() {
        return {
          'disabled': this.isClick,
        }
      }
    },
    methods: {
      handleClick() {
        this.isClick = true;

        const clickPromise = this.$listeners.click()

        if (clickPromise instanceof Promise) {
          clickPromise.then(() => {
            this.isClick = false;
          }).catch(() => {
            this.isClick = false;
          });
        } else {
          this.isClick = false;
        }
      }
    }
  };
</script>
