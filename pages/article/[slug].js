import { fetchAPI } from '../../lib/api'
import Seo from '../../components/seo'
import ArticleCard from '../../components/article'


const Article = ({ article }) => {

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.collectionImage,
    article: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <ArticleCard article={article}/>
    </>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles')
  // console.log('articles', articles)
    return {
      paths: articles.map((article) => ({
        params: {
          slug: article.slug,
        }
      })),
      fallback: false,
    }
  return {}
  
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`)
  // console.log(params)


  // prev={articles[prev]} next={articles[next]} 
  // const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0] },
    revalidate: 1
  }
}

export default Article