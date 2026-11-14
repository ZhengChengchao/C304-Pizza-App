import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data";

function Header() {
  return (
    <header className="header">
      <h1>Andy's Pizza Co.</h1>
    </header>
  );
}

function Pizza(props) {
  return (
    <li className={props.pizza.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={props.pizza.photoName} alt={props.pizza.name} />
      <div>
        <h3>{props.pizza.name}</h3>
        <p>{props.pizza.ingredients}</p>
        <span>{props.pizza.soldOut ? "SOLD OUT" : props.pizza.price}</span>
      </div>
    </li>
  );
}

function Menu() {
  const hour = new Date().getHours();
  const isOpen = hour >= 10 && hour < 22;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {isOpen && <p>Authentic Italian Cuisine</p>}

      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </main>
  );
}

function Order() {
  return (
    <div className="order">
      <p>We're currently open</p>
      <button className="btn">Order</button>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const isOpen = hour >= 10 && hour < 22;

  return (
    <footer className="footer">
      {isOpen ? <Order /> : <p>Sorry, we're closed</p>}
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
