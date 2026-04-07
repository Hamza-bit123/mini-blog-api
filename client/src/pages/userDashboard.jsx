import React, { useEffect, useState } from "react";

function UserDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/dashboard", {
          method: "GET",
          headers: {
            Authorization:
              "Bearer, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmdWFkQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzU0NjYzMTgsImV4cCI6MTc3NTQ2ODExOH0.WjXCNkXoVGl9pVvCKomuIZaEyzlPquSLcu1_jYx4sy0",
          },
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="dashboard--wrapper">
      <h3>Dashboard</h3>
      <div className="dashboard--menu">
        <button className="active">Overview</button>
        <button>My Posts</button>
        <button>Create Posts </button>
        <button>Settings</button>
      </div>
      <section className="welcome--section">
        <h2 className="welcome--title">Welcome back, Ahmed</h2>
        <p className="welcome--description">
          Here's what is happning with your blog today.
        </p>
      </section>
      <section className="stats--grid">
        <div className="stat--card">
          <span className="stat--label">Total Posts</span>
          <span className="stat--value">{data?.stats.total_posts || 0}</span>
        </div>
        <div className="stat--card">
          <span className="stat--label">Catagories</span>
          <span className="stat--value">
            {data?.stats.total_categories || 0}
          </span>
        </div>
        <div className="stat--card">
          <span className="stat--label">Total Tags</span>
          <span className="stat--value">{data?.stats.total_tags || 0}</span>
        </div>
      </section>
      <section className="chart--section">
        <div className="chart--card">
          <h3 className="chart--title">Top Categories</h3>
          <div className="chart">
            <div className="chart--info">
              <span>{data?.top_categories[0].name || "category"}</span>
              <span>
                {`${
                  (data?.top_categories[0].post_count * 100) /
                    data?.stats.total_categories || 0
                }%`}
              </span>
            </div>
            <div className="chart--bar">
              <div
                className="active--top"
                style={{
                  width: `${
                    (data?.top_categories[0].post_count * 100) /
                      data?.stats.total_categories || 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="chart">
            <div className="chart--info">
              <span>{data?.top_categories[1].name || "category"}</span>
              <span>{`${
                (data?.top_categories[1].post_count * 100) /
                  data?.stats.total_categories || 0
              }%`}</span>
            </div>
            <div className="chart--bar">
              <div
                className="active--middle"
                style={{
                  width: `${
                    (data?.top_categories[1].post_count * 100) /
                      data?.stats.total_categories || 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="chart">
            <div className="chart--info">
              <span>{data?.top_categories[2].name || "category"}</span>
              <span>{`${
                (data?.top_categories[2].post_count * 100) /
                  data?.stats.total_categories || 0
              }%`}</span>
            </div>
            <div className="chart--bar">
              <div
                className="active--bottom"
                style={{
                  width: `${
                    (data?.top_categories[2].post_count * 100) /
                      data?.stats.total_categories || 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <div className="section--header">
        <h3>Recent Posts</h3>
        <button className="btn createPost--btn">New Post</button>
      </div>
      {data && (
        <ul className="recent--posts">
          {data.recent_posts?.map((post) => (
            <li className="post_item" key={post.id}>
              <div className="post--image_preview">
                <img
                  src={`http://localhost:4000/uploads/${post.image}`}
                  alt={post.title}
                />
              </div>
              <div className="post--details">
                <h4 className="post--details__title">{post.title}</h4>
                <div className="post--details__meta">
                  <span className="category">{post.category}</span>
                  <span className="date">
                    {" "}
                    {`| ${new Date(post.created_at).toLocaleDateString("en-UK", { month: "long" })} 
                        ${new Date(post.created_at).toLocaleDateString("en-UK", { day: "2-digit" })}, 
                        ${new Date(post.created_at).toLocaleDateString("en-UK", { year: "numeric" })}`}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDashboard;
