import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AddProduct from './components/AddProduct/AddProduct';
import Products from './components/Products/Products';
import ProductUpdate from './components/ProductUpdate/ProductUpdate';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/addproduct">
            <AddProduct></AddProduct>
          </Route>
          <Route path="/update/:id">
            <ProductUpdate></ProductUpdate>
          </Route>
          <Route path="/products">
            <Products></Products>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
