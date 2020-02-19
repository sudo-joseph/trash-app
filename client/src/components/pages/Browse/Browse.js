import React, { Component } from 'react';
import './Browse.css';


class Browse extends Component {
  state = {
    someStateVar: [],
  }


  render() {
    return (
      <div className="Browse">
        <h1>Browse</h1>
        {
          this.state.blogPosts.map((post, index) => (
            <div className="Browse-article" key={post._id}>

              <h1>{post.title}</h1>
              <p>{post.text}</p>

              <div className="Browse-articleActions">
                <div onClick={() => this.deleteArticle(post._id)}>
                  <span alt="delete this">🗑</span>
                </div>
                <div onClick={() => this.voteArticle(post)}>
                  <span alt="upvote this">⬆ {post.voteCount}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Browse;
