import React, { Component } from 'react';
import './Welcome.css';


class Welcome extends Component {
  state = {
    blogPosts: [],
  }

  render() {
    return (
      <div className="Welcome">
        <h1>Welcome</h1>
        {
          this.state.blogPosts.map((post, index) => (
            <div className="Welcome-article" key={post._id}>

              <h1>{post.title}</h1>
              <p>{post.text}</p>

              <div className="Welcome-articleActions">
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

export default Welcome;
