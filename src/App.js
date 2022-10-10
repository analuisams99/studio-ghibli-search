import React from 'react';
import Search from './components/Search';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <img
            id="header-image"
            src="https://ghibliapi.herokuapp.com/images/logo.svg"
            alt="logo Studio Ghibli"
          />
        </header>
        <main>
          <Search />
        </main>
      </>
    );
  }
}

export default App;
