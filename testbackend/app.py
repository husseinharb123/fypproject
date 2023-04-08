import json
from bson import ObjectId
import pymongo
from flask import Flask,request,jsonify
from flask_cors import CORS
import jwt
from bson import json_util, ObjectId
import json
import bcrypt
import math
from bson import json_util
from flask import make_response
conn_str = 'mongodb://localhost:27017'

import os
import datetime

from gridfs import GridFS

client = pymongo.MongoClient(conn_str)
db = client.fyp 
fs = GridFS(db)
app = Flask(__name__)
CORS(app)

@app.route('/CheckifEmailExist',methods = ['post'])
def checkemail():
    
    bodydata = request.get_json()
    Email = bodydata.get('Email')
    response = db.user.find_one({"Email" :Email})
    if response:
        return jsonify(True)
    else:
        return jsonify(False)

@app.route('/signup',methods = ['post'])
def signup():
    bodydata = request.get_json()
    response = db.user.insert_one(bodydata)
    if  response:
        _id = str(response.inserted_id)
        reponsebody = {
        'token':'testtoken',
        'FirstName':bodydata.get('FirstName'),
        'LastName':bodydata.get('LastName'),
        'Email':bodydata.get('Email'),
        '_id':_id
        }

        return jsonify({'responseSuccess':True,'userinfo':reponsebody})
    else:
        return jsonify({'responseSuccess':False})
@app.route('/signin',methods = ['post'])
def signin():
    bodydata = request.get_json()
    response = db.user.find_one({'Email':bodydata.get('Email'),'Password':bodydata.get('Password')})
    if  response:
        _id = str(response['_id'])
        reponsebody = {
        # 'token':'testtoken',
        'FirstName':response['FirstName'],
        'LastName':response['LastName'],
        'Email':response['Email'],
        '_id':_id
        }
        result = {_id:_id}
        token = jwt.encode(payload=result,key ='secret', algorithm='HS256')
        return jsonify({'Token':token,'responseSuccess':True,'userinfo':reponsebody})
    else:
        return jsonify({'responseSuccess':False})

@app.route('/productdetail/<id>', methods=['GET'])
def get_product_detail(id=None):
    response = db.product.find_one({'_id': ObjectId(id)})
    if response:
        response['_id'] = str(response['_id'])
        response['storename'] = str(db.store.find_one({'_id': ObjectId(response["storeid"])})['storename'])
        return jsonify(response)
    else:
        return jsonify('cannot fetch product details')

@app.route('/leavereview', methods=['POST'])
def leavereview():
    review = request.json.get("review")
    productid = request.json.get("productid")
    userid = request.json.get("userid")
    rating = request.json.get("rating")
    username = request.json.get("username")
    review_data = {
        "review": review,
        "productid": productid,
        "userid": userid,
        "rating": float(rating),
        "username": username
    }

    response1 = db.review.insert_one(review_data)
    if response1:
        product = db.product.find_one({'_id': ObjectId(productid)})
        numofreviews = len(float(db.review.find({'productid': productid})))
        previosrating = product.get("rating", 0)
        newrating = (previosrating * (numofreviews - 1) + float(rating)) / numofreviews
        response = db.product.update_one({'_id': ObjectId(productid)},{"$set": {"rating": newrating}})
        return jsonify({'responseSuccess': True})
    else:
        return jsonify({'responseSuccess': False})


@app.route('/productreview/<id>', methods=['GET'])
def productreview(id=None):
    print(id)
    reviews = db.review.find({'productid': id})
    reviews_list = []
    for review in reviews:
        review["_id"] = str(review["_id"])
        reviews_list.append(review)
    
    reviewcount = len(reviews_list) # Use len() to get the review count
    
    return jsonify({"reviewslist": reviews_list, 'reviewcount': reviewcount})





@app.route('/CheckifstorenameExist',methods = ['post'])
def checkstorename():
    bodydata = request.get_json()
    storename = bodydata.get('storename')
    response = db.store.find_one({"storename" :storename})
    if response:
        return jsonify(True)
    else:
        return jsonify(False)

@app.route('/CheckifstoreEmailExist',methods = ['post'])
def checkstoreemail():
    
    bodydata = request.get_json()
    Email = bodydata.get('Email')
    response = db.store.find_one({"Email" :Email})
    if response:
        return jsonify(True)
    else:
        return jsonify(False)

    
