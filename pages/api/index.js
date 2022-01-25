import FoodType from './foodType';
import yelp from 'yelp-fusion';

const client = yelp.client(process.env.YELP_CLIENT);


const getFoodType = () => {
    return FoodType[Math.floor(Math.random() * FoodType.length)];
}

export default function handler(req, res) {
    if (req.method !== 'GET' ) { 
        res.status(404);
        return
    }
    let food = getFoodType();
    if (req.query.lat && req.query.long) {
        client.search({
            latitude: req.query.lat,
            longitude: req.query.long,
            limit: 3,
            radius: 5000,
            categories: food.code,
            open_now: true,
        }).then( (response) => {
            console.log(response)
            const urls = response.jsonBody.businesses.map((restaurant) => {
                return { name: restaurant.name, url: restaurant.url }
            })
            food = { ...food, urls: urls }
            res.status(200).json({ foodType:  food })
        }).catch(e => {
            res.status(200).json({ foodType:  food })
        });
    } else {
        res.status(200).json({ foodType:  food })
    }
}
  



