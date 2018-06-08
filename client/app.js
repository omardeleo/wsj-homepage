import React, { Component } from 'react';
import HelloWorld from '../src/helloworld';
import Article from '../src/article';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import free from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
fontawesome.library.add(brands, free, regular);

import style from '../client/style/main.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleSummaries = this.toggleSummaries.bind(this);
    this.sortFunction = this.sortFunction.bind(this);
    this.state = {
      articles: null,
      error: null,
      loaded: false,
      showSummaries: false,
      displayArticles: null,
      categories: null,
      sort: null,
      filter: null
    };
  }

  componentDidMount() {
    //fetching data clientside
    fetch('/api/articles').then((data) => {
      return data.json();
    }).then((data) => {
      let articles = data.items;
      articles.map(article => {
        article.rating = this.ratingGenerator(2.8,5);
        article.views = this.viewsGenerator(100000, 1367000);
        article.date_published = new Date(article.date_published);
      });
      articles = articles.filter(article => typeof article.date_published === "object");
      articles = articles.filter(article => article.image);
      let categories = articles.map(article => article.category);
      categories = [...new Set(categories)];
      this.setState({
        articles: articles,
        displayArticles: articles,
        categories: categories,
        loaded: true,
        sort: "date-max",
        filter: "All"
      });
    }).catch((error) => {
      this.setState({
        error: error,
        loaded: true
      });
    });
  }

  //click handler for button
  toggleSummaries() {
    // console.log('toggle button clicked');
    this.setState((prevState, props) => ({
      showSummaries: !prevState.showSummaries
    }))
  }

  ratingGenerator(min,max) {
    let num = Math.random() * (max - min) + min;
    return Number(num.toFixed(1));
  }

  viewsGenerator(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sortFunction(articles, key, direction) {
    return articles.sort(function(a,b) {
      return direction === "max" ? b[key] - a[key] : a[key] - b[key];
    })
  }

  sortRouter(sortValue, articles) {
    if (sortValue === "date-max") {
      return this.sortFunction(articles, "date_published", "max");
    } else if (sortValue === "date-min") {
      return this.sortFunction(articles, "date_published");
    } else if (sortValue === "rating-max") {
      return this.sortFunction(articles, "rating", "max");
    } else if (sortValue === "rating-min") {
      return this.sortFunction(articles, "rating");
    } else if (sortValue === "views-max") {
      return this.sortFunction(articles, "views", "max");
    } else if (sortValue === "views-min") {
      return this.sortFunction(articles, "views");
    }
  }

  filterFunction(sort, filter) {
    let articles = this.state.articles;
    if (filter !== "All") {
      articles = articles.filter(article => article.category === filter);
      articles = this.sortRouter(sort, articles);
    } else {
      articles = this.sortRouter(sort, articles);
    }
    this.setState({displayArticles: articles, sort, filter});
  }

  filterSelector(key) {
    let sort, filter;
    if (key === "sort") {
      sort = this.refs.sort.value;
      filter = this.state.filter;
      this.filterFunction(sort, filter);
    } else {
      sort = this.state.sort;
      filter = this.refs.filter.value;
      this.filterFunction(sort, filter);
    }
  }

  render() {
    const {loaded, error, displayArticles, showSummaries, articles, categories, category} = this.state;
    let options = null;
    if (categories) {
      options = categories.map( (category, idx) => {
        return <option value={category} key={idx}>{category}</option>;
      });
    }


    if (error) {
      return <div>Sorry! Something went wrong</div>
    } else if (!loaded) {
      return <div>Loading...</div>
    } else {
      let articleJSX = [];
      displayArticles.map((article, idx) => {
        articleJSX.push(
          <Article
            key={idx}
            headline={article.headline}
            summary={article.summary}
            showSummary={showSummaries}
            image={article.image}
            date={article.date_published}
            idx={idx}
            rating={article.rating}
            views={article.views}
            link={article.share_link}
            category={article.category}
          />);
      });
      let date = new Date(Date.now()).toLocaleString("en-EN", {month: "long", day: "numeric", year: "numeric"})
      return (
        <div>
        <HelloWorld />
        <div className="main">
          <div className="date">{date}</div>
          <div className="filters">
            <div className="sort-form">
              <select ref="sort" onChange={ (e) => { this.filterSelector("sort") } }>
                <option value="date-max">Date (Newer)</option>
                <option value="date-min">Date (Older)</option>
                <option value="rating-max">Rating (Higher)</option>
                <option value="rating-min">Rating (Lower)</option>
                <option value="views-max">Views (More)</option>
                <option value="views-min">Views (Less)</option>
              </select>
            </div>
            <div className="filter-form">
              <select ref="filter" onChange={ (e) => { this.filterSelector("filter") } }>
                <option value="All">All</option>
                {options}
              </select>
            </div>
          </div>
          <div className="articles-container">
            {articleJSX}
          </div>
        </div>
      </div>

      );

    }
  }
}

export default App;
