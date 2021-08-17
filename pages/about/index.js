import Seo from '../../components/seo'
import { fetchAPI, getStrapiMedia } from '../../lib/api'
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'
const Card = dynamic(() => import('../../components/card'))

const About = ({ aboutpage, featured, awards }) => {
  const imgSrcPage = getStrapiMedia(aboutpage.aboutImage)

  const seo = {
    metaTitle: aboutpage.heading,
    metaDescription: `${aboutpage.content.split('\n')[0]}`,
    shareImage: aboutpage.aboutImage
  }

  return (
    <>
      <div className='container pt6 about'>
        <Seo seo={seo} />
        <div className='flex flex-wrap f4'>

          <div className='ph4 ph5-l w-100 w-70-l mb4 mb6-l pr5'>
            <h1 className='about-heading about-heading-l mv4 mv5-l'>{aboutpage.heading}</h1>
            <img
              className='w-100'
              src={imgSrcPage}
              alt={aboutpage.aboutImage.alternativeText || aboutpage.aboutImage.name}
              title={aboutpage.aboutImage.caption}
            />
            <p className='pt5-l f2'>About Us</p>

            <ReactMarkdown className='details f4' source={aboutpage.content} escapeHtml={false} />

          </div>
          <div className='w-100 flex flex-column'>
            <div className='w-100 mb4 mb6-l ph4 ph5-l flex flex-column'>
              <div>
                <p className='f2'>{aboutpage.projectsHeading}</p>
              </div>
              <div className='w-100 flex flex-row-l flex-column'>
                <div className='projects flex flex-column w-100 w-75-l flex-row-ns flex-wrap mv3 featured-projects pr4-l'>
                  {featured.projects.map((project, i) => {
                    return (
                      <Card width='w-third' key={i} index={i} project={project} category={featured} path='/project' portrait />

                    )
                  })}
                </div>
                <div className='w-100 w-25-l'>

                  <span className='details f4'>
                    <ReactMarkdown source={aboutpage.projectsContent} escapeHtml={false} />
                  </span>
                </div>
              </div>

            </div>
          </div>
          <div className='w-100 flex flex-column'>
            <div className='w-100 mb4 mb6-l  ph4 ph5-l flex flex-column'>
              <div>
                <p className='f2'>{aboutpage.teamHeading}</p>
              </div>
              <div className='w-100 flex flex-row-l flex-column'>
                <div className='projects flex flex-column w-100 w-75-l flex-row-ns flex-wrap mv3 pr4-l'>
                  {aboutpage.teamMembers.map((person, i) => {
                    return (
                      <Card width='w-third' key={i} index={i} project={person.team_member} category={person.team_member.role} description path='/about' />
                    )
                  })}

                </div>
                <div className='w-100 w-25-l'>
                  <span className='details f4'>
                    <ReactMarkdown source={aboutpage.teamContent} escapeHtml={false} />
                  </span>
                </div>

              </div>
            </div>

            <div className='w-100 f4 ph4 ph5-l mb4 mb6-l flex flex-column'>
              <div className='w-100 w-25-l'>
                <p className='f2'>Our Services</p>

              </div>

              <span className='details flex flex-column flex-row-l flex-wrap w-100'>
                {aboutpage.services.map((service, i) => {
                  return (
                    <div className='w-100 flex flex-column flex-row-l pr4-l mv3 pt4 f4 service' key={i}>
                      <p className='w-100 w-25-l pr3-l'>{service.title}</p>
                      <ReactMarkdown className='w-100 w-50-l pl4-l services' source={service.content} escapeHtml={false} />
                    </div>

                  )
                })}
              </span>
            </div>
            <div className='w-100 flex flex-column flex-row-l'>
              <div className='w-100 w-50-l f4 pt4 pt5-l ph4 ph5-l mb6 flex flex-column flex-row-l'>
                <div className='w-100 mw7'>
                  <p className='f2'>Clients</p>
                  <ReactMarkdown className='w-100 w-70-l details f4'>{aboutpage.clientContent}</ReactMarkdown>
                </div>

              </div>

              <div className='w-100 w-50-l pt4 pt5-l pb5 f4 mb4 mb6-l pr2 pl4 pl5-l br-l'>
                <div className='w-100'>
                  <p className='f2'>Awards</p>
                </div>
                <div className='projects w-100 flex flex-column flex-row-l flex-wrap details f4 w-75'>
                  <div className='w-100 w-50-l mb3 pr3-l'>
                    <span className='details f4'>{aboutpage.awardsContent}</span>
                  </div>
                  <div className='w-100 w-50-l'>
                    {awards.map((award, i) => {
                      return (
                        <div key={i} className='w-100 ph4-l mb3'>
                          <a className='f4 details' href={award.link} rel='noreferrer' target='_blank'>{award.title}</a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps ({ params }) {
  // Run API calls in parallel
  const [aboutpage, featured, awards] = await Promise.all([
    fetchAPI('/about-page'),
    fetchAPI('/categories?slug=featured'),
    fetchAPI('/awards')
  ])

  return {
    props: { aboutpage, featured: featured[0], awards },
    revalidate: 1
  }
}

export default About
