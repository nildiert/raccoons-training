import React from 'react';
import './Shopping.css'; // Importa tus estilos CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de carrito de compras

const Shopping = ({ toggleSidebar, isSidebarOpen }) => {
  const products = [
    { name: 'Camiseta', price: '$60k', image: 'https://contents.mediadecathlon.com/p2174768/k$6e6db5bc924a01488ea6197b9e4d4f4e/camiseta-trail-hombre-running-caqui-manga-corta-cremallera.jpg?format=auto&quality=40&f=452x452' },
    { name: 'Gorra', price: '$35k', image: 'https://lacasadeltrailrunning.com/wp-content/uploads/2021/02/Gorra-buff-trail-running-9-La-Casa-Del-Trail-Running.jpg' },
    { name: 'Buff', price: '$10k', image: 'https://lacasadeltrailrunning.com/wp-content/uploads/2021/12/Braga-Cuello-Azara-Storm-Edition-Sport-Hg-La-Casa-Del-Trail-Running.jpg' },
    { name: 'Mangas para Brazos', price: '$20k', image: 'https://m.media-amazon.com/images/I/61fqY4o9uqL._AC_UF894,1000_QL80_.jpg' }
  ];

  return (
    <div className="shopping my-5">
      {products.map(product => (
        <div className="product-card" key={product.name}>
          <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
            <div className="product-overlay">
              <div className="product-name">{product.name}</div>
              <div className="product-details">
                <span className="product-price">{product.price}</span>
                <button className="add-to-cart-btn">
                  <FontAwesomeIcon icon={faShoppingCart} /> Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Shopping;