@app.route('/createstore',methods = ['post'])
def createstore():
    bodydata = request.get_json()
    response = db.store.insert_one(bodydata)
    if  response:
        bodydata['_id'] = str(response.inserted_id)
        return jsonify({'responseSuccess':True,'storeinfo':bodydata})
    else:

        return jsonify({'responseSuccess':False})
    
@app.route('/enterstore',methods = ['post'])
def enterstore():
    bodydata = request.get_json()
    response = db.store.find_one({'Email':bodydata.get('Email'),'Password':bodydata.get('Password')})
    if  response:
        _id = str(response['_id'])
        reponsebody = {
        'token':'testtoken',
        'FirstName':response['FirstName'],
        'LastName':response['LastName'],
        'Email':response['Email'],
        '_id':_id
        }
        return jsonify({'responseSuccess':True,'userinfo':reponsebody})
    else:
        return jsonify({'responseSuccess':False})

@app.route('/checkstoreexist/<id>',methods = ['Get'])
def checkstoreexist(id=None):
    response = None
    response = db.store.find_one({'_id':ObjectId(id)})
    if  response:
        return jsonify({'responseSuccess':True})
    else:
        return jsonify({'responseSuccess':False})

@app.route('/search')
def search_products():
    # Get the requested page number
    page = int(request.args.get('page', 1))

    # Set the number of results per page
    per_page = 6
    if page < 1:
        page = 1
    # Calculate the number of results to skip
    skip = (page - 1) * per_page

    # Get the search keywords
    search_sentences = request.args.get('productname', "").split(" ")

    # Get the other search parameters
    max_price = request.args.get('max_price', '')
    category_filter = request.args.get('category', '')
    rating_filter = request.args.get('rating', '')
    sort_by_filter = request.args.get('sort_by', '')
    in_stock_filter = request.args.get('in_stock', '')
    fast_delivery_filter = request.args.get('fast_delivery', '')
    storeid = request.args.get('storeid', '')

    # Create a regex for search
    regex = '|'.join(['\\b{}\\b'.format(word) for word in search_sentences])

    # Create a query for search
    query = {
        '$or': [
            {'productname': {'$in': search_sentences}},
            {'barcode': {'$in': search_sentences}},
            {'productdes': {'$regex': regex}}
        ]
    }

    # Add filters to the query
    if max_price:
        query['price'] = {'$lte': int(max_price)}
    if category_filter:
        query['category'] = category_filter
    if rating_filter:
        query['rating'] = {'$gte': int(rating_filter)}
    if in_stock_filter == 'true':
        query['in_stock'] = {'$gte': 0}
    if fast_delivery_filter == 'true':
        query['fast_delivery'] = True
    if storeid:
        query['storeid'] = storeid

    # Sort the results based on user preference
    if sort_by_filter == 'price_high_to_low':
        cursor = db.product.find(query).sort('price', pymongo.DESCENDING)
    elif sort_by_filter == 'price_low_to_high':
        cursor = db.product.find(query).sort('price', pymongo.ASCENDING)
    else:
        cursor = db.product.find(query)

    # Count the total number of results
    total_results = db.product.count_documents(query)

    # Calculate the total number of pages
    total_pages = math.ceil(total_results / per_page)
    print(total_pages)

    # If the requested page number is greater than the total number of pages, return the last possible page
    if page > total_pages and page >= 0  :
        page = total_pages
        if page < 1:
            page = 1
        skip = (page - 1) * per_page
        cursor = cursor.skip(skip)

    # Limit the cursor to the requested page
    cursor = cursor.skip(skip).limit(per_page)

    # Convert the cursor to a list and add the _id field as a string
    results = list(cursor)
    for result in results:
        result['_id'] = str(result['_id'])

    # Return the results as JSON, along with metadata about the total number of pages
    return json_util.dumps({'results': results,'page': page, 'per_page': per_page, 'total_results': total_results, 'total_pages': total_pages, 'results_per_page': len(results)})



