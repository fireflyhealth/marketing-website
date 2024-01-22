export const linkableDocument = `{
  _key,
  _type,
  page->{
    title,
    "slug": slug.current,
    subPages[]->{
      _type,
      _id,
      title,
      "slug": slug.current,
    },
  },
}`;
