import { render } from '@testing-library/react';
import { LinkWithLabel } from '@/types/sanity';
import { Link } from '../Link';
import { linkWithLabelExamples } from '../../mockData';

const getLinkExample = (label: string): LinkWithLabel => {
  const linkExample = linkWithLabelExamples.find((l) => l.label === label);
  if (!linkExample) {
    throw new Error(`Could not get link example "${label}"`);
  }
  return linkExample;
};

describe('Link', () => {
  it('should render links to external pages', () => {
    const externalLink = getLinkExample('To External URL');
    const { getByText } = render(
      <Link link={externalLink.link}>{externalLink.label}</Link>,
    );
    expect(getByText(externalLink.label).getAttribute('href')).toBe(
      'https://www.sanctuary.computer',
    );
  });

  it('should render links to files', () => {
    const externalLink = getLinkExample('File Download');
    const { getByText } = render(
      <Link link={externalLink.link}>{externalLink.label}</Link>,
    );
    expect(getByText(externalLink.label).getAttribute('href')).toMatch(
      /^https:\/\/cdn\.sanity\.io\/files\/(\w|\/)+\.zip$/,
    );
  });

  it('should render a link to the homepage', () => {
    const homepageLink = getLinkExample('To Homepage');
    const { getByText } = render(
      <Link link={homepageLink.link}>{homepageLink.label}</Link>,
    );
    expect(getByText(homepageLink.label).getAttribute('href')).toBe('/');
  });

  it('should render a link to the contact page', () => {
    const contactPageLink = getLinkExample('To Contact Page');
    const { getByText } = render(
      <Link link={contactPageLink.link}>{contactPageLink.label}</Link>,
    );
    expect(getByText(contactPageLink.label).getAttribute('href')).toBe(
      '/contact',
    );
  });

  it('should render a link to the download page', () => {
    const downloadPageLink = getLinkExample('To Download Page');
    const { getByText } = render(
      <Link link={downloadPageLink.link}>{downloadPageLink.label}</Link>,
    );
    expect(getByText(downloadPageLink.label).getAttribute('href')).toBe(
      '/download',
    );
  });

  it('should render a link to the homepage', () => {
    const homepageLink = getLinkExample('To Homepage');
    const { getByText } = render(
      <Link link={homepageLink.link}>{homepageLink.label}</Link>,
    );
    expect(getByText(homepageLink.label).getAttribute('href')).toBe('/');
  });

  it('should render a link to the FAQ page', () => {
    const faqPageLink = getLinkExample('To FAQ Page');
    const { getByText } = render(
      <Link link={faqPageLink.link}>{faqPageLink.label}</Link>,
    );
    expect(getByText(faqPageLink.label).getAttribute('href')).toBe('/faq');
  });

  it('should render links to generic pages', () => {
    const genericPageLink = getLinkExample('To Generic Page');

    const { getByText } = render(
      <Link link={genericPageLink.link}>{genericPageLink.label}</Link>,
    );
    expect(getByText(genericPageLink.label).getAttribute('href')).toBe(
      '/how-it-works',
    );
  });

  it('should render links to sub pages', () => {
    const subpageLink = getLinkExample('To Subpage');

    const { getByText } = render(
      <Link link={subpageLink.link}>{subpageLink.label}</Link>,
    );

    expect(getByText(subpageLink.label).getAttribute('href')).toBe(
      '/about/care-team',
    );
  });

  it('should render links to blogs', () => {
    const blogLink = getLinkExample('To Blog');

    const { getByText } = render(
      <Link link={blogLink.link}>{blogLink.label}</Link>,
    );

    expect(getByText(blogLink.label).getAttribute('href')).toBe(
      '/blog/for-members',
    );
  });

  it('should render links to blog articles', () => {
    const articleLink = getLinkExample('To Blog Article');

    const { getByText } = render(
      <Link link={articleLink.link}>{articleLink.label}</Link>,
    );

    expect(getByText(articleLink.label).getAttribute('href')).toBe(
      '/blog/for-members/the-many-health-benefits-of-fiber',
    );
  });

  it('should render links to client pages', () => {
    const clientPageLink = getLinkExample('To Client Page');

    const { getByText } = render(
      <Link link={clientPageLink.link}>{clientPageLink.label}</Link>,
    );

    expect(getByText(clientPageLink.label).getAttribute('href')).toBe(
      '/with/massachusetts-blue-cross',
    );
  });

  it('should render links to practitioner pages', () => {
    const clientPageLink = getLinkExample('To Practitioner');

    const { getByText } = render(
      <Link link={clientPageLink.link}>{clientPageLink.label}</Link>,
    );

    expect(getByText(clientPageLink.label).getAttribute('href')).toBe(
      '/care-team/rosio-macdonald',
    );
  });
});
