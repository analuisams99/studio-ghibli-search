import React, { Component } from 'react'
import SearchFound from '../SearchFound';
import './search.css';

import iconSearch from '../../assets/iconLupa.png';

import { fetchAPI } from '../../services/fetchAPI';

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
      sorted: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSortedResult = this.handleSortedResult.bind(this);
    this.handleOnChildChanged = this.handleOnChildChanged.bind(this);
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults = async () => {
    const filmsFetch = await fetchAPI('films');
    const peopleFetch = await fetchAPI('people');
    const locationsFetch = await fetchAPI('locations');

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

  handleSortedResult() {
    const { sorted } = this.state;
    
    let result = this.handleSearchResult();
    
    switch (sorted) {
      case 'titleInAlphabeticalOrder':
        result = result.sort((a, b) => a.title < b.title ? -1 : 1);
        break;
      case 'titleInReverseAlphabeticalOrder':
        result = result.sort((a, b) => a.title < b.title ? 1 : -1);
        break;
      case 'peopleNameInAlphabeticalOrder':
        result = result.sort((a, b) => a.name < b.name ? -1 : 1);
        break;
      case 'peopleNameInReverseAlphabeticalOrder':
        result = result.sort((a, b) => a.name < b.name ? 1 : -1);
        break;
      case 'locationInAlphabeticalOrder':
        result = result.sort((a, b) => a.name < b.name ? -1 : 1);
        break;
      case 'locationInReverseAlphabeticalOrder':
        result = result.sort((a, b) => a.name < b.name ? 1 : -1);
        break;
      case 'ascendingSortedScore':
        result = result.sort((a, b) => +a.rt_score < +b.rt_score ? -1 : 1);
        break;
      case 'descendingSortedScore':
        result = result.sort((a, b) => +a.rt_score < +b.rt_score ? 1 : -1);
        break;
      default:
        return result;
    }
    return result;
  }

  handleOnChildChanged(data) {
    this.setState({ sorted: data });
  }

  render() {
    const matchedValues = this.handleSortedResult();
    const { type, valueName, sorted } = this.state;

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
            : <SearchFound
                data={ matchedValues }
                type={ type }
                sorted={ sorted }
                callbackParent={(data) => this.handleOnChildChanged(data)}
              /> 
          }
        </section>
      </>
    )
  };
};
