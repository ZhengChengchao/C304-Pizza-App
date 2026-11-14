import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


function Header() {
  return (
    <h1
      style={{
        color: "orange",
        fontSize: "48px",
        textTransform: "uppercase"
      }}
    >
      Andy's Pizza Co.
    </h1>
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
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <Pizza />
      <Pizza />
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();

  return (
    <footer className="footer">
      {hour >= 10 && hour < 22
        ? "We're currently open"
        : "Sorry we're closed"}
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
