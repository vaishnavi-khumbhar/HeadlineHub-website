import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Use a simple CORS proxy for demo on GitHub Pages
  const PROXY = 'https://api.allorigins.win/raw?url='; // demo only

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const buildApiUrl = (pageNum) => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${pageNum}&pageSize=${props.pageSize}`;
    // always go via proxy on GH Pages
    return `${PROXY}${encodeURIComponent(apiUrl)}`;
  };

  const updateNews = async () => {
    if (!props.apikey) {
      setLoading(false);
      return;
    }
    props.setProgress(10);
    setLoading(true);

    try {
      const res = await fetch(buildApiUrl(1));
      const parsedData = await res.json();
      props.setProgress(70);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setPage(1);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [props.category, props.country]);

  const fetchMoreData = async () => {
    if (!props.apikey) return;

    const nextPage = page + 1;
    try {
      const res = await fetch(buildApiUrl(nextPage));
      const parsedData = await res.json();
      setArticles((prev) => prev.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || 0);
      setPage(nextPage);
    } catch (err) {
      console.error('Error fetching more news:', err);
    }
  };

  // UI when API key missing (avoid blank screen)
  if (!props.apikey) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>⚠️ API Key not found</h2>
        <p>
          Add <code>REACT_APP_NEWS_API</code> (query string key is fine for demo)
          or replace with a sample JSON (see notes).
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        Live News - Top {capitalizeFirstLetter(props.category)} Headlines 2025
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author ? element.author : 'Unknown'}
                  date={element.publishedAt}
                  source={element.source ? element.source.name : 'Unknown'}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
