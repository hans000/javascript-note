// slider控件
// author: hans
// date: 2019年8月9日

<template>
  <div ref="slider" @resize="resize" class="slider" @mousedown="bind($event)" :style="{backgroundColor: bgColor}">
    <div class="slider__bar" :style="{backgroundColor: frColor, transition: animate ? '.5s': 'none', width: `${rate}%`}"></div>
    <div class="slider__dot" :style="{backgroundColor: frColor, boxShadow: `0 0 .5em ${frColor}`, transition: animate ? '.5s': 'none', left: `${rate}%`}"></div>
  </div>
</template>
<script>
import { on, off } from '../utils/dom'
export default {
  name: 'Slider',
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    step: { type: Number, default: 1 },
    value: { type: Number, default: 0 },
    bgColor: { type: String, default: '#aaa' },
    frColor: { type: String, default: '#4e4e4e' },
  },
  data() {
    return {
      flag: false,
      sx: 0,
      animate: true,
    }
  },
  mounted() {
    this.sx = this.getPositionX()
  },
  computed: {
    rate() {
      return (this.value - this.min) / (this.max - this.min) * 100
    }
  },
  methods: {
    resize() {
      this.sx = this.getPositionX()
    },
    setValue(e) {
      let num = (e.clientX - this.sx) / this.getWidth() * this.valueRange() + this.min
      num = (num / this.step | 0) * this.step
      this.$emit('update:value', this.checkLimit(num))
    },
    getPositionX() {
      return +this.$refs.slider.getBoundingClientRect().left;
    },
    getWidth() {
      return +this.$refs.slider.offsetWidth
    },
    valueRange() {
      return this.max - this.min
    },
    checkLimit (num) {
        return Math.min(Math.max(num, this.min), this.max);
    },
    bind(ev) {
      ev.preventDefault()
      this.flag = true
      this.setValue(ev)
      on(window, 'mousemove', this.moveHander)
      on(window, 'resize', this.resize)
      on(window, 'mouseup', this.upHander)
    },
    moveHander(ev) {
      if (this.flag) {
        this.animate = false
        this.setValue(ev)
        this.$emit('on-input', this.value)
      }
    },
    upHander() {
      this.flag = false
      this.animate = true
      this.$emit('on-change', this.value)
      off(window, 'mousemove', this.moveHander)
      off(window, 'mouseup', this.upHander)
    },
  },
}
</script>
<style lang="scss" scoped>

.slider {
  position: relative;
  width: 100%;
  height: .2em;
  margin: .4em 0;
  &:hover .slider__dot {
    transform: scale(1);
  }
  &__bar {
    height: 100%;
    width: 50%;
    transition: .5s;
  }
  &__dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: .5em;
    height: .5em;
    transition: .5s;
    margin-top: -.25em;
    margin-left: -.25em;
    transform: scale(0);
    border-radius: 50%;
    user-select: none;
  }
}
</style>