@app.route('/search1')
def search_products1():
    # Get the requested page number
    page = int(request.args.get('page', 1))
    per_page = 8
    if page < 1:
        page = 1
    # Calculate the number of results to skip
    skip = (page - 1) * per_page

    # Get the search keywords
    search_sentences = request.args.get('searchQuery', "").split(" ")

    category_filter = request.args.get('category', '')
    in_stock_filter = request.args.get('instock', '')
    sort_option = request.args.get('sortOption', '')
    storeid = request.args.get('storeid', '')
    # Create a regex for search
    regex = '|'.join(['\\b{}\\b'.format(word) for word in search_sentences])

    # Create a query for search
    query = {
        '$or': [
            {'productname': {'$in': search_sentences}},
            {'barcode': {'$in': search_sentences}},
            {'productdes': {'$regex': regex}}
        ]
    }
    # if storeid:
    #     query['storeid'] = storeid
    if category_filter :
        query['category'] = category_filter
    if in_stock_filter == 'true':
        query['in_stock'] = {'$gte': 1}
    if in_stock_filter == 'false':
        query['in_stock'] = {'$eq': 0}

    # Add sorting based on the sort_option parameter
    sort = []
    if sort_option == 'Latest added':
        sort.append(('timestamp', pymongo.DESCENDING))
    elif sort_option == 'Most viewed':
        sort.append(('views', pymongo.DESCENDING))

    cursor = db.product.find(query).sort(sort)

    # Count the total number of results
    total_results = db.product.count_documents(query)

    # Calculate the total number of pages
    total_pages = math.ceil(total_results / per_page)

    # If the requested page number is greater than the total number of pages, return the last possible page
    if page > total_pages and page >= 0:
        page = total_pages
        if page < 1:
            page = 1
        skip = (page - 1) * per_page
        cursor = cursor.skip(skip)

    # Limit the cursor to the requested page
    cursor = cursor.skip(skip).limit(per_page)

    # Convert the cursor to a list and add the _id field as a string
    results = list(cursor)
    for result in results:
        result['_id'] = str(result['_id'])
    # Return the results as JSON, along with metadata about the total number of pages
    return json_util.dumps({'results': results,'page': page, 'per_page': per_page, 'total_results': total_results, 'total_pages': total_pages, 'results_per_page': len(results)})





