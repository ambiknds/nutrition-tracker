import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";

export default function Food(props) {
  const [eatenQuantity, setEatenQuantity] = useState(100);
  const [food, setFood] = useState({});
  const [foodInitial, setFoodInitial] = useState({});
  let loggedData = useContext(UserContext);

  useEffect(() => {
    setFood(props.food);
    setFoodInitial(props.food);
    // console.log(food)
    // console.log(loggedData)
  }, [props.food]);

  function calculateMacros(event) {
    if (event.target.value.length !== 0) {
      let quantity = Number(event.target.value);
      setEatenQuantity(quantity);
      // console.log('quantity', quantity')

      let copyFood = { ...food };

      copyFood.protein = (foodInitial.protein * quantity) / 100;
      copyFood.carbohydrates = (foodInitial.carbohydrates * quantity) / 100;
      copyFood.fat = (foodInitial.fat * quantity) / 100;
      copyFood.fiber = (foodInitial.fiber * quantity) / 100;
      copyFood.calories = (foodInitial.calories * quantity) / 100;

      // return food;
      console.log(copyFood);
      setFood(copyFood);
    }
    console.log(event.target.value);
  }

  function trackFoodItem() {
    let trackItem = {
      userId: loggedData.loggedUser.userId,
      foodId: food._id,
      details: {
        protein: food.protein,
        carbohydrates: food.carbohydrates,
        fat: food.fat,
        fiber: food.fiber,
        calories: food.calories,
      },
      quantity: eatenQuantity,
      // date: new Date(),
    };
    console.log(trackItem);
    fetch("http://localhost:8000/track", {
      method: "POST",
      body: JSON.stringify(trackItem),
      headers: {
        Authorization: `Bearer ${loggedData.loggedUser.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="food">
      <Header />
      <div className="food-img">
        <img src={food.imageUrl} alt="image" />
      </div>
      <h2>
        {food.name} ({food.calories} Kcal for {eatenQuantity}Gms)
      </h2>
      <div className="nutrient">
        <p className="n-title">Protein</p>
        <p className="n-value">{food.protein}g</p>
      </div>
      <div className="nutrient">
        <p className="n-title">Carbs</p>
        <p className="n-value">{food.carbohydrates}g</p>
      </div>
      <div className="nutrient">
        <p className="n-title">Fat</p>
        <p className="n-value">{food.fat}g</p>
      </div>
      <div className="nutrient">
        <p className="n-title">Fiber</p>
        <p className="n-value">{food.fiber}g</p>
      </div>
      <div className="nutrient">
        <p className="n-title">Calories</p>
        <p className="n-value">{food.calories}g</p>
      </div>
      <div className="track-control">
        <input
          type="number"
          className="inp"
          onChange={calculateMacros}
          placeholder="Quantity in Grams"
        />
        <button onClick={trackFoodItem}>Track</button>
      </div>
    </div>
  );
}
