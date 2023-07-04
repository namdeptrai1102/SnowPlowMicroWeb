import './ProductScreen.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'
import { trackSelfDescribingEvent, newTracker, trackPageView } from '@snowplow/browser-tracker';

function ViewProduct(product_name, product_price) {
  // trackSelfDescribingEvent({
  //   event: {
  //     schema: "iglu:test.example/product_view/jsonschema/1-0-0",
  //     data: {
  //       product_name: "macbook",
  //       // price: 123,
  //     }
  //   }
  // })

  trackSelfDescribingEvent({
    event: {
      schema: "iglu:test.example/product_enity/jsonschema/1-0-0",
      data: {
        sku: "apple",
        category: "iphone",
        name: "iphone14",
        price: 999,
        quantity: 4,
      }
    }
  })
}

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.getProductDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    const product_name = product && product.name;
    const product_price = product && product.price;
    console.log(product_name + product_price);

    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id))
      newTracker('tracking_product', 'localhost:9090', {
        appId: 'ecomerceshop',
        plugins: [],
      });
    }
    ViewProduct(product_name, product_price);


  }, [dispatch, match, product, qty])
  const addToCartHandler = () => {
    if (user.userInfo.isLogin) {
      dispatch(addToCart(product._id, qty))
      history.push(`/cart`)
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
                <select value={qty} onChange={e => setQty(e.target.value)}>
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
