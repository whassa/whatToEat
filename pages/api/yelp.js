import YelpFoodType from './foodType';
import yelp from 'yelp-fusion';

const client = yelp.client(process.env.YELP_CLIENT);

const getYelpFoodType = () => {
    return YelpFoodType[Math.floor(Math.random() * YelpFoodType.length)];
}

const addFoodRestrictionAsCategories = (foodRestriction) => {
    let foodRestrictions = '';
    if (foodRestriction.vegan) {
        foodRestrictions += 'vegan';
    }
    if (foodRestriction.vegetarian) {
        foodRestrictions += 'vegetarian';
    }
    if (foodRestriction.glutenFree) {
        foodRestrictions += ' glutenfree';
    }
    if (foodRestriction.keto) {
        foodRestrictions += ' ketofriendly';
    }

    if (foodRestriction.peanutFree) {
        foodRestrictions += ' peanut free';
    }
    return foodRestrictions;
}

export default function handler(req, res) {
    return new Promise(resolve => {
        if (req.method !== 'GET' ) { 
            res.status(404);
            return resolve();
        }
        let food = getYelpFoodType();
    
        if (req.query.lat && req.query.long) {
            client.search({
                latitude: req.query.lat,
                longitude: req.query.long,
                limit: 3,
                radius: 5000,
                categories: food.code,
                open_now: true,
            }).then( (response) => {
                const urls = response.jsonBody.businesses.map((restaurant) => {
                    return { name: restaurant.name, url: restaurant.url }
                })
                food = { ...food, urls: urls }
                res.status(200).json({ foodType:  food })
                resolve();
            }).catch(e => {
                res.status(200).json({ foodType:  food })
                resolve();
            });
        } else {
            res.status(200).json({ foodType:  food });
            resolve();
        }
    });
}
  



