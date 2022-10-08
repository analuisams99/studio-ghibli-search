import React, { Component } from 'react'
import './searchFound.css';

export default class SearchFound extends Component {
  render() {
    const { data, type } = this.props;
    
    switch (type) {
      case 'people':
        return (
          <table className="search-found-table">
            <thead>
              <tr className="sf-head-box">
                <th>Name</th>
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
                <th>Name</th>
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
                  <th>Title</th>
                  <th>Original Title</th>
                  <th>Director</th>
                  <th>Score</th>
                </tr>
              </thead>

              <tbody>
                {data.map((film) => {
                  return (
                    
                    <tr key={ film.id } className="sf-body-box">
                      <td>
                        <img className="sf-img" src={ film.image } alt={ film.title } />
                      </td>
                      <td>{ film.title }</td>
                      <td>{ film.original_title }</td>
                      <td>{ film.director }</td>
                      <td>{ film.rt_score }</td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
        )
    }
  }
}
