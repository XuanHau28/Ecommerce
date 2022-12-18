import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';

// import components
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import UserOptions from './components/Layout/Header/UserOptions.js';
import Profile from './components/User/Profile.js';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile.js';




const App = () => {

  const {isAuthenticated, user} = useSelector((state) => state.user)

  React.useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return(
    <Router>
      { isAuthenticated && <UserOptions user={user} />}
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <Footer />
    </Router>
);
};

export default App;
