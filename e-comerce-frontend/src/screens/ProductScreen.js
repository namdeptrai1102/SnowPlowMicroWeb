import './ProductScreen.css'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
//var name, productId, price;
// Actions
import {getProductDetails} from '../redux/actions/productActions'
import {addToCart} from '../redux/actions/cartActions'
import { trackSelfDescribingEvent, newTracker } from '@snowplow/browser-tracker';

function testCustome() {
  console.log("hello world");
  trackSelfDescribingEvent({
    event: {
      schema: "iglu:test.example.iglu/product_entity/jsonschema/1-0-0",
      data: {
        sku: "test",
        category: "may tinh",
        name: "macbook m1",
        price: 999,
        quantity: 2
      }
    }
  })
}
const ProductScreen = ({match, history}) => {
  const [qty, setQty] = useState(1)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.getProductDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id))
      newTracker('sp1', 'localhost:9090', {
        appId: 'test',
        plugins: [],
      });
    }
    testCustome();
    // Tracking into Snowplow
  //   window.snowplow('trackSelfDescribingEvent', {
  //     "event": {
  //        "schema": "iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0",
  //        "data": {
  //           "type": "add" // or "remove"
  //        }
  //     },
  //     "context": [{
  //        "schema": "iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0",
  //        "data": {
  //           "name": "example_name",
  //           "quantity": 1,
  //       "price": 100,
  //       "category": "example_category",
  //       "sku": "example_sku"
  //        }
  //     }]
  //  });
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
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>${product.price}</span>
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
