import { computed, CSSProperties, defineComponent, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { propTypes } from '@/utils/propTypes'
import { isString } from '@/utils/is'

export default defineComponent({
  name: 'Icon',
  props: {
    icon: propTypes.string.isRequired,
    color: propTypes.string,
    size: propTypes.oneOfType([propTypes.string, propTypes.number]).def(16)
  },
  setup(props) {
    const fontSize = ref(16)
    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props
      if (isString(size)) {
        fontSize.value = parseInt(size, 10)
      }

      return {
        fontSize: `${fontSize.value}px`,
        color: color,
        display: 'inline-flex'
      }
    })

    return {
      getWrapStyle,
      fontSize
    }
  },
  render() {
    return (
      <span class="iconify" style={this.getWrapStyle}>
        <Icon icon={this.icon} height={this.fontSize} width={this.fontSize}></Icon>
      </span>
    )
  }
})
