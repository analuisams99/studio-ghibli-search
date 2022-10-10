import React, { Component } from 'react'
import SearchFound from '../SearchFound';
import './search.css';

import iconSearch from '../../assets/iconLupa.png';

import { getFilms } from '../../services/filmsAPI';
import { getPeople } from '../../services/peopleAPI';
import { getLocations } from '../../services/locationsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      haveAnAnswer: false,
      data: {
        films: [],
        people: [],
        locations: [],
      },
      valueName: '',
      type: 'films',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults = async () => {
    const filmsFetch = await getFilms();
    const peopleFetch = await getPeople();
    const locationsFetch = await getLocations();

    this.setState({
      data: {
        films: filmsFetch,
        people: peopleFetch,
        locations: locationsFetch,
      },
      haveAnAnswer: true,
    });
  }

  async handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleType() {
    const selectBox = document.getElementById("search-select");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;

    switch (selectedValue) {
      case 'people':
        this.setState({ type: 'people' })
        break;
      case 'locations':
        this.setState({ type: 'locations' })
        break;
      default:
        this.setState({ type: 'films' })
    }
  }

  handleSearchResult() {
    const { data, valueName, type } = this.state;

    const regex = new RegExp(`${valueName.toLowerCase()}`, 'g');
    let matchedValues = [];

    switch (type) {
      case 'people':
        matchedValues = data.people.filter(({name}) => name.toLowerCase().match(regex));
        break;
      case 'locations':
        matchedValues = data.locations.filter(({name}) => name.toLowerCase().match(regex));
        break;
      default:
        matchedValues = data.films.filter(({title}) => title.toLowerCase().match(regex));
    }
    return matchedValues;
  }

  render() {
    const matchedValues = this.handleSearchResult();
    const { type, valueName } = this.state;

    return (
      <>
        <div id="search-container">
          <div id="search-box">
            <input
              type="text"
              id="search-txt"
              placeholder="Search here..."
              onChange={ this.handleChange }
              value={ valueName }
              name="valueName"
            />
            <div id="search-icon-box">
              <img src={ iconSearch } id="search-icon" alt="Buscar" />
            </div>
          </div>
          <select id="search-select" onChange={ () => this.handleType() }>
            <option value="films" className="select-items">
              Films
            </option>
            <option value="people" className="select-items">
              People
            </option>
            <option value="locations" className="select-items">
              Locations
            </option>
          </select>
        </div>

        <section>
          { matchedValues.length === 0 ? (
              <div id="not-found">
                <h2>No results found...</h2>
                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ccaa6b40-c9e1-4fca-a714-e73eb7a0d47d/d998yjs-cbde5b99-d8ed-409d-97a3-e2dc4807c12b.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NjYWE2YjQwLWM5ZTEtNGZjYS1hNzE0LWU3M2ViN2EwZDQ3ZFwvZDk5OHlqcy1jYmRlNWI5OS1kOGVkLTQwOWQtOTdhMy1lMmRjNDgwN2MxMmIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.w_ylhhl95jf2l30TmRMSA_R1MUFPE87ixkewFFWO5Zk" alt="Gif de três bichinhos do studio ghibli piscando" />
              </div>
            ) 
            : <SearchFound data={ matchedValues } type={ type } /> 
          }
        </section>
      </>
    )
  };
};
