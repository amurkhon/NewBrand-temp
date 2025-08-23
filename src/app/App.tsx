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

function App() {
  const location = useLocation();
  return (
    <>
      { location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        <Route path={"/products"} >
          <ProductPage />
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
    </>
  );
}

export default App;





