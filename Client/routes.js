import Home from './components/home/HomePage';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/start',
    component: Home,
    exact: true
  }
];

export default routes;
