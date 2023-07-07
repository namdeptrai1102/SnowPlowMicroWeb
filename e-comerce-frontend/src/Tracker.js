import { trackSelfDescribingEvent, newTracker, trackPageView } from '@snowplow/browser-tracker';

function ViewProduct(name, price, id) {
    trackSelfDescribingEvent({
        event: {
            schema: 'iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0',
            data: {
                type: 'view',
            },
        },
        context: [
            {
                schema: 'iglu:test.example.iglu/product_entity/jsonschema/1-0-0',
                data: {
                    name: String(name),
                    price: price
                }
            }
        ]
    });
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
        context: [
            {
                schema: 'iglu:test.example.iglu/product_entity/jsonschema/1-0-0',
                data: {
                    name: "iphone 15",
                }
            }
        ]
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
        context: [
            {
                schema: 'iglu:test.example.iglu/product_entity/jsonschema/1-0-0',
                data: {
                    name: "iphone 16",
                }
            }
        ]
    })
}

function CreatNewTracker() {
    newTracker('tracking_product', 'localhost:9090', {
        appId: 'ecomerceshop',
        plugins: [],
    });
}


export { ViewProduct, AddProduct, CreatNewTracker, RemoveProduct };