import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
   constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,
    }
  }
  async componentDidMount(){
    console.log();
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=59bb9c9c383b4849906d96f3ef7d7420";
    let data = await fetch(url);
    let parsedata = await data.json(data);
    console.log(parsedata);
    this.setState({articles:parsedata.articles});

  }
  handlePrevClick = async ()=>{
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);  
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
    })

}

 handleNextClick = async ()=>{
    console.log("Next"); 
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
}
}

  render() {
    return (
        <>
        <div className="container my-3">
             <h1>NewsMonkey - Top Headlines</h1> 
            <div className="row">
           {this.state.articles.map((element)=> {
              return <div className="col-md-4 my-3" key={element.url} >
                <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,80):""} urlToImage={element.urlToImage} newzUrl={element.url}/>
              </div>
            })}
                
                    
                </div>
               
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </>
    )
  }
}