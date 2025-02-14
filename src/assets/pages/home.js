import React, { useState } from "react";
import "./home.css";
import Img1 from "../components/img/img1.jpg";
import Img2 from "../components/img/img2.jpg";
import Img3 from "../components/img/img3.jpg";
import Img4 from "../components/img/img4.jpg";
import Img5 from "../components/img/img5.jpg";

// import Dropdown from "react-bootstrap/Dropdown";

function Home() {
  const [showAll, setShowAll] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const property = {
    name: "La Rose",
    market: "Güllər",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus modi cum temporibus est voluptatibus recusandae magni cupiditate saepe ut fugiat.",
  };

  const products = [
    { id: 1, img: Img1, name: "Rose", desc: "Lorem lorem", price: 55 },
    { id: 2, img: Img2, name: "Tulip", desc: "Beautiful tulip", price: 60 },
    { id: 3, img: Img3, name: "Lily", desc: "Elegant lily", price: 70 },
    { id: 4, img: Img4, name: "Orchid", desc: "Exotic orchid", price: 80 },
    { id: 5, img: Img5, name: "Daisy", desc: "Cheerful daisy", price: 50 },
    { id: 1, img: Img1, name: "Rose", desc: "Lorem lorem", price: 55 },
    { id: 2, img: Img2, name: "Tulip", desc: "Beautiful tulip", price: 60 },
    { id: 3, img: Img3, name: "Lily", desc: "Elegant lily", price: 70 }
  ];

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <button
        className="cart-button"
        onClick={() => setShowCart(!showCart)}
        style={{ position: "fixed", top: "20px", right: "20px" }}
      >
        Səbət ({cart.reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      {showCart && (
        <div className="dropdown">
          <h4>Səbət</h4>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.price} AZN x {item.quantity}
                  <button onClick={() => removeFromCart(item.id)}>Sil</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Səbət boşdur</p>
          )}
          <h5>Ümumi: {totalPrice} AZN</h5>
        </div>
      )}

      {/* {showCart && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Səbət
          </Dropdown.Toggle>
          {cart.length > 0 ? (
            <Dropdown.Menu>
              {cart.map((item) => (
                <Dropdown.Item key={item.id}>
                  {item.name} - {item.price} AZN x {item.quantity}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          ) : (
            <p>Səbət boşdur</p>
          )}
          <h5>Ümumi: {totalPrice} AZN</h5>
        </Dropdown>
      )} */}

      <section className="heroSection">
        <div className="heroText container">
          <h1>{property.name}</h1>
          <h4>{property.market}</h4>
          <p>{property.description}</p>
          <button className="btn cart-button" type="button">
            Katalog
          </button>
        </div>
      </section>

      <h3 className="text-center mt-5 colo-fff">Bestseller</h3>
      <section className="container mt-3">
        <div
          id="photoCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {products.map((product, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={product.id}
              >
                <div className="text-center">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="img-fluid rounded"
                    style={{
                      maxWidth: "60%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="mt-3 colo-fff">
                    {product.name} - {product.price}
                  </h5>
                  <p className="colo-fff">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#photoCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#photoCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </section>
      <hr />
      <h3 className="katalogDec mt-4">Katalog</h3>
      <section className="bestsellerSection container mt-3">
        {(showAll ? products : products.slice(0, 4)).map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
            <article>
              <h5 className="container">{product.name}</h5>
              <p>{product.desc}</p>
              <p>{product.price} AZN</p>
              <button className="btn fs-sml" onClick={() => addToCart(product)}>
                Səbətə əlavə et
              </button>
            </article>
          </div>
        ))}
      </section>
      <div className="text-center mt-3">
        <button className="btn btn-light" onClick={toggleShowAll}>
          {showAll ? "Daha az göstər" : "Daha çox göstər"}
        </button>
      </div>
      <hr />
      <section className="about-us container text-center mt-5">
        <h2>ABOUT US</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>
      <footer className="footer text-center mt-5 p-3">
        <p>&copy; 2025 La Rose. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
