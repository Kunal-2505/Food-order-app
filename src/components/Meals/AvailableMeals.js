import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const DUMMY_MEALS = async () => {
      const response = await fetch(
        "https://react-http-94d4d-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      console.log(response.status);
      const data = await response.json();
      const loadedMeals = [];
      console.log(data);
      for (const key in data) {
        //console.log(key);
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);

      setLoading(false);
    };
    DUMMY_MEALS().catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  }, []);
  if (loading) {
    return (
      <section className={classes.loadingState}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
