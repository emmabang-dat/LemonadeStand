import { Drink } from "@/interface/cocktail";

export const getRandomCocktail = (): Promise<Drink[]> => {
    const apiRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    const promises: Promise<Drink>[] = [];
  
    for (let i = 0; i < 5; i++) {
      promises.push(
        fetch(apiRandom)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            return data.drinks[0] as Drink;
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Rethrow the error to stop Promise.all if any request fails
          })
      );
    }
  
    return Promise.all(promises);
  };
  