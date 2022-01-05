const FoodType = [
    'African food',
    'Cajun food',
    'Caribbean food',
    'Chinese food',
    'French food',
    'Greek food',
    'Indian food',
    'Italian food',
    'Japanese food',
    'Mexican food',
    'Mediteraneen food',
    'South American food',
    'Vietnamese food',
    'Thai food',
    'Middle eastern food',
    'Fast-Food',
    'Comfort Food',
    'Sushis',
    'Pizza',
    'Pastas',
    'Sandwich',
    'Cafe',
    'Deli',
    'Salads',
    'Fine Dining',
]


const getFoodType = () => {
    return FoodType[Math.floor(Math.random() * FoodType.length)];
}



export default function handler(req, res) {

    if (req.method !== 'GET' ) { 
        res.status(404);
        return
    }

    res.status(200).json({ foodType: getFoodType() })
}
  



