import { computed, CSSProperties, defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { isString } from '@/utils/is'

export default defineComponent({
  name: 'Icon',
  props: {
    icon: propTypes.string.isRequired,
    color: propTypes.string,
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16
    }
  },
  setup(props) {
    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props
      let fs = size
      if (isString(size)) {
        fs = parseInt(size, 10)
      }

      return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex'
      }
    })

    return {
      getWrapStyle
    }
  },
  render() {
    return <span class="iconify" style={this.getWrapStyle} data-icon={this.icon}></span>
  }
})
