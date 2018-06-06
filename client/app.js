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
      showSummaries: false
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
      this.setState({
        articles: articles,
        loaded: true
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

  sortFunction(key, direction) {
    let articles = this.state.articles;
    articles = articles.sort(function(a,b) {
      return direction === "max" ? b[key] - a[key] : a[key] - b[key];
    })
    this.setState({articles: articles});
  }

  sortSelector() {
    if (this.refs.sort.value === "date-max") {
      this.sortFunction("date_published", "max");
    } else if (this.refs.sort.value === "date-min") {
      this.sortFunction("date_published");
    } else if (this.refs.sort.value === "rating-max") {
      this.sortFunction("rating", "max");
    } else if (this.refs.sort.value === "rating-min") {
      this.sortFunction("rating");
    } else if (this.refs.sort.value === "views-max") {
      this.sortFunction("views", "max");
    } else if (this.refs.sort.value === "views-min") {
      this.sortFunction("views");
    }
  }

  render() {
    const {loaded, error, articles, showSummaries} = this.state;

    let headlines = articles ? articles.map(article => article.category) : null;
    headlines = [...new Set(headlines)].sort();
    headlines = headlines.map(headline => {
      console.log(headline);
      return <option value={headline}>{headline}</option>;
    });
    console.log(headlines);
    if (error) {
      return <div>Sorry! Something went wrong</div>
    } else if (!loaded) {
      return <div>Loading...</div>
    } else {
      let articleJSX = [];

      articles.filter(article => article.image)
        .map((article, idx) => {
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
          />);
      });

      return (
        <div>
          <HelloWorld />
          <div className="sort-form">
            <select ref="sort" onChange={ (e) => { this.sortSelector() } }>
              <option value="date-max">Date (Newer)</option>
              <option value="date-min">Date (Older)</option>
              <option value="rating-max">Rating (Higher)</option>
              <option value="rating-min">Rating (Lower)</option>
              <option value="views-max">Views (More)</option>
              <option value="views-min">Views (Less)</option>
            </select>
          </div>
          <div className="filter-form">
            <select ref="filter" onChange={ (e) => { this.sortSelector() } }>
              {headlines}
            </select>
          </div>
          <div className="articles-container">
            {articleJSX}
          </div>
        </div>
      );

    }
  }
}

export default App;
