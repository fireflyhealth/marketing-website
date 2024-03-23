import ArticlePage, {
  createGetStaticProps,
  getStaticPaths as blogGetStaticPaths,
} from './';

export const getStaticProps = createGetStaticProps({ preferBContent: true });
export const getStaticPaths = blogGetStaticPaths;

export default ArticlePage;
