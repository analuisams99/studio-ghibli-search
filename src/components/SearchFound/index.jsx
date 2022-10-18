import React, { Component } from 'react'
import './searchFound.css';

import sortIcon from '../../assets/sorted.png';

export default class SearchFound extends Component {
  render() {
    const { data, type, sorted, callbackParent } = this.props;

    switch (type) {
      case 'people':
        return (
          <table className="search-found-table">
            <thead>
              <tr className="sf-head-box">
                <th>
                  <button
                    type='button'
                    className='sort-button'
                    onClick={() => {
                      sorted === '' || sorted === 'peopleNameInAlphabeticalOrder'
                      ? callbackParent('peopleNameInReverseAlphabeticalOrder')
                      : callbackParent('peopleNameInAlphabeticalOrder')
                    }}
                  >
                    Name
                    <img className='sort-icon' src={ sortIcon } alt="sort icon" />
                  </button>
                </th>
                <th>Gender</th>
                <th>Age</th>
                <th>Hair color</th>
                <th>Eye color</th>
              </tr>
            </thead>

            <tbody>
              {data.map((people) => {
                return (
                  <tr key={ people.id } className="sf-body-box">
                    <td>{ people.name }</td>
                    <td>{ people.gender }</td>
                    <td>{ people.age !== "" ? people.age : 'N/A'  }</td>
                    <td>{ people.hair_color }</td>
                    <td>{ people.eye_color }</td>
                  </tr>
                )
              }) }
            </tbody>
          </table>
        )
      case 'locations':
        return (
          <table className="search-found-table">
            <thead>
              <tr className="sf-head-box">
                <th>
                  <button
                    type='button'
                    className='sort-button'
                    onClick={() => {
                      sorted === '' || sorted === 'locationInAlphabeticalOrder'
                      ? callbackParent('locationInReverseAlphabeticalOrder')
                      : callbackParent('locationInAlphabeticalOrder')
                    }}
                  >
                    Name
                    <img className='sort-icon' src={ sortIcon } alt="sort icon" />
                  </button>                  
                </th>
                <th>Climate</th>
                <th>Terrain</th>
                <th>Surface Water</th>
                <th>Residents</th>
              </tr>
            </thead>

            <tbody>
              {data.map((location) => {
                return (
                  
                  <tr key={ location.id } className="sf-body-box">
                    <td>{ location.name }</td>
                    <td>{ location.climate !== "TODO" ? location.climate : 'N/A' }</td>
                    <td>{ location.terrain !== "TODO" ? location.terrain : 'N/A' }</td>
                    <td>{ location.surface_water !== "TODO" ? location.surface_water : 'N/A' }</td>
                    <td>{ location.residents[0] !== "TODO" ? location.residents.length : 'N/A' }</td>
                  </tr>
                )
              }) }
            </tbody>
          </table>
        )
      default:
        return (
            <table className="search-found-table">
              <thead>
                <tr className="sf-head-box">
                  <th></th>
                  <th>
                    <button
                      type='button'
                      className='sort-button'
                      onClick={() => {
                        sorted === '' || sorted === 'titleInAlphabeticalOrder'
                        ? callbackParent('titleInReverseAlphabeticalOrder')
                        : callbackParent('titleInAlphabeticalOrder')
                      }}
                    >
                      Title
                      <img className='sort-icon' src={ sortIcon } alt="sort icon" />
                    </button>
                  </th>
                  <th>Director</th>
                  <th>Release <br /> Date</th>
                  <th>Running <br /> Time (min.)</th>
                  <th>
                    <button
                      type='button'
                      className='sort-button'
                      onClick={() => {
                        sorted === '' || sorted === 'ascendingSortedScore'
                        ? callbackParent('descendingSortedScore')
                        : callbackParent('ascendingSortedScore')
                      }}
                    >
                      Score
                      <img className='sort-icon' src={ sortIcon } alt="sort icon" />
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((film) => {
                  return (
                    <tr
                      key={ film.id }
                      className="sf-body-box"
                      title={ `Description of '${ film.title }': \n - ${ film.description }`}
                    >
                      <td>
                        <img className="sf-img" src={ film.image } alt={ film.title } />
                      </td>
                      <td id="film-title">{ film.title } <br /> <br /> { film.original_title } </td>
                      <td>{ film.director }</td>
                      <td>{ film.release_date }</td>
                      <td>{ film.running_time }</td>
                      <td id="star-icon">
                        { film.rt_score }
                      </td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
        )
    }
  }
}
