import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// import components
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';

const App = () => {
  return(
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignUp} />
      <Footer />
    </Router>
);
};

export default App;
