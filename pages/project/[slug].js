import { fetchAPI } from '../../lib/api'
import Seo from '../../components/seo'
import ProjectCard from '../../components/project'


const Project = ({ project }) => {

  const seo = {
    metaTitle: project.title,
    metaDescription: project.description,
    shareImage: project.heroImage,
    project: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <ProjectCard project={project}/>
    </>
  );
};

export async function getStaticPaths() {
  const projects = await fetchAPI('/projects')

  return {
    paths: projects.map((project) => ({
      params: {
        slug: project.slug,
      }
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const projects = await fetchAPI(
    `/projects?slug=${params.slug}`
  )
  // const categories = await fetchAPI("/categories");

  return {
    props: { project: projects[0] },
    revalidate: 1
  }
}

export default Project