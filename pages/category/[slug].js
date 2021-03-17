import Projects from "../../components/projects";
import { fetchAPI } from "../../lib/api";
import Tag from "../../components/tag";
import Seo from "../../components/seo";

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} projects`,
  };

  return (
    <Tag categories={categories}>
      <Seo seo={seo} />
          <h1>{category.name}</h1>
          <Projects width='w-25' projects={category.projects} />
    </Tag>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0];
  const categories = await fetchAPI("/categories");

  return {
    props: { category, categories },
    revalidate: 1,
  };
}

export default Category;