import BlogPage, {
  createGetStaticProps,
  getStaticPaths as blogGetStaticPaths,
} from './';

export const getStaticProps = createGetStaticProps({ preferBContent: true });
export const getStaticPaths = blogGetStaticPaths;

export default BlogPage;
