import json
import os
import time

def estimate_price(square_meters, city, num_bedrooms, budget, user_id = "a"):

    
    #prezzo al m^2 per ristrutturazioni
    prices = {
        "Milano":  [506, 566],
        "Torino":  [446, 506],
        "Napoli": [410, 470]
    }
    
    price_range = [ prices[city][0]*square_meters, prices[city][1]*square_meters] #first estimation
    
    if num_bedrooms > 3:
        price_range[0] *= 1.2
        price_range[1] *= 1.2
    elif num_bedrooms == 2:
        price_range[0] *= 0.9
        price_range[1] *= 0.9
    elif num_bedrooms == 1:
        price_range[0] *= 0.7
        price_range[1] *= 0.7

    if budget == "high":
        price_range[0] *= 1.2
        price_range[1] *= 1.2
        
    elif budget == "low":
        price_range[0] *= 0.8
        price_range[1] *= 0.8
        
    price_range[0], price_range[1] = int(price_range[0]), int(price_range[1])

    price_range = tuple(price_range) #sembrava piu sensato fare una tupla rispetto ad una lista
    

    def get_est_id():
        with open('database.json', 'r') as past_est:
            past_ests = json.load(past_est)
            

        # # Check if there are instances with the user id filtered
        filtered_data = [d for d in past_ests if d.get('user') == user_id]

        if not filtered_data:
            return 1
        else:
            # Get the highest est_id value from the filtered instances
            return max([d.get('est_id', 0) for d in filtered_data]) + 1
  
    data = {
        "user": user_id,
        "est_id": get_est_id(),
        "square_meters": square_meters,
        "city": city,
        "num_bedrooms": num_bedrooms,
        "budget": budget,
        "estimation_range": price_range
    }
    time.sleep(5)
    # Read the contents of database.json
    with open('database.json', 'r') as f:
        contents = f.read()

    # If the file is empty, create a new list with the data
    if not contents:
        data_list = [data]

    # Otherwise, parse the existing data and append the new data
    else:
        data_list = json.loads(contents)
        data_list.append(data)

    # Write the updated data to database.json
    with open('database.json', 'w') as f:
        json.dump(data_list, f, indent=4)


