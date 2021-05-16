import { fetchAPI } from '../../lib/api'
import Seo from '../../components/seo'
import ProjectCard from '../../components/project'


const Project = ({ global, project, contactpage, scroll }) => {

let nav = []
let shareImage = null
const media = project.media[0]
media.type = media.__component

if (media.type.includes('video-images')) {
  shareImage = media.media[0]
}

  const seo = {
    metaTitle: project.title,
    metaDescription: project.description,
    shareImage: shareImage,
    project: true,
  };

  return (
    <>
    {project &&
      <>
        <Seo seo={seo} />
        <ProjectCard project={project} contactpage={contactpage} global={global} scroll={scroll}/>
      </>
    }
      
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

  return {
    props: { project: projects[0] || null},
    revalidate: 1
  }
}

export default Project