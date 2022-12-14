import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// import components
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';

const App = () => {
  return(
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/search" component={Search} />
      <Footer />
    </Router>
);
};

export default App;
