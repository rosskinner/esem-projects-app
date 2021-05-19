import Seo from '../../components/seo'
import { fetchAPI, getStrapiMedia } from '../../lib/api'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import Image from 'next/image'



const TeamMember = ({ teamMember }) => { 
  const url = (teamMember.collectionImage.formats === null || Object.keys(teamMember.collectionImage.formats).length === 0) ? teamMember.collectionImage : teamMember.collectionImage.formats.large
  const imgSrc = getStrapiMedia(url)

  const seo = {
    metaTitle: teamMember.name,
    metaDescription: teamMember.description,
    shareImage: teamMember.collectionImage
  }

  return (
    <>
      <div className='container pt6 about pb3 pb5-l'>
        <Seo seo={seo} />
        
        <div className='w-100 flex flex-column flex-row-l ph4 ph5-l pt5-l '>

          <div className={`w-100 w-25-l wrap`}>
            <div className='w-100 pt3 mb3'>

              <div className={`aspect-ratio aspect-ratio--8x10`}>
                <Image
                  className='background-image cover center aspect-ratio--object' src={imgSrc} layout='fill' objectFit='cover'
                  alt={teamMember.collectionImage.alternativeText}
                  title={teamMember.collectionImage.caption}
                  quality={100}
                />
              </div>
              <h1 className='mb3 f2 heading pt3'>{teamMember.name}</h1>
              <h2 className='mt0 f6 pb3 db '>{teamMember.role}</h2>
              <span className='mt0 f6 pb3 db '>{teamMember.description}</span>
              {teamMember.linkedin &&
                <a className='f6 details underline db' href={teamMember.linkedin} rel='noreferrer' target='_blank'>LinkedIn</a>}

              {teamMember.email &&
                <a className='f6 details underline' href={`mailto:${teamMember.email}`} rel='noreferrer' target='_blank'>{teamMember.email}</a>}
            </div>
            <div className='w-100 flex flex-column'>

              <div className='w-100 project-panel'>
                <div className='w-100 pv2 v-mid flex'>
                  
                    

                    <Link href='/about'>
                      <a className='underline db mb2 f6'> {'< Back to About'}</a>
                    </Link>
                  
                </div>

              </div>
            </div>
          </div>


          <div className='w-100 w-75-l mw8 ph0 ph5-l f4 details'>
            <ReactMarkdown source={teamMember.body} escapeHtml={false} />
            </div>
        </div>
        
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const members = await fetchAPI('/team-members')

  return {
    paths: members.map((member) => ({
      params: {
        slug: member.slug,
      }
    })),
    fallback: false,
  }
}

export async function getStaticProps ({ params }) {
  // Run API calls in parallel
  const teamMember = await fetchAPI(`/team-members?slug=${params.slug}`)
  

  return {
    props: { teamMember: teamMember[0] },
    revalidate: 1
  }
}

export default TeamMember
