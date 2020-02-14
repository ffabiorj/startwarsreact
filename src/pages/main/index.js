import React, { Component } from "react";
import api from "../../services/api";
import "./style.css";

export default class Main extends Component {
  // state armazenas as variaveis que seram utilizadas
  state = {
    people: [],
    pagesInfo: {},
    page: 1
  };
  // component is mounted when it is rendering.
  componentDidMount() {
    this.loadPeople();
  }

  loadPeople = async (page = 1) => {
    const response = await api.get(`/people?page=${page}`);

    // this setState atualizar as as variaves do object state
    this.setState({
      people: response.data.results,
      pagesInfo: response.data,
      page
    });
  };

  prevPage = () => {
    const { page, pagesInfo } = this.state;

    if (pagesInfo.previous === null) return;

    const pageNumber = page - 1;

    this.loadPeople(pageNumber);
  };
  nextPage = () => {
    const { page, pagesInfo } = this.state;
    if (pagesInfo.next === null) return;

    const pageNumber = page + 1;

    this.loadPeople(pageNumber);
  };

  render() {
    const { people, page, pagesInfo } = this.state;
    return (
      <div className="product-list">
        <h1>Personagens</h1>
        { people.map(person => (
          <article key={person.name}>
            <strong>{person.name}</strong>
            <div>
              <a href={person.url}>Informações</a>
            </div>
          </article>
        ))}
        <div className="actions">
          <button disabled = {page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled = { pagesInfo.next === null } onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    );
  }
}
