import "./Product.css";
import { Link } from "react-router-dom";
import React from "react";

const Product = ({ imageUrl, description, price, name, productId }) => {
  // const trackingProduct = () => {
  //   var product_name = document.getElementsByClassName("info__name")[0].innerText;
  //   var product_price = document.getElementsByClassName("info__price")[0].innerText;
  //   var product_description = document.getElementsByClassName("info__description")[0].innerText;

  //   window.snowplow('trackPageView',{
  //     "context":{
  //       "schema":'iglu:com.trysnowplow/product/jsonschema/1-0-0',
  //       "data": {
  //         "name": "snowplowdb",
  //         "price": 20000}
  //     }
  //   });
  // };

  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>

        <Link to={`/product/${productId}`} className="info__button" onClick = {() => {
        //   var product_name = document.getElementsByClassName("info__name")[0].textContent;
        //   var product_price = document.getElementsByClassName("info__price")[0].textContent;
        //   var product_description = document.getElementsByClassName("info__description")[0].textContent;
        //   //   var product_name = document.getElementsById("info__name").textContent;
        //   // var product_price = document.getElementsById("info__price").value;
        //   // var product_description = document.getElementsById("info__description").value;
        //  // var product_id = document.getElementById("product_id").value;
       //   alert(name + price)
    
        //    window.snowplow('trackSelfDescribingEvent', {
        //     "event": {
        //        "schema": "iglu:com.trysnowplow/add/jsonschema/1-0-0",
        //        "data": {
        //           "type": "add" // or "remove"
        //        }
        //     },
        //     "context": [{
        //        "schema": "iglu:com.trysnowplow/click/jsonschema/1-0-0",
        //        "data": {
        //           "name": "example_name",
        //           "quantity": 1,
        //       "price": 100,
        //       "category": "example_category",
        //       "sku": "example_sku"
        //        }
        //     }]
        //  });
        }

        }>
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
