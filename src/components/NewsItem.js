import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        
        let { title, description ,urlToImage,newzUrl, author, date, source} = this.props;
        return (
            <div className="card" style={{width: "18rem"}}>
                <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>

                        <span className="badge rounded-pill bg-danger"> {source} </span>
                    </div>
                <img src={urlToImage?urlToImage:"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                    <a href={newzUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                </div>
            </div>
        )
    }
}
