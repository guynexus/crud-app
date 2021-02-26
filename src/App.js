import  ReactTable  from './components/ReactTable';
import  MUITable  from './components/MUITable';
import  MUIAppBar  from './components/MUIAppBar';
import { Switch, Route } from 'react-router-dom';
import { useFetch } from './components/hooks';
import { logos } from './images';

import './styles/App.css';

export default function App() {

  const [ data, loading ] = useFetch();

  return ( <> {
    loading 
    ? <span>loading...</span> 
    : <>
      <MUIAppBar />
      {/* <MUITable caption = { 'Employees' } employees = { data } /> */}
      <main>
        <Switch>
          <Route path = '/' exact ><MUITable caption = { 'Employees' } employees = { data } /></Route>
          <Route path = '/react-table' exact ><ReactTable caption = { 'Employees' } employees = { data } /></Route>
          <Route path = '/mui-table' exact ><MUITable caption = { 'Employees' } employees = { data } /></Route>
        </Switch> 
      </main>
      <footer>
        <img alt = 'SQLite Logo'  src = {logos[0]} />
        <img alt = 'Express Logo' src = {logos[1]} />
        <img alt = 'React Table Logo' style = {{ margin: '0px 2px' }} src = {logos[2]} />
        <img alt = 'Node JS Logo' src = {logos[3]} />
      </footer>
    </>    
  } </> );  
}

