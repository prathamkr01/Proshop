import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    async function cartData(id) {
      const response = await fetch(`http://localhost:5000/api/products/${id}`)
      const resData = response.json();
      return resData;
    }
    const { _id, name, image, price, countInStock } = await cartData(id)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: _id,
        name: name,
        image: image,
        price: price,
        countInStock: countInStock,
        qty: qty
      }
    })
  }
  catch (error) {
    console.log(error);
  }

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}