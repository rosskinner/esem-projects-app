// import ReactMarkdown from "react-markdown";
// import Moment from "react-moment";
import { fetchAPI, getStrapiMedia } from "../../lib/api";
// import Layout from "../../components/layout";
// import Image from "../../components/image";
import Seo from "../../components/seo";


const Project = ({ project, categories }) => {
  const imageUrl = getStrapiMedia(project.heroImage);

  const seo = {
    metaTitle: project.title,
    metaDescription: project.description,
    shareImage: project.heroImage,
    project: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{project.title}</h1>
      </div>
      {/* <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown source={project.content} escapeHtml={false} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {project.author.picture && (
                <Image
                  image={project.author.picture}
                  style={{
                    position: "static",
                    borderRadius: "50%",
                    height: 30,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {project.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{project.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export async function getStaticPaths() {
  const projects = await fetchAPI("/projects");

  return {
    paths: projects.map((project) => ({
      params: {
        slug: project.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const projects = await fetchAPI(
    `/projects?slug=${params.slug}`
  );
  const categories = await fetchAPI("/categories");

  return {
    props: { project: projects[0], categories },
    revalidate: 1,
  };
}

export default Project;