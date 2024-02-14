import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";

export default function Diet() {
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());
  let loggedData = useContext(UserContext);
  let [total, setTotal]= useState({
    totalProtein: 0,
    totalCarbohydrates: 0,
    totalFats: 0,
    totalFiber: 0,
    totalCalories: 0,
  });

  useEffect(() => {
    fetch(
      `http://localhost:8000/track/${loggedData.loggedUser.userId}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${loggedData.loggedUser.token}`,
        },
      },
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  useEffect(()=>{
    calculateTotal();
  },[items])

  function calculateTotal(){
    let totalCopy = {
        totalProtein: 0,
        totalCarbohydrates: 0,
        totalFats: 0,
        totalFiber: 0,
        totalCalories: 0,
    };
    items.forEach((item) => {
      totalCopy.totalCalories += item.details.calories;
      totalCopy.totalProtein += item.details.protein;
      totalCopy.totalCarbohydrates += item.details.carbohydrates;
      totalCopy.totalFats += item.details.fat;
      totalCopy.totalFiber += item.details.fiber;

    })
    setTotal(totalCopy);
  }

  return (
    <section className="container diet-container">
      <Header />

      <input type="date" onChange={(event)=>{
        setDate(new Date(event.target.value))
       // console.log(new Date(event.target.value))
      }}/>
      
      {
        items.length !== 0 ? (
          items.map((item) => {


            return (
              <div className="item" key={item._id}>
                <h3>
                  {item.foodId.name} ({items.details.calories}Kcal for{" "}
                  {item.quantity}g)
                </h3>
                <p>Protein: {item.details.protein}g</p>
                <p>Carbohydrates: {item.details.carbohydrates}g</p>
                <p>Fats: {item.details.fats}g</p>
                <p>Fiber: {item.details.fiber}g</p>
              </div>
            );
          })
        )
      : null
      }
      <div className="item">
        <h3>{total.totalCalories}</h3>
        <p>Protein: {total.totalProtein}g</p>
        <p>Carbohydrates: {total.totalCarbohydrates}g</p>
        <p>Fats: {total.totalFats}g</p>
        <p>Fiber: {total.totalFiber}g</p>
      </div>
      
    </section>
  );
}
