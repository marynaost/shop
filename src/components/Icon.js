import PropTypes from 'prop-types'
import sprite from 'assets/sprite.svg'

const Icon = ({ iconName, width, height, fill, stroke, ...props }) => {
  return (
    <svg {...props} width={width} height={height} fill={fill} stroke={stroke}>
      <use href={`${sprite}#${iconName}`}></use>
    </svg>
  )
}

export default Icon

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  props: PropTypes.any,
}
