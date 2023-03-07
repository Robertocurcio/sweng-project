
function estimate_price(square_meters, city, num_bedrooms, budget, user_id) {
    //prezzo al m^2 per ristrutturazioni
    
    console.log(user_id);
    
    prices = {
        "Milano":  [506, 566],
        "Torino":  [446, 506],
        "Napoli": [410, 470]
    }

    price_range = [ prices[city][0]*square_meters, prices[city][1]*square_meters]; //first estimation

    if (num_bedrooms > 3){ 
        price_range[0] *= 1.2;
        price_range[1] *= 1.2
    }

    else if ( num_bedrooms == 2 ){
        price_range[0] *= 0.9;
        price_range[1] *= 0.9
    }

    else if (num_bedrooms == 1){
        price_range[0] *= 0.7;
        price_range[1] *= 0.7
    }

    if (budget == "high"){
        price_range[0] *= 1.2;
        price_range[1] *= 1.2
    }

    else if (budget == "low"){
        price_range[0] *= 0.8;
        price_range[1] *= 0.8
    }
    
    price_range[0] = parseInt(price_range[0]);
    price_range[1] = parseInt(price_range[1]);

    const fs = require('fs');
    const path = require('path');

    function get_est_id(user_id) {
        const contents = fs.readFileSync(path.resolve(__dirname, 'database.json'), 'utf8');
        const past_ests = JSON.parse(contents);

        // Check if there are instances with the user id filtered
        const filtered_data = past_ests.filter(d => d.user === user_id);

        if (filtered_data.length === 0) {
            return 1;
        } else {
            // Get the highest est_id value from the filtered instances
            return Math.max(...filtered_data.map(d => d.est_id || 0)) + 1;
        }
    }

    const data = {
        "user": user_id,
        "est_id": get_est_id(user_id),
        "square_meters": square_meters,
        "city": city,
        "num_bedrooms": num_bedrooms,
        "budget": budget,
        "estimation_range": price_range
    };

    // Wait for 5 seconds
    setTimeout(() => {
        // Read the contents of database.json
        let contents;
        try {
            contents = fs.readFileSync(path.resolve(__dirname, 'database.json'), 'utf8');
        } catch (err) {
            contents = '';
        }

        // If the file is empty, create a new list with the data
        let data_list;
        if (!contents) {
            data_list = [data];
        } else {
            data_list = JSON.parse(contents);
            data_list.push(data);
        }

        // Write the updated data to database.json
        fs.writeFileSync(path.resolve(__dirname, 'database.json'), JSON.stringify(data_list, null, 4));
    }, 5000);
}

module.exports = {
    estimate_price
};