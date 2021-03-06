import { fetchAPI } from '../../lib/api'
import Seo from '../../components/seo'
import ProjectCard from '../../components/project'


const Project = ({ global, project, contactpage, scroll }) => {

let nav = []
let shareImage = null
for (let i = 0; i < project.media.length; i++) {
  const media = project.media[i]
  media.type = media.__component

  if (media.type.includes('video-images') && shareImage === null) {
    shareImage = media.media[0]
  }
}

  const seo = {
    metaTitle: project.title,
    metaDescription: project.description,
    shareImage: shareImage
  }

  return (
    <>
    {project &&
      <>
        <Seo seo={seo} />
        <ProjectCard project={project} contactpage={contactpage} global={global} scroll={scroll}/>
      </>
    }
    </>
  )
}

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