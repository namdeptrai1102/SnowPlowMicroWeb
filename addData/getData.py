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

    product = item['event']['contexts']['data'][0]['data']
    time = item['event']['dvce_created_tstamp']
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
        if eventType == 'view' :
            view_product.insert_one(trackEventJson)
            view_product_time_set.add(time)
        #add product
        elif eventType == 'add':
            add_product.insert_one(trackEventJson)
            add_product_time_set.add(time)
        #remove product
        else:
            remove_product.insert_one(trackEventJson)
            remove_product_time_set.add(time)
            
    


print(view_product_time_set)

