import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";
import { FaCartPlus } from "react-icons/fa";
import { useCurrency } from "../contexts/CurrencyProvider";

function Header() {
  const { cart } = useCart();
  const { currency, setCurrency } = useCurrency();

  return (
    <header>
      <h1>
        <NavLink to="/">Ecommerce</NavLink>
      </h1>
      <ul>
        <li>
          <NavLink to="/cart">
            <FaCartPlus className="cart-icon" /> Cart
          </NavLink>
          <div className="cart-circle">{cart.length}</div>
        </li>

        <li>
          <NavLink to="/wishlist">Wishlist</NavLink>
        </li>

        <li>
          <select
            value={currency} onChange={(e) => setCurrency(e.target.value)}
          >
           <option value="INR">₹ INR</option>
           <option value="USD">$ USD</option>
           <option value="EUR">€ EUR</option>
          </select>
        </li>

        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