@app.route('/publishproduct', methods=['POST'])
def publish_product():
    # ... other code ...
    
    # Save the image file to the server
    if 'imgurl' in request.files:
        image = request.files['imgurl']
        if image.filename != '':
            image_id = fs.put(image, filename=image.filename)
            imgurl = str(image_id)
    
    productname = request.form['productname']
    price = request.form['price']
    in_stock = request.form['in_stock']
    discount = request.form['discount']
    category = request.form['category']
    fast_delivery = request.form['fast_delivery']
    sellingtech = request.form['sellingtech']
    productdes = request.form['productdes']
    barcode = request.form['barcode']
    storeid = request.form['storeid']
    review = request.form['review']
    reviews = request.form['reviews']
    # Insert the data into the MongoDB db.cartelement
    product = {
        'productname': productname,
        'price': price,
        'in_stock': in_stock,
        'discount': discount,
        'category': category,
        'fast_delivery': fast_delivery,
        'sellingtech': sellingtech,
        'productdes': productdes,
        'barcode': barcode,
        'imgurl': imgurl,
        'storeid': storeid,
        'reviews': reviews,
        'review': review,
        'timestamp': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    response = db.product.insert_one(product)
    if response:
        print(imgurl)
        return jsonify(True)
    return jsonify(False)

@app.route('/images/<image_id>')
def get_image(image_id):
    # Retrieve the image data from MongoDB
    image_data = fs.get(ObjectId(image_id))
    
    # Create a response object with the image data and appropriate content type
    response = make_response(image_data.read())
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set('Content-Disposition', 'attachment', filename='%s.jpeg' % image_id)
    
    return response

@app.route('/deleteproduct/<product_id>', methods=['post'])
def delete_product(product_id):
    # Get the product from the database
    product = db.product.find_one({'_id': ObjectId(product_id)})
    if not product:
        return jsonify({'success': False, 'message': 'Product not found'})

    # Delete the image file from the server
    if 'imgurl' in product:
        fs.delete(ObjectId(product['imgurl']))

    # Delete the product from the database
    result = db.product.delete_one({'_id': ObjectId(product_id)})
    if result.deleted_count > 0:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Failed to delete product'})









@app.route('/cart', methods=['GET'])

def get_cart_elements():
    user_id = request.args.get('userid')
    cart_elements = list(db.cartelement.find({'userid': user_id}))

    for cart_element in cart_elements:
        product_id = cart_element['productid']
        product = db.product.find_one({'_id': ObjectId(product_id)})
        cart_element['productname'] = product['productname']
        cart_element['price'] = product['price']
        cart_element['imgurl'] = product['imgurl']
        cart_element['_id'] = str(cart_element['_id'])

    return jsonify(cart_elements)



@app.route('/cartofstore', methods=['GET'])

def get_cart_elementsofstore():
    user_id = request.args.get('userid')
    storeid = request.args.get('storeid')
    cart_elements = list(db.cartelement.find({'userid': user_id,'storeid':storeid}))

    listit = []
    for cart_element in cart_elements:
        listit.append(str(cart_element['_id']))

    return jsonify(listit)







@app.route('/cartsummarys' ,methods=['GET'])
def cartsummarys():
    user_id = request.args.get('userid')
    storeid = request.args.get('storeid')
    cart_elements = list(db.cartelement.find({'userid': user_id,'storeid':storeid}))
    subcost = 0
    shipping_cost = 0

    
    for cart in cart_elements:
        product = db.product.find_one({'_id': ObjectId(cart['productid'])})
        subcost += int (product['price']) * int (cart['quantity'])
        shipping_cost += 3

    totalshipping = shipping_cost
    totalcosts = subcost + shipping_cost 
    
    return jsonify({
        'subcost': subcost,
        'totalshipping': totalshipping,
        'totalcosts': totalcosts
    })

















@app.route('/storenames/<userid>', methods=['GET'])
def get_storenames(userid):
    cart_elements = list(db.cartelement.find({'userid': userid}))
    storenames = {}
    for cart_element in cart_elements:
        store_id = cart_element['storeid']
        store = db.store.find_one({'_id': ObjectId(store_id)})
        storename = store['storename']
        storenames[store_id] = storename

    storenames_list = []
    for store_id, store_name in storenames.items():
        storenames_list.append({'store_id': store_id, 'store_name': store_name})

    return jsonify(storenames_list)










@app.route('/cart', methods=['POST'])
def create_order():
    data = request.get_json()
    product_id = data['productid']
    user_id = data['userid']
    quantity = data['quantity']
    order = {
        'productid': product_id,
        'userid': user_id,
        'quantity': quantity
    }

    # insert order document into MongoDB db.cartelement
    result = db.cartelement.insert_one(order)
    inserted_order =str(result.inserted_id)
    return jsonify(inserted_order)





@app.route('/cart/<cartid>', methods=['PUT'])
def update_order(cartid):
   
    order = db.cartelement.find_one({'_id': ObjectId(cartid)})
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    data = request.get_json()
    new_quantity = data.get('quantity', order['quantity']) 

    db.cartelement.update_one({'_id': ObjectId(cartid)}, {'$set': {'quantity': new_quantity}})
    updated_order = db.cartelement.find_one({'_id': ObjectId(cartid)})
    updated_order['_id'] = str(updated_order['_id']) # convert ObjectId to string
    return jsonify(updated_order), 200

@app.route('/cart/<cartid>', methods=['DELETE'])
def delete_order(cartid):
    order = db.cartelement.find_one({'_id': ObjectId(cartid)})
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    db.cartelement.delete_one({'_id': ObjectId(cartid)})
    return jsonify({'message': 'Order deleted successfully'}), 200






@app.route('/countcart', methods=['GET'])
def countcart():
    
    cart_collection = db.cartelement
    userid = request.args.get('userid')
    cart_collection = db.cartelement
    cart_count = cart_collection.count_documents({'userid': userid})
    return jsonify(cart_count)


@app.route('/cartsummary/<userid>')
def cartsummary(userid):
    carts =list(db.cartelement.find({'userid':userid}))
    subcost = 0
    shipping_cost = 0

    
    for cart in carts:
        print("test")
        product = db.product.find_one({'_id': ObjectId(cart['productid'])})
        subcost += int (product['price']) * int (cart['quantity'])
        shipping_cost += 3

    
    totalshipping = shipping_cost
    totalcosts = subcost + shipping_cost 
    
    return jsonify({
        'subcost': subcost,
        'totalshipping': totalshipping,
        'totalcosts': totalcosts
    })


















@app.route('/wishlist', methods=['GET'])

def get_wish_elements():
    user_id = request.args.get('userid')
    wish_elements = list(db.wish.find({'userid':user_id}))

    for wish_element in wish_elements:
        product_id = wish_element['productid']
        product = db.product.find_one({'_id': ObjectId(product_id)})
        wish_element['productname'] = product['productname']
        wish_element['imgurl'] = product['imgurl']
        wish_element['productid'] = str(product['_id'])
        wish_element['price'] = product['price']
        wish_element['_id'] = str(wish_element['_id'])
        print(wish_element)

    return jsonify(wish_elements)


@app.route('/orderlist', methods=['GET'])

def get_order_elements():
    user_id = request.args.get('userid')
    order_elements = list(db.order.find({'userid':user_id}))
    for order_element in order_elements:
        product_id = order_element['productid']
        product = db.product.find_one({'_id': ObjectId(product_id)})
        order_element['productname'] = product['productname']
        order_element['productid'] = str(product['_id'])
        order_element['price'] = product['price']
        order_element['_id'] = str(order_element['_id'])
        order_element['imgurl'] = product['imgurl']

        print(order_element)

    return jsonify(order_elements)

from pymongo.errors import PyMongoError

@app.route('/recievedorders', methods=['GET'])
def get_orders():

    search_query = request.args.get('orderid', '')
    page = int(request.args.get('page_number', 1))
    order_status = request.args.get('orderStatus', '')
    sort_type = request.args.get('sortType', '')
    store_filter = request.args.get('store_filter', '')
    orders_to_skip = (page - 1) * 10

    query = {}
    query['storeid'] = store_filter
    if search_query:
        query['orderid'] = {'$regex': search_query, '$options': 'i'}
    if order_status:
        query['status'] = order_status

    sort_key = 'date' if sort_type == 'recent' else '-date'

    print("Query: ", query)
    print("Sort Key: ", sort_key)

    recievedorders = db.recievedorder.find(query).sort(sort_key).skip(orders_to_skip).limit(10)
    print(recievedorders)
    total_orders = db.recievedorder.count_documents(query)
    
    total_pages = (total_orders + 9) // 10

    results = []
    for recievedorder in recievedorders:
        result = {}
        result["orderid"] = str(recievedorder['orderid'])
        result["status"] = recievedorder['status']
        result["date"] = recievedorder['date']
        result["paymentstatus"] = recievedorder['paymentstatus']
        result["paymentdate"] = recievedorder['paymentdate']
        total = 0
        user = db.user.find_one({'_id': ObjectId(recievedorder["userid"])})
        result["email"] = user['Email']
        shippingprice = 0
        for orderelementid in recievedorder['orderlist']:
            orderelement = db.orderelement.find_one({'_id': ObjectId(orderelementid)})
            price = orderelement['price']
            quantity = orderelement['quantity']
            shippingprice = int(orderelement["shipping"])
            total += int(price) * int(quantity)
        result['total'] = total + shippingprice
        results.append(result)

    return jsonify({'results': results, 'totalPages': total_pages}), 200






@app.route('/orderinfo', methods=['GET'])
def get_orderinfo():
    try:
        orderid = request.args.get('orderid', '')        
        received_order = db.recievedorder.find_one({'orderid': orderid})
        
        orderinfo = {}
        orderinfo["orderid"] = str(received_order['orderid'])
        orderinfo["status"] = received_order['status']
        orderinfo["date"] = received_order['date']
        orderinfo["paymentstatus"] = received_order['paymentstatus']
        orderinfo["paymentmethod"] = received_order['paymentmethod']
        user = db.user.find_one({'_id': ObjectId(received_order["userid"])})
        orderinfo["email"] = user['Email']
        orderinfo["name"] = user['FirstName'] + " " + user["LastName"] 
        orderinfo["location"] = user['Address']

        total = 0
        subtotal = 0
        shippingprice = 0
        orderelements = []
        
        for orderelementid in received_order['orderlist']:
            orderelement = db.orderelement.find_one({'_id': ObjectId(orderelementid)})
            product = db.product.find_one({'_id': ObjectId(orderelement['productid'])})
            price = orderelement['price']
            quantity = orderelement['quantity']
            shippingprice = int(orderelement["shipping"])
            subtotal += int(price) * int(quantity) 
            orderelements.append({
                "productid": orderelement['productid'],
                "productname": product['productname'],
                "price": price,
                "quantity": quantity,
                "total": int(price) * int(quantity) + shippingprice,
                "imgurl": product['imgurl']
            })

        total = subtotal + shippingprice
        return jsonify({'orderinfo': orderinfo, 'orderelements': orderelements, 'subtotal': subtotal, 'total': total, 'shipping': shippingprice}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/changeorderstatus/<order_id>', methods=['post'])
def update_order_status(order_id):
    new_status = request.json.get('status')
    result = db.recievedorder.update_one({'orderid': order_id}, {'$set': {'status': new_status}})
    if new_status == "awaiting_payment":
        result = db.recievedorder.update_one({'orderid': order_id}, {'$set': {'paymentstatus': False}})
    if result.modified_count > 0:
        return jsonify({'message': 'Order status updated successfully'})
    else:
        return jsonify({'error': 'Order not found'})

@app.route('/changeorderpaymentstatus/<order_id>', methods=['post'])
def update_order_paymementstatus(order_id):
    new_paymentstatus = request.json.get('paymentstatus')
    result = db.recievedorder.update_one({'orderid': order_id}, {'$set': {'paymentstatus': new_paymentstatus}})
    if result.modified_count > 0:
        return jsonify({'message': 'Order paymentstatus updated successfully'})
    else:
        return jsonify({'error': 'Order not found'})






@app.route('/store-settings/<storeid>', methods=['POST'])
def store_setting(storeid):
    data = {}
    for key in request.form.keys():
        data[key] = request.form[key]
    if 'storeprofile' in request.files:
        image = request.files['storeprofile']
        if image.filename != '':
            image_id = fs.put(image, filename=image.filename)
            data["storeprofileid"] = str(image_id)
            

    if 'storebackground' in request.files:
        image = request.files['storebackground']
        if image.filename != '':
            image_id = fs.put(image, filename=image.filename)
            data["storebackgroundid"] = str(image_id)

    db.store.update_one({"_id": ObjectId(storeid)}, {"$set": data}, upsert=True)
    return jsonify({'success': True}), 200


@app.route('/postwish', methods=['POST'])
def post_wish():
    # Get the userid and productid from the JSON payload
    data = request.get_json()
    userid = data['userid']
    productid = data['productid']
    
    # Insert the data into the MongoDB collection
    post_data = {'userid': userid, 'productid': productid}
    result = db.wish.insert_one(post_data)
    
    # Return a JSON response indicating success or failure
    if result.inserted_id:
        return {'status': 'success', 'message': 'Wish posted successfully'}
    else:
        return {'status': 'error', 'message': 'Failed to post wish'}
    


@app.route('/postcart',methods=['post'])
def addcartelement():
    # Get the userid and productid from the JSON payload
    data = request.get_json()
    userid = data['userid']
    productid = data['productid']
    response1 = db.product.find_one({"_id":ObjectId(productid)})
    storeid = response1['storeid']
    res = db.store.find_one({"_id":ObjectId(storeid)})
    shippingprice = res['shippingprice']
    # Insert the data into the MongoDB collection
    post_data = {'userid': userid, 'productid': productid,'quantity':1,'shippingprice':shippingprice,"storeid":storeid}
    result = db.cartelement.insert_one(post_data)
    
    # Return a JSON response indicating success or failure
    if result.inserted_id:
        return {'status': 'success', 'message': 'cart posted successfully'}
    else:
        return {'status': 'error', 'message': 'Failed to post cart'}


@app.route('/deletewish', methods=['post'])
def deletewish():
    user_id = request.json['userid']
    product_id = request.json['productid']
    
    result = db.wish.delete_one({'userid': user_id, 'productid': product_id})
    
    if result.deleted_count == 1:
        response = jsonify({'message': 'Successfully deleted wish item'})
    else:
        response = jsonify({'message': 'Failed to delete wish item'})
    
    return response

@app.route('/deletecart', methods=['post'])
def delete_cart_item():
    user_id = request.json['userid']
    product_id = request.json['productid']
    
    result = db.cartelement.delete_one({'userid': user_id, 'productid': product_id})
    
    if result.deleted_count == 1:
        response = jsonify({'message': 'Successfully deleted cart item'})
    else:
        response = jsonify({'message': 'Failed to delete cart item'})
    
    return response


















@app.route('/movetocart',methods=['post'])
def movewishtocart():
    wishid  = request.args.get('wishid', '')
    productid = request.args.get('productid', '')
    userid  = request.args.get('userid', '')
    response = db.wish.delete_one({'_id':ObjectId(wishid)})
    response1 = db.cartelement.insert_one({'userid':userid,'productid':productid,'quantity':1})
    return "sucesss"







@app.route('/inoutwishcart/<productid>')
def inoutwishcart(productid):

    addedToCart = bool(db.cartelement.find_one({'productid':productid}))
    addedToWishlist = bool(db.wish.find_one({'productid':productid}))

    # Return a JSON response with boolean values
    response = {
        'addedToCart': addedToCart,
        'addedToWishlist': addedToWishlist
    }

    return jsonify(response)














@app.route('/store-settings', methods=['GET'])
def Get_store_settings():
    storeid = request.args.get('storeid', '')   
    response  =  db.store.find_one({'_id':ObjectId(storeid)})
    response['_id'] = str(response['_id'])
    return response,200






@app.route('/deals/<storeid>', methods=['GET'])
def get_deals(storeid):
    products = db.product.find({"storeid": storeid}).sort('discount', -1).limit(6)
    result = []
    for product in products:
        product['_id'] = str(product['_id'])
        result.append(product)
    print(result)
    return jsonify(result)




@app.route('/homesec/<storeid>', methods=['GET'])
def get_homesec(storeid):
    products = db.product.find({"storeid": storeid}).sort('bought', -1).limit(4)
    featured = []
    for product in products:
        product['_id'] = str(product['_id'])
        featured.append(product)

    products = db.product.find({"storeid": storeid}).sort('rating', -1).limit(4)
    toprated = []
    for product in products:
        product['_id'] = str(product['_id'])
        toprated.append(product)
    print (products)
    return jsonify({'featured':featured,'toprated':toprated})




@app.route('/api/contact', methods=['POST'])
def submit_contact():
    name = request.json['name']
    email = request.json['email']
    phone = request.json['phone']
    subject = request.json['subject']
    message = request.json['message']
    storeid = request.json['storeid']
    
    contact = {
        'name': name,
        'email': email,
        'phone': phone,
        'subject': subject,
        'message': message,
        'storeid': storeid
    }
    
    # Save contact data to MongoDB
    db.contact.insert_one(contact)
    
    # Clear the form fields
    response = jsonify({'message': 'Contact sent successfully'})
    
    return response








@app.route('/checkstores')
def checkstores():
    # Get the requested page number
    page = int(request.args.get('page', 1))
    per_page = 8
    if page < 1:
        page = 1
    # Calculate the number of results to skip
    skip = (page - 1) * per_page

    query={}
    storename = request.args.get('storename', "")
    industry = request.args.get('industry', '')

    if storename :
        query['storename'] = storename
    if industry:
        query['industry'] = industry


    cursor = db.store.find(query)
    total_results = db.store.count_documents(query)
    total_pages = math.ceil(total_results / per_page)
    if page > total_pages and page >= 0:
        page = total_pages
        if page < 1:
            page = 1
        skip = (page - 1) * per_page
        cursor = cursor.skip(skip)

    # Limit the cursor to the requested page
    cursor = cursor.skip(skip).limit(per_page)

    # Convert the cursor to a list and add the _id field as a string
    results = list(cursor)
    for result in results:
        result['_id'] = str(result['_id'])
    # Return the results as JSON, along with metadata about the total number of pages
    return json_util.dumps({'results': results,'page': page, 'per_page': per_page, 'total_results': total_results, 'total_pages': total_pages, 'results_per_page': len(results)})









import random
import string

def generate_random_id(length):
    """Generate a random ID of given length."""
    characters = string.ascii_letters + string.digits  # Generate ID from letters and digits
    return ''.join(random.choice(characters) for _ in range(length))  # Join the randomly chosen characters to create the ID



import pickle

@app.route('/addsingleorder', methods=['POST'])
def addsingleorder():
    try:
        orderid = generate_random_id(10)
        cartelementid = request.json['cartelementid']
        cartelement = db.cartelement.find_one({'_id': ObjectId(cartelementid)})

        productid = cartelement['productid']
        userid = cartelement['userid']
        quantity = cartelement['quantity']
        shippingprice = cartelement['shippingprice']

        paymentmethod = request.json['paymentmethod']
        status = request.json['status']
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        product =  db.product.find_one({'_id': ObjectId(productid)})
        price = product['price']
        storeid = product['storeid']
        paymentstatus = request.json['paymentstatus']
        paymentdate = request.json['paymentdate']

        orderorderelementdata = {
            'productid': productid,
            'orderid': orderid,
            'price': price,
            'shipping': shippingprice,
            'quantity': quantity
        }

        orderorderelementresponse = db.orderelement.insert_one(orderorderelementdata)
        orderorderelementid = str(orderorderelementresponse.inserted_id)

        data = {
            'date': date,
            'paymentstatus': paymentstatus,
            'status': status,
            'storeid': storeid,  # assuming storeid is defined somewhere else in the code
            'userid': userid,
            'paymentdate': paymentdate,
            'paymentmethod': paymentmethod,
            'orderlist': [orderorderelementid],
            'orderid' : orderid
        }
        db.recievedorder.insert_one(data)

        # Clear the form fields
        response = jsonify({'message': 'singleorder added successfully'})
        return response

    except Exception as e:
        # Handle the exception
        error_message = str(e)
        response = jsonify({'error': error_message})
        response.status_code = 500  # Set appropriate HTTP status code
        return response






@app.route('/addmultipleorder', methods=['POST'])
def addmultipleorder():
    try:
        orderid = generate_random_id(10)
        cartelementids = request.json['cartelementsid'] # assuming cartelementid is a list of strings
        orderorderelementids = [] # List to store orderorderelementids

        for cartelementid in cartelementids:
            cartelement = db.cartelement.find_one({'_id': ObjectId(cartelementid)})
            print(f'cartelement: {cartelement}')  # Added print statement for checking cartelement

            productid = cartelement['productid']
            userid = cartelement['userid']
            quantity = cartelement['quantity']
            shippingprice = cartelement['shippingprice']

            paymentmethod = request.json['paymentmethod']
            status = request.json['status']
            date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            product =  db.product.find_one({'_id': ObjectId(productid)})
            price = product['price']
            storeid = product['storeid']
            paymentstatus = request.json['paymentstatus']
            paymentdate = request.json['paymentdate']

            orderorderelementdata = {
                'productid': productid,
                'orderid': orderid,
                'price': price,
                'shipping': shippingprice,
                'quantity': quantity
            }

            orderorderelementresponse = db.orderelement.insert_one(orderorderelementdata)
            orderorderelementid = orderorderelementresponse.inserted_id
            orderorderelementids.append(orderorderelementid) # Append orderorderelementid to the list

        data = {
            'date': date,
            'paymentstatus': paymentstatus,
            'status': status,
            'storeid': storeid,  # assuming storeid is defined somewhere else in the code
            'userid': userid,
            'paymentdate': paymentdate,
            'paymentmethod': paymentmethod,
            'orderlist': orderorderelementids, # Use the list of orderorderelementids
            'orderid' : orderid
        }
        db.recievedorder.insert_one(data)

        # Clear the form fields
        response = jsonify({'message': 'singleorder added successfully'})
        return response
    except Exception as e:
        print(f'Error: {e}')  # Added print statement for checking exception
        return jsonify({'error': 'Failed to add multiple orders'}), 500

    except Exception as e:
        # Handle the exception
        error_message = str(e)
        response = jsonify({'error': error_message})
        response.status_code = 500  # Set appropriate HTTP status code
        return response























if __name__ == '__main__':
    app.run(port=8070,debug=True)