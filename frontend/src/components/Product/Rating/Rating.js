import React from 'react'
import PropTypes from 'prop-types'


const color = '#f8e825'

const Rating = (props) => {
 return (
  <h4>
   <i style={{color}}
    className={
     props.value >= 1
      ? 'fas fa-star'
      : props.value >= 0.5
       ? 'fas fa-star-half-alt'
       : 'far fa-star'
    }>
   </i>
   <i style={{color}}
    className={
     props.value >= 2
      ? 'fas fa-star'
      : props.value >= 1.5
       ? 'fas fa-star-half-alt'
       : 'far fa-star'
    }>
   </i>
   <i style={{color}}
    className={
     props.value >= 3
      ? 'fas fa-star'
      : props.value >= 2.5
       ? 'fas fa-star-half-alt'
       : 'far fa-star'
    }>
   </i>
   <i style={{color}}
    className={
     props.value >= 4
      ? 'fas fa-star'
      : props.value >= 3.5
       ? 'fas fa-star-half-alt'
       : 'far fa-star'
    }>
   </i>
   <i style={{color}}
    className={
     props.value >= 5
      ? 'fas fa-star'
      : props.value >= 4.5
       ? 'fas fa-star-half-alt'
       : 'far fa-star'
    }>
   </i>
  <span> <strong> {props.text ? props.text : ''} </strong></span>
  </h4>
 )
}

Rating.propTypes = {
 value : PropTypes.number.isRequired,
 text : PropTypes.string.isRequired
}

export default Rating
