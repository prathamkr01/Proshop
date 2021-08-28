import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'


export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    async function productsData() {
      const response = await fetch('http://localhost:5000/api/products')
      const resData = response.json();
      return resData;
    }

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: await productsData(),
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    async function productData(id) {
      const response = await fetch(`http://localhost:5000/api/products/${id}`)
      const resData = response.json();
      return resData;
    }

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: await productData(id),
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

