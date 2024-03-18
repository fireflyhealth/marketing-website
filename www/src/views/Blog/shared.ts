import { BlogArticlePagination, Maybe } from '@/types/sanity';

export type BlogArticlesSharedProps = {
  currentPage: Maybe<BlogArticlePagination>;
};
