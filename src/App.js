import React from 'react';
import Search from './components/Search';

class App extends React.Component {
  render() {
    return (
      <>
        <img
          id="header-image"
          src="https://ghibliapi.herokuapp.com/images/logo.svg"
          alt="logo Studio Ghibli"
        />
        <Search />
      </>
    );
  }
}

export default App;
