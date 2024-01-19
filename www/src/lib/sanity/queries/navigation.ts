export const NavLinkObject = `{
  _key,
  _type,
  showDropdown,
  page->{
    title,
    "slug": slug.current,
    ^.showDropdown == true => {
      subPages[]->{
        _type,
        _id,
        title,
        "slug": slug.current,
      },
    },
  },
}`;
