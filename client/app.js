import React, { Component } from 'react';
import HelloWorld from '../src/helloworld';
import Article from '../src/article';
import SortForm from '../src/sort_form';
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
      return direction === "bigToSmall" ? b[key] - a[key] : a[key] - b[key];
    })
    this.setState({articles: articles});
  }

  sortDate = () => {
    this.sortFunction("date_published", "bigToSmall");
  }

  sortRating = () => {
    this.sortFunction("rating", "bigToSmall");
  }

  sortViews = () => {
    this.sortFunction("views", "bigToSmall");
  }

  sortDateReverse = () => {
    this.sortFunction("date_published");
  }

  sortRatingReverse = () => {
    this.sortFunction("rating");
  }

  sortViewsReverse = () => {
    this.sortFunction("views");
  }

  render() {
    const {loaded, error, articles, showSummaries} = this.state;

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
          <SortForm />
          <div className="sort">
            SORT BY:
            <div onClick={this.sortDate}>DATE (NEWEST)</div>
            <div onClick={this.sortDateReverse}>DATE (OLDEST)</div>
            <div onClick={this.sortRating}>RATING (HIGH)</div>
            <div onClick={this.sortRatingReverse}>RATING (LOW)</div>
            <div onClick={this.sortViews}>VIEWS (HIGH)</div>
            <div onClick={this.sortViewsReverse}>VIEWS (LOW)</div>
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
