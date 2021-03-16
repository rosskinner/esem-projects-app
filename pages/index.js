import React from "react";
// import Articles from "../components/articles";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

const Home = ({ projects, categories, global }) => {
  console.log(global)
  return (
    <div categories={categories}>
      <Seo seo={global.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{global.SiteName}</h1>
          {/* <Articles articles={articles} /> */}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [projects, categories] = await Promise.all([
    fetchAPI("/projects?status=published"),
    fetchAPI("/categories")
  ])

  return {
    props: { projects, categories },
    revalidate: 1,
  }
}

export default Home