import "../css/app.css";
import { Route, Switch, useLocation } from "react-router-dom";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import ProductPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import HomePage from "./screens/homePage";
import Footer from "./components/footer";
import "../css/footer.css";
import "../css/navbar.css";
import AuthenticationModal from "./components/auth";
import useBasket from "./hooks/useBasket";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  return (
    <>
      { location.pathname === "/" 
        ? <HomeNavbar
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete = {onDelete}
            onDeleteAll = {onDeleteAll}
          /> 
        : <OtherNavbar
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete = {onDelete}
            onDeleteAll = {onDeleteAll}
          />
      }
      <Switch>
        <Route path={"/products"} >
          <ProductPage onAdd = {onAdd} />
        </Route>
        <Route path={"/orders"} >
          <OrdersPage />
        </Route>
        <Route path={"/member-page"} >
          <UserPage />
        </Route>
        <Route path={"/help"} >
          <HelpPage />
        </Route>
        <Route path={"/"} >
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal />
    </>
  );
}

export default App;





