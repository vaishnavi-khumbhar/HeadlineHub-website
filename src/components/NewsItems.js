import React from 'react';

const NewsItems = (props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">

          <div style={{display:'flex',
                       justifyContent:'flex-end',
                       position:'absolute',
                       right:'0'
          }}>
          <span className="badge rounded-pill bg-danger">{source}
            <span className="visually-hidden">unread messages</span></span>
          </div>

          <img src={!imageUrl? 'https://imgs.hipertextual.com/wp-content/uploads/2025/04/AppleEvent.SEP14Keynote.Tim_Cook.01-scaled.jpg': imageUrl}
            className="card-img-top"alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItems;
