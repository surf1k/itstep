import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "01 Lounge",
    description: "Molded walnut plywood. Ergonomic sculptural form.",
    price: 650,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "02 Beam",
    description: "Linear steel floor lamp. Matte black powder coat.",
    price: 320,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "03 Cloud",
    description: "Lounge module in Italian gray linen. Deep-set comfort.",
    price: 2400,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "04 Moment",
    description: "Frameless wall clock. Silent sweep mechanism.",
    price: 120,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "05 Rest",
    description: "Emerald velvet upholstery. Contemporary silhouette.",
    price: 1800,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "06 Task",
    description: "Adjustable aluminum task light. Precision optics.",
    price: 180,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80"
  }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <header className="header">
        <div className="logo">S T U D I O</div>
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          <span className="cart-label">CART ({totalItems})</span>
        </div>
      </header>

      <section className="hero">
        <div className="gallery">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`slide ${idx === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-content">
            <h1>ESSENTIALISM</h1>
            <p>Form meets function. Minimal by design.</p>
          </div>
        </div>
      </section>

      <main className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
              <button className="quick-add" onClick={() => addToCart(product)}>+ ADD</button>
            </div>
            <div className="product-info">
              <div className="product-main">
                <h3>{product.name}</h3>
                <span className="price">${product.price}</span>
              </div>
              <p className="description">{product.description}</p>
            </div>
          </div>
        ))}
      </main>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>BAG</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-msg">Empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <div className="item-header">
                        <h4>{item.name}</h4>
                        <span className="item-price">${item.price * item.quantity}</span>
                      </div>
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="total">
                  <span>TOTAL</span>
                  <span>${totalPrice}</span>
                </div>
                <button className="checkout-btn">CHECKOUT</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
