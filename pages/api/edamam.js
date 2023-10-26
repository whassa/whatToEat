import { EdamamFoodType } from "./foodType";

const getFoodRestrictions = (foodRestriction) => {
  let foodRestrictions = [];
  if (foodRestriction.vegan) {
    foodRestrictions.push("vegan");
  }
  if (foodRestriction.vegetarian) {
    foodRestrictions.push("vegetarian");
  }
  if (foodRestriction.glutenFree) {
    foodRestrictions.push("gluten-free");
  }
  if (foodRestriction.keto) {
    foodRestrictions.push("keto-friendly");
  }
  if (foodRestriction.peanutFree) {
    foodRestrictions.push("peanut-free");
  }
  return foodRestrictions;
};

const getEdamamFoodType = () => {
  return EdamamFoodType[Math.floor(Math.random() * EdamamFoodType.length)];
};

const url = "https://api.edamam.com/api/recipes/v2?";
// https://developer.edamam.com/edamam-docs-recipe-api#/

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method !== "GET") {
      res.status(404);
      return resolve();
    }
    let food = getEdamamFoodType();
    let foodRestrictions = getFoodRestrictions(JSON.parse(req.query.foodRestriction));
    let recipes = [];

    let edamamUrl =    url +
    new URLSearchParams({
      cuisineType: food,
      type: "public",
      app_id: process.env.EDAMAM_APP_ID,
      app_key: process.env.EDAMAM_KEY,
      random: true,
    });

    foodRestrictions.map((foodRestriction) => {
      edamamUrl += `&health=${foodRestriction}`;
    });

    fetch(edamamUrl)
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < 3; i++) {
          if (response.hits[i] !== undefined) {
            recipes.push({
              url: response.hits[i].recipe.url,
              label: response.hits[i].recipe.label,
            });
          }
        }
        food = { name: food, code: food, recipes }
        res.status(200).json({ foodType: food });
        return resolve();
      })
      .catch((err) => {
        food = { name: food}
        res.status(200).json({ foodType: food });
        return resolve();
      });
  });
}
