import React, { Component } from 'react';
import Header from '../src/header';
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
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.state = {
      articles: null,
      error: null,
      loaded: false,
      showSummaries: false,
      displayArticles: null,
      categories: null,
      sort: null,
      filter: null,
      sortDisplay: false
    };
  }

  componentDidMount() {

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
        sort: "Date (Newer)",
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
    if (sortValue === "Date (Newer)") {
      return this.sortFunction(articles, "date_published", "max");
    } else if (sortValue === "Date (Older)") {
      return this.sortFunction(articles, "date_published");
    } else if (sortValue === "Rating (Higher)") {
      return this.sortFunction(articles, "rating", "max");
    } else if (sortValue === "Rating (Lower)") {
      return this.sortFunction(articles, "rating");
    } else if (sortValue === "Views (More)") {
      return this.sortFunction(articles, "views", "max");
    } else if (sortValue === "Views (Less)") {
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

  toggleDisplay(filter) {
    if (filter === "filterDisplay") {
      this.setState((prevState, props) => ({
        filterDisplay: !prevState.filterDisplay
      }))
    } else {
      this.setState((prevState, props) => ({
        sortDisplay: !prevState.sortDisplay
      }))
    }
  }

  selectFunction(type, option) {
    let sort, filter;
    if (type === "sort") {
      sort = option;
      filter = this.state.filter;
    } else {
      sort = this.state.sort
      filter = option;
    }
    this.filterFunction(sort, filter);
  }

  render() {
    let sortStyle, filterStyle;
    sortStyle =  this.state.sortDisplay ? {height: "auto"} : {height: 16};
    filterStyle = this.state.filterDisplay ? {height: "auto"} : {height: 16};
    const {loaded, error, displayArticles, showSummaries, articles, categories, category, sort, filter} = this.state;
    let options = null;
    let sortOptions = ["Date (Newer)","Date (Older)","Rating (Higher)","Rating (Lower)","Views (More)","Views (Less)"]
    let thing = <div className="placeholder">{sort}<span><FontAwesomeIcon icon={['fas', 'sort']} /></span></div>;
    let thing2 = <div className="placeholder">{filter}<span><FontAwesomeIcon icon={['fas', 'sort']} /></span></div>;
    let sortDivs = sortOptions.map((option, idx) => <div key={idx} onClick={() => this.selectFunction("sort", option)}>{option}</div>);
    let catDivs = null;
    if (categories) {
      let catOptions = ["All"].concat(categories);
      catDivs = catOptions.map((option, idx) => <div key={idx} onClick={() => this.selectFunction("filter", option)}>{option}</div>)
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
        <Header />
        <div className="main">
          <div className="filters">
            <div className="date">{date}</div>|
            <div className="form-container">
            <div className="form" onClick={() => this.toggleDisplay("sortDisplay")} style={sortStyle}>
              {thing}
              {sortDivs}
            </div>
          </div>|
            <div className="form-container">
              <div className="form" onClick={() => this.toggleDisplay("filterDisplay")} style={filterStyle}>
                {thing2}
                {catDivs}
              </div>
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
