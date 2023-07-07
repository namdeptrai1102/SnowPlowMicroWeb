import { RemoveProduct } from "../Tracker";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  console.log(item);
  const handleRemove = () => {
    RemoveProduct(item.name, item.price, item.product, parseInt(item.qty));
    removeHandler(item.product);
  }

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/product/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>
      <p className="cartitem__price">${item.price}</p>
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cartItem__deleteBtn"
        onClick={handleRemove}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
