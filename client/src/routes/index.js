import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Frame from '../layouts/Frame';
import GoodsList from '../views/GoodsList';
import ShoppingCart from '../views/ShoppingCart';
import MyOrder from '../views/MyOrder';
import Home from '../views/Home'


const routes = browserHistory => (
  <BrowserRouter history={browserHistory}>
    <Frame>
      <Route path="/goods-list" component={Home} />
      {
        // <Route path="/shopping-cart" component={ShoppingCart} />
        // <Route path="/my-order" component={MyOrder} />
      }
    </Frame>
  </BrowserRouter>
);

export default routes;