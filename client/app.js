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
      });
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

  sortDate = () => {
    let articles = this.state.articles;
    articles.map(article => {
      article.date_published = new Date(article.date_published);
    })
    articles = articles.filter(article => typeof article.date_published === "object");
    articles.sort(function(a,b) {
      return b.date_published - a.date_published;
    })
    this.setState({articles: articles});
  }

  sortRating = () => {
    let articles = this.state.articles;
    articles.sort(function(a,b) {
      return b.rating - a.rating;
    })
    this.setState({articles: articles});
  }

  sortViews = () => {
    let articles = this.state.articles;
    articles.sort(function(a,b) {
      return b.views - a.views;
    })
    this.setState({articles: articles});
  }

  render() {
    console.log(this.state)
    const {loaded, error, articles, showSummaries} = this.state;

    // if (articles) {
    //   articles.map(article => {
    //     article.rating = this.ratingGenerator(2.8,5);
    //     article.views = this.viewsGenerator(100000, 1367000);
    //   });
    // }


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
          />);
      });

      return (
        <div>
          <HelloWorld />
          <div className="sort">
            SORT BY:
            <div onClick={this.sortDate}>DATE</div>
            <div onClick={this.sortRating}>RATING</div>
            <div onClick={this.sortViews}>VIEWS</div>
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
