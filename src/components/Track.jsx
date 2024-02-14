import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import Food from "./Food";

export default function Track() {
  const [foodItems, setFoodItems] = useState([]);
  const [food, setFood] = useState(null);
  const loggedData = useContext(UserContext);
  function searchFood(event) {
    console.log(event.target.value);
    if (event.target.value !== "") {
      fetch(`http://localhost:8000/foods/${event.target.value}`, {
        method: "GET",
        headers: {
         " Authorization": `Bearer ${loggedData.loggedUser.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === undefined) {
            setFoodItems(data);
            console.log(data);
          } else {
            setFoodItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFoodItems([]);
    }
  }

  return (
    <>
      <Header />
      <section className="container track-container">
        <div className="search">
          <input
            type="search"
            placeholder="Search Food Item"
            className="search-inp"
            onChange={searchFood}
          />
          {foodItems.length !== 0 ? (
            <div className="search-results">
              {foodItems.map((item) => {
                return (
                  <p
                    className="item"
                    key={item._id}
                    onClick={() => {
                      setFood(item);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          ) : null}
        </div>
        {food !== null ? <Food food={food} /> : null}
      </section>
    </>
  );
}
