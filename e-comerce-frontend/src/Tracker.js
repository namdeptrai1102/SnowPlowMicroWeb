import { trackSelfDescribingEvent, newTracker, trackPageView } from '@snowplow/browser-tracker';

function ViewProduct(name, price, id) {
    trackSelfDescribingEvent({
        event: {
            schema: "iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0",
            data: {
                type: 'view',
            }
        },
        context: {
            schema: "iglu:test.example.iglu/product_context/jsonschema/1-0-0",
            data: {
                product_name: name,
                product_price: parseInt(price),
                product_id: parseInt(id)
            }
        }
    })
}

function AddProduct(name, price, id) {
    console.log("hello world");
    trackSelfDescribingEvent({
        event: {
            schema: "iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0",
            data: {
                type: 'add',
            }
        },
        context: {
            schema: "iglu:test.example.iglu/product_context/jsonschema/1-0-0",
            data: {
                product_name: name,
                product_price: parseInt(price),
                product_id: parseInt(id)
            }
        }
    })
}

function RemoveProduct(name, price, id) {
    console.log("hello world");
    trackSelfDescribingEvent({
        event: {
            schema: "iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0",
            data: {
                type: 'remove',
            }
        },
        context: {
            schema: "iglu:test.example.iglu/product_entity/jsonschema/1-0-0",
            data: {
                name: name,
                price: parseInt(price),
            }
        }
    })
}

function CreatNewTracker() {
    newTracker('tracking_product', 'localhost:9090', {
        appId: 'ecomerceshop',
        plugins: [],
    });
}


export { ViewProduct, AddProduct, CreatNewTracker, RemoveProduct };