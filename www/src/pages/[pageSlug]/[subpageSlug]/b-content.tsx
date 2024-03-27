import SubPage, {
  createGetStaticProps,
  getStaticPaths as subPageGetStaticPaths,
} from './';

export const getStaticProps = createGetStaticProps({ preferBContent: true });
export const getStaticPaths = subPageGetStaticPaths;

export default SubPage;
