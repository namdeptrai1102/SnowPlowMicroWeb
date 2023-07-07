import requests
import openpyxl
import pymongo
import json
from datetime import datetime

#connect to database
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["trackEvent"]
view_product = mydb["view_product"]
add_product = mydb["add_product"]
remove_product = mydb["remove_product"]

view_product_time_set = set(view_product.distinct("time"))
add_product_time_set = set(add_product.distinct("time"))
remove_product_time_set = set(remove_product.distinct("time"))

#fetch api
response = requests.get('http://localhost:9090/micro/good')
content = response.json()
# xem san pham
viewProduct = []
addProduct = []
removeProduct = []

for item in content:
    userId = item['rawEvent']['context']['userId']
    # pageUrl = item['event']['page_url']
    product = {"url":item['rawEvent']['parameters']['url'],
                # "category": item['event']['unstruct_event']['data']['data']['category'],
                "name": item['event']['contexts']['data'][0]['data']['name'],
                #    "price": item['event']['unstruct_event']['data']['data']['price'],
                #    "quantity": item['event']['unstruct_event']['data']['data']['quantity']
                }
    time = item['rawEvent']['context']['timestamp']
    eventType = item['event']['unstruct_event']['data']['data']['type']
    trackEvent = {"user_id": str(userId),
                "event": str(eventType),
                #   "pageUrl": str(pageUrl),
                "product": product,
                "time": time}
    
    #check extint event
    if (time not in view_product_time_set) and (time not in add_product_time_set) and (time not in remove_product_time_set)  :
        data = json.dumps(trackEvent)
        trackEventJson = json.loads(data)    

        # view product
        if eventType == item['event']['unstruct_event']['data']['data']['type'] == 'view' :
            view_product.insert_one(trackEventJson)
            viewProduct.append(trackEvent)
            view_product_time_set.add(time)
        #add product
        elif eventType == item['event']['unstruct_event']['data']['data']['type'] == 'add':
            add_product.insert_one(trackEventJson)
            addProduct.append(trackEvent)
            add_product_time_set.add(time)
        #remove product
        else:
            remove_product.insert_one(trackEventJson)
            removeProduct.append(trackEvent)
            remove_product_time_set.add(time)
            
    
    
    
print(viewProduct)
print(addProduct)
print(removeProduct)

print(view_product_time_set)

