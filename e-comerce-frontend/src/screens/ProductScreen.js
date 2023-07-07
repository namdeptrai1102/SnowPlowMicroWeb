import './ProductScreen.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'
import { trackSelfDescribingEvent, newTracker, trackPageView } from '@snowplow/browser-tracker';
import { ViewProduct, AddProduct, CreatNewTracker } from '../Tracker'


const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const [tracked, setTracked] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.getProductDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if ((product && match.params.id !== product._id) || !product) {
      dispatch(getProductDetails(match.params.id))
    }
    if (product && Object.keys(product).length > 0 && !tracked) {
      console.log("Product: ", product);
      const product_name = product && product.name;
      const product_price = product && product.price;
      const product_id = product && product._id;
      ViewProduct(product_name, product_price, product_id);
      setTracked(true);
    }
    console.log("tests");

  }, [product])
  const addToCartHandler = () => {
    if (user.userInfo.isLogin) {
      dispatch(addToCart(product._id, qty))
      history.push(`/cart`)
      const product_name = product && product.name;
      const product_price = product && product.price;
      const product_id = product && product._id;
      const product_qty = qty;
      AddProduct(product_name, product_price, product_id, product_qty);
      // log
      return
    } else {
      alert('You need to first login.')
    }
  }

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading... </h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (

        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p className="left__price">Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span className="price">${product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={e => setQty(parseInt(e.target.value))}>
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductScreen
