import React from "react";

function Home() {
  return (
    <>
      <header className="header">
        <div className="logo">Mini Blog</div>
        <div className="header--buttons">
          <button type="button">LogIn</button>
          <button type="button">Sign Up</button>
        </div>
      </header>
      <section className="hero--section">
        <div className="container">
          <h1 className="hero--title">
            Share Your Knowledge <br />
            <span>With The World</span>
          </h1>
          <p className="hero--description">
            A minimalist platform for developers, thinkers, and creators to
            write, categorize, and share their ideas seamlessly.
          </p>
          <div className="hero--buttons">
            <button type="button">Start Writing for Free</button>
            <button type="button">Explore Posts</button>
          </div>
        </div>
      </section>
      <section className="features--section">
        <h2 className="section--title">Everything You Need to Blog</h2>
        <div className="features--grid">
          <div className="feature--card">
            <div className="feature--icon">
              <span>8</span>
            </div>
            <h4 className="card--title">Rich Post Creation</h4>
            <p className="card--description">
              Write your thoughts with ease, attach brilliant images, and format
              your content to engage your readers perfectly.
            </p>
          </div>
          <div className="feature--card">
            <div className="feature--icon">
              <span>8</span>
            </div>
            <h4 className="card--title">Categories & Tags</h4>
            <p className="card--description">
              Organize your posts beautifully. Let visitors filter by tags and
              categories to find exactly what ther are looking for.
            </p>
          </div>
          <div className="feature--card">
            <div className="feature--icon">
              <span>8</span>
            </div>
            <h4 className="card--title">Grow and Audience</h4>
            <p className="card--description">
              Create an account to build your profile, showcase your article,
              and connect with a community of readers.
            </p>
          </div>
        </div>
      </section>
      <section className="posts--section">
        <div className="posts">
          <div className="post-card">
            <div className="card--image">
              <img src="" alt="" />
            </div>

            <div className="post-content">
              <div className="post-title">
                10 Tips to learn javascript faster
              </div>
              <div className="tags">
                <div className="tag">#Learning</div>
                <div className="tag">#frontend</div>
                <div className="tag">#backend</div>
              </div>
              <div className="post-description">
                Learning javascript can be difficult at the beginning. But if
                you focus on these steps you can improve faster...
              </div>
              <hr />
              <div className="meta">By Ahmed | Mar 07, 2026</div>
            </div>
          </div>
          <div className="post-card">
            <div className="card--image">
              <img src="" alt="" />
            </div>

            <div className="post-content">
              <div className="post-title">
                10 Tips to learn javascript faster
              </div>
              <div className="tags">
                <div className="tag">#Learning</div>
                <div className="tag">#frontend</div>
                <div className="tag">#backend</div>
              </div>
              <div className="post-description">
                Learning javascript can be difficult at the beginning. But if
                you focus on these steps you can improve faster...
              </div>
              <hr />
              <div className="meta">By Ahmed | Mar 07, 2026</div>
            </div>
          </div>
          <div className="post-card">
            <img src="" alt="" />

            <div className="post-content">
              <div className="post-title">
                10 Tips to learn javascript faster
              </div>
              <div className="tags">
                <div className="tag">#Learning</div>
                <div className="tag">#frontend</div>
                <div className="tag">#backend</div>
              </div>
              <div className="post-description">
                Learning javascript can be difficult at the beginning. But if
                you focus on these steps you can improve faster...
              </div>
              <hr />
              <div className="meta">By Ahmed | Mar 07, 2026</div>
            </div>
          </div>
        </div>
        <div>
          <button type="button">Log in to view all posts</button>
        </div>
      </section>
      <section className="testimonials--section">
        <h2 className="section--title">Loved by Writers</h2>
        <div className="test--grid">
          <div className="testimonial">
            <p className="test--text">
              "This platform is exactly what I needed. Minimalist, clean, and
              the tagging system makes it so easy for my readers to find my
              Nodes.js tutorials."
            </p>
            <div className="test--author">
              <div className="avator">J</div>
              <div className="author--info">
                <h4>John Doe</h4>
                <p>Backend Developer</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <p className="test--text">
              "I love how fast it is to publish an article. The interface
              doesn't get in my way. It just lets me focus on writting great
              contetn."
            </p>
            <div className="test--author">
              <div className="avator">A</div>
              <div className="author--info">
                <h4>Ahmed Usman</h4>
                <p>Teck Blogger</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bottom--section">
        <h2>Ready to share your story?</h2>
        <p>
          Join hundreds of other writers and start publishing your articles
          today It takes less than a minute to create an account.
        </p>
        <button className="btn">Create Free Account</button>
      </section>
      <footer className="footer">
        <p>&copy; 2026 Mini Blog Platform. All rights reserved.</p>
      </footer>
    </>
  );
}
export default Home;
