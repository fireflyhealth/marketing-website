import Page, {
  createGetStaticProps,
  getStaticPaths as pageGetStaticPaths,
} from './';

export const getStaticProps = createGetStaticProps({ preferBContent: true });
export const getStaticPaths = pageGetStaticPaths;

export default Page;
