import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data";
import { FaSeedling, FaHeart, FaRegHeart } from "react-icons/fa6";

function Header() {
  return (
    <header className="header">
      <h1>Andy's Pizza Co.</h1>
    </header>
  );
}

function Pizza({ pizza, isFavourite, onToggleFavourite }) {
  return (
    <li className={pizza.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={pizza.photoName} alt={pizza.name} />

      <div className="pizza-details">
        <h3>
          {pizza.name}
          {pizza.category === "veg" && (
            <FaSeedling
              size={16}
              color="green"
              aria-label="Vegetarian"
            />
          )}
        </h3>

        {pizza.isPopular && !pizza.soldOut && (
          <span className="badge">Chef's pick</span>
        )}

        <p>{pizza.ingredients}</p>

        <span className="pizza-price">
          {pizza.soldOut
            ? "SOLD OUT"
            : `$${pizza.price.toFixed(2)}`}
        </span>

        <button
          type="button"
          className="favourite-btn"
          onClick={() => onToggleFavourite(pizza.name)}
          aria-label={
            isFavourite
              ? `Remove ${pizza.name} from favourites`
              : `Add ${pizza.name} to favourites`
          }
          aria-pressed={isFavourite}
        >
          {isFavourite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </li>
  );
}

function PizzaSection({
  title,
  pizzas,
  favourites,
  onToggleFavourite
}) {
  return (
    <section className="pizza-section">
      <h3>{title}</h3>

      <ul className="pizzas">
        {pizzas.map((pizza) => (
          <Pizza
            key={pizza.name}
            pizza={pizza}
            isFavourite={favourites.includes(pizza.name)}
            onToggleFavourite={onToggleFavourite}
          />
        ))}
      </ul>
    </section>
  );
}

function Menu() {
  const hour = new Date().getHours();
  const isOpen = hour >= 10 && hour < 22;

  // Search state
  const [search, setSearch] = useState("");

  // Favourites state
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  // Function to add or remove a favourite
  function toggleFavourite(pizzaName) {
    setFavourites((currentFavourites) =>
      currentFavourites.includes(pizzaName)
        ? currentFavourites.filter((name) => name !== pizzaName)
        : [...currentFavourites, pizzaName]
    );
  }

  // Filter pizzas by search and favourites
  const filteredPizzas = pizzaData.filter((pizza) => {
    const matchesSearch = (
      pizza.name + " " + pizza.ingredients
    )
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFavourites =
      !showFavourites || favourites.includes(pizza.name);

    return matchesSearch && matchesFavourites;
  });

  // Separate filtered pizzas into categories
  const vegPizzas = filteredPizzas.filter(
    (pizza) => pizza.category === "veg"
  );

  const meatPizzas = filteredPizzas.filter(
    (pizza) => pizza.category === "meat"
  );

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {isOpen && <p>Authentic Italian Cuisine</p>}

      {pizzaData.length > 0 ? (
        <>
          <div className="search-container">
            <label htmlFor="pizza-search">Find your pizza</label>
            <input
              id="pizza-search"
              type="search"
              placeholder="Search pizza or ingredients..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        
          <button
            type="button"
            className={`favourites-filter ${showFavourites ? "active" : ""}`}
            onClick={() => setShowFavourites(!showFavourites)}
            aria-pressed={showFavourites}
          >
            <FaHeart />
            Favourites ({favourites.length})
          </button>

          {filteredPizzas.length > 0 ? (
            <>
              {vegPizzas.length > 0 && (
                <PizzaSection
                  title="Vegetarian"
                  pizzas={vegPizzas}
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                />
              )}

              {meatPizzas.length > 0 && (
                <PizzaSection
                  title="Meat Lovers"
                  pizzas={meatPizzas}
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                />
              )}
            </>
          ) : (
            <p>
              {showFavourites
                ? "No favourite pizzas match your search."
                : "No pizzas found. Try another search."}
            </p>
          )}
        </>
      ) : (
        <p>
          We're still working on our menu.
          Please come back later :)
        </p>
      )}
    </main>
  );
}


function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 until {closeHour}:00.
        Come visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;

  const isOpen = hour >= openHour && hour < closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We're happy to welcome you between
          {" "}{openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
