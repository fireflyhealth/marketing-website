import { useCallback, useEffect, useReducer } from 'react';
import { Status } from '@/constants';
import * as sanity from '@/lib/sanity';
import {
  ArticleSortOrder,
  BlogArticlePagination,
  BlogArticleTagGroup,
  Maybe,
} from '@/types/sanity';
import { reportUnthrownError } from '@/lib/datadog';
import { AppError } from '@/lib/datadog/appError';

type ReturnValue = {
  state: State;
  goNext: () => Promise<void>;
  goPrev: () => Promise<void>;
};

type State =
  | {
      status: Status;
      currentPage: Maybe<BlogArticlePagination>;
      allPages: Map<number, BlogArticlePagination>;
    }
  | {
      status: Status.Rejected;
      currentPage: Maybe<BlogArticlePagination>;
      allPages: Map<number, BlogArticlePagination>;
      errorMessage: string;
    };

type GoNextAction = {
  type: 'goNext';
  nextPage: BlogArticlePagination;
};
type GoPrevAction = {
  type: 'goPrev';
  prevPage: BlogArticlePagination;
};
type SetErrorMessageAction = {
  type: 'setErrorMessage';
  message: string;
};
type SetPendingAction = {
  type: 'setPending';
};

type Action =
  | GoNextAction
  | GoPrevAction
  | SetPendingAction
  | SetErrorMessageAction;

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'goNext':
      return {
        ...prevState,
        /* Set the status to fulfilled if it isn't already */
        status: Status.Fulfilled,
        currentPage: action.nextPage,
        /* Update the allPages map with the next page. (If it already
         * exists in the map this will have no effect) */
        allPages: new Map(prevState.allPages).set(
          action.nextPage.page,
          action.nextPage,
        ),
      };
    case 'goPrev':
      /* We don't need to update allPages here, because
       * previous pages will have already been fetched. (Or the
       * goPrev function below will throw an error if it doesn't exist). */
      return {
        ...prevState,
        /* Set the status to fulfilled - it will most likely already be this,
         * unless we are recovering from a rejected state. */
        status: Status.Fulfilled,
        currentPage: action.prevPage,
      };
    case 'setPending':
      return {
        ...prevState,
        status: Status.Pending,
      };
    case 'setErrorMessage':
      return {
        ...prevState,
        status: Status.Rejected,
        errorMessage: action.message,
      };
  }
};

export const useBlogArticlePagination = (
  blogSlug: string,
  sortOrder: ArticleSortOrder,
  initialPage: Maybe<BlogArticlePagination>,
  articleTag: Maybe<BlogArticleTagGroup>,
): ReturnValue => {
  const initialState: State = {
    status: Status.Idle,
    currentPage: initialPage,
    allPages: new Map(initialPage ? [[0, initialPage]] : []),
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const tagSlug = articleTag?.tag.slug.current;

  const fetchPage = useCallback(
    async (pageNumber: number) => {
      dispatch({ type: 'setPending' });
      const fetchedNextPage =
        sortOrder == 'sortManually'
          ? await sanity.blog.getManuallySortedBlogArticles(
              blogSlug,
              pageNumber,
              tagSlug,
            )
          : await sanity.blog.getBlogArticles(blogSlug, pageNumber, tagSlug);

      dispatch({ type: 'goNext', nextPage: fetchedNextPage });
    },
    [blogSlug, tagSlug],
  );

  const goNext = async () => {
    if (!state.currentPage) {
      /* This should never happen, because the Next & Previous buttons
       * will not appear until an initial page has been loaded. */
      throw new Error('Cannot go next: there is no current page');
    }
    const nextPageNumber = state.currentPage.page + 1;

    try {
      /* If there is no next page, do nothing */
      if (state.currentPage.hasNextPage === false) {
        return;
      }
      const storedNextPage = state.allPages.get(nextPageNumber);
      /* If we have already fetched the next page, just
       * set it as the new one */
      if (storedNextPage) {
        dispatch({ type: 'goNext', nextPage: storedNextPage });
      } else {
        /* Otherwise, set the status to pending and fetch it */
        fetchPage(nextPageNumber);
      }
    } catch (e) {
      const originalMessage = e instanceof Error ? e.message : 'unknown';
      reportUnthrownError(
        new AppError('sanity', 'Unable to fetch next blog page', {
          blogSlug,
          nextPageNumber,
          originalMessage,
        }),
      );
      dispatch({
        type: 'setErrorMessage',
        message: 'Could not fetch the next page',
      });
    }
  };
  const goPrev = async () => {
    if (!state.currentPage) {
      /* This should never happen, because the Next & Previous buttons
       * will not appear until an initial page has been loaded. */
      throw new Error('Cannot go previous: there is no current page');
    }

    /* If there are no previous pages, do nothing */
    if (state.currentPage.page === 0) {
      return;
    }
    const prevPageNumber = state.currentPage.page - 1;
    try {
      const storedPrevPage = state.allPages.get(prevPageNumber);
      if (!storedPrevPage) {
        throw new Error('Could not fetch previous page');
      }
      dispatch({ type: 'goPrev', prevPage: storedPrevPage });
    } catch (e) {
      const originalMessage = e instanceof Error ? e.message : 'unknown';
      reportUnthrownError(
        new AppError('sanity', 'Unable to fetch previous blog page', {
          blogSlug,
          prevPageNumber,
          originalMessage,
        }),
      );
      dispatch({
        type: 'setErrorMessage',
        message: 'Could not fetch the previous page',
      });
    }
  };

  useEffect(() => {
    /* If the initial page was already provided, do nothing */
    if (initialPage) return;
    fetchPage(0);
  }, [fetchPage, initialPage]);
  return {
    state,
    goNext,
    goPrev,
  };
};
