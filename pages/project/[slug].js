import { fetchAPI } from '../../lib/api'
import Seo from '../../components/seo'
import ProjectCard from '../../components/project'


const Project = ({ projects, project, contactpage }) => {
// console.log('projects', projects)
let nav = []

for (let i = 0; i < projects.length; i++) {
  const p = projects[i]
  const prev = i > 0 ? i - 1 : projects.length - 1
  const next = i >= projects.length - 1 ? 0 : i + 1
  
  if(p.id === project.id) {
    nav = [projects[prev],projects[next]]
  } 
}

  const seo = {
    metaTitle: project.title,
    metaDescription: project.description,
    shareImage: project.collectionImage,
    project: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <ProjectCard prev={nav[0]} next={nav[1]} project={project} contactpage={contactpage}/>
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
  const projects = await fetchAPI(`/projects?slug=${params.slug}`)
  // console.log(params)


  // prev={projects[prev]} next={projects[next]} 
  // const categories = await fetchAPI("/categories");

  return {
    props: { project: projects[0] },
    revalidate: 1
  }
}

export default Project