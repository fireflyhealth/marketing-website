import React from 'react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BlogArticlePagination } from '@/types/sanity';
import { imageExamples, simpleRichText } from '@/mockData';
import { Status } from '@/constants';
import { BlogPageArticlesInner } from '../BlogPageArticles';

const generatePage = (
  pageNumber: number,
  hasNextPage: boolean,
  articlesCount = 12,
): BlogArticlePagination => ({
  page: pageNumber,
  hasNextPage,
  articles: Array.from({ length: articlesCount }).map((_, index) => {
    const blogPostNumber = pageNumber * 12 + index;
    const title = `Blog Post ${blogPostNumber}`;
    return {
      _type: 'blogArticle',
      title,
      slug: {
        current: `blog-article-${blogPostNumber}`,
      },
      blurb: simpleRichText,
      thumbnail: imageExamples[0].image,
      _updatedAt: new Date().toISOString(),
      publishDate: new Date().toISOString(),
      category: {
        _type: 'blog',
        title: 'For Members',
        slug: {
          current: 'for-members',
        },
      },
    };
  }),
});

const originalScrollTo = window.scrollTo;

describe('BlogPageArticles', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });
  afterAll(() => {
    window.scrollTo = originalScrollTo;
  });

  it('should not show the prev/next buttons when the first page does not have a next page', async () => {
    const goNext = async () => {};
    const goPrev = async () => {};
    const { queryByText } = render(
      <BlogPageArticlesInner
        articleLayout="list"
        paginationStatus={Status.Idle}
        goNext={goNext}
        goPrev={goPrev}
        currentPage={generatePage(0, false)}
      />,
    );
    expect(queryByText('Next')).toBeFalsy();
    expect(queryByText('Previous')).toBeFalsy();
  });

  it('should show the prev/next buttons when the first page doe have a next page, and disable them if there is nothing to navigate to', async () => {
    const user = userEvent.setup();
    const goNext = jest.fn(async () => {});
    const goPrev = jest.fn(async () => {});
    const { rerender, getByText } = render(
      <BlogPageArticlesInner
        articleLayout="list"
        paginationStatus={Status.Idle}
        goNext={goNext}
        goPrev={goPrev}
        currentPage={generatePage(0, true, 1)}
      />,
    );
    const nextBtn = getByText('Next');
    const prevBtn = getByText('Previous');
    expect(nextBtn).toBeTruthy();
    expect(prevBtn).toBeTruthy();

    /* Assert that the prev button is disabled and does nothing */
    await user.click(prevBtn);
    expect(goPrev).toHaveBeenCalledTimes(0);

    /* Assert that the next button has fired goNext */
    await user.click(nextBtn);
    expect(goNext).toHaveBeenCalledTimes(1);

    /* Simulate the loading status */
    rerender(
      <BlogPageArticlesInner
        articleLayout="list"
        paginationStatus={Status.Pending}
        goNext={goNext}
        goPrev={goPrev}
        currentPage={generatePage(0, true)}
      />,
    );

    /* Assert that prev/next button clicks do nothing while pending */
    await user.click(prevBtn);
    expect(goPrev).toHaveBeenCalledTimes(0);
    await user.click(nextBtn);
    expect(goNext).toHaveBeenCalledTimes(1);

    /* Simulate the next page (no next page) */
    rerender(
      <BlogPageArticlesInner
        articleLayout="list"
        paginationStatus={Status.Fulfilled}
        goNext={goNext}
        goPrev={goPrev}
        currentPage={generatePage(1, false)}
      />,
    );

    /* Assert that next button clicks do nothing when there is no next page */
    await user.click(nextBtn);
    expect(goNext).toHaveBeenCalledTimes(1);

    /* Assert that prev button fires goPrev */
    await user.click(prevBtn);
    expect(goPrev).toHaveBeenCalledTimes(1);
  });
});
