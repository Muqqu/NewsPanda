import React, { Component } from 'react'
import NewsItem from './NewsItem'

import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
   constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,
    }
  }
  static defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }
  async componentDidMount(){
    console.log();
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59bb9c9c383b4849906d96f3ef7d7420&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json(data);
    console.log(parsedata);
    this.setState({articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false})

  }
  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json() 
    this.setState({page: this.state.page - 1,articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false})

}

 handleNextClick = async ()=>{
      if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()  
        this.setState({page: this.state.page + 1,articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false})
}
}

  render() {
    return (
        <>
        <div className="container my-3">
             <h1>NewsMonkey - Top Headlines</h1> 
             {this.state.loading&&<Spinner/>}
            <div className="row">
           {!this.state.loading &&this.state.articles.map((element)=> {
              return <div className="col-md-4 my-3" key={element.url} >
                <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,80):""} urlToImage={element.urlToImage} newzUrl={element.url}/>
              </div>
            })}
                
                    
                </div>
               
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </>
    )
  }
}
