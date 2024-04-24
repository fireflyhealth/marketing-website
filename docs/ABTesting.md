# A/B Testing

## Sanity Setup

Documents that are eligible for A/B content are configured with a `documentVariantInfo` object field. This field's information includes:

- `documentVariant?: Maybe<SanityReference>` - A primary's document reference to it's B variant.
- `variantOf?: Maybe<SanityReference>` - A variant document's reference to it's primary document.
- `isActive?: boolean` - A setting that makes this content available for B segment viewers.

### User Experience

When users are editing an A/B eligible page:

- If there is no B content, a button is displayed that allows them to clone the current document as a B variant.
- If the document _has_ a variant, the user will see:
  - Information about the variant document's `isActive` status
  - A link to the variant document
  - A button to (permanently) delete the variant document
- If the document _is_ a variant, the user will see:
  - A link to the primary document

### Document Linking & Validation

This approach requires configuring any `{ type: 'reference' }` fields to prevent them from referencing B content documents.

Some other considerations to be made:

- Custom validation, such as functions that validate a slug is unique in non-standard contexts, may need to be modified to handle scenarios with B variant documents.
- Some fields within documents should be marked as read-only when the document is a B variant.

## Next.js Setup

### Data fetching

All pages have a sibling `b-content.tsx` route. For example:

- `/pages/index.tsx` / `pages/b-content.tsx`
- `/pages/[blogSlug]/index.tsx` / `pages/[blogSlug]/b-content.tsx`
- `/pages/download/index.tsx` / `pages/download/b-content.tsx`

Each of these primary page routes export a `createGetStaticProps` function - this allows the `b-content` routes to re-use all logic related to fetching data for the page, generating static paths, and rendering the view.

This function accepts an optional `{ preferBContent: boolean }` `QueryConfig` parameter, which is then passed on to the methods for fetching Sanity content. When one of these methods is called with `preferBContent: true`, it will:

- Fetch the primary page
- If that page is found _and_ it has a valid `documentVariantInfo.variantDocument` reference, _and_ the referenced document has a `documentVariantInfo.isActive` value of `true`, it returns the variant document.
- Otherwise, it falls back to the primary document.

### Middleware

This approach results in an extra set of `**/b-content` routes - all generated with `getStaticProps`/`getStaticPaths`. We don't want viewers to actually **visit** these routes, but we need them to generate the alternate pages.

We can use [Next.js middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware) to return A or B content to viewers depending on the presence of cookie values. This function runs on every request, before page content is returned. Its logic is:

- Check the request headers for A/B cookie information.
- If it is present and the user is set to a B segment, use `NextResponse.rewrite` to serve them content from another page.

For example: when a B segment user visits the URL `/blog/for-members`, they receive the content generated for `/blog/for-members/b-content`.

See (middleware.ts)[../www/src/middleware.ts] for more details.

> **Note:** In production, this project is generated statically and deployed to Firefly's S3 account, which sits behind Cloudfront. Since it is serving simple static content, the `middleware.ts` we have here is never run. We retain it here for simpler A/B testing in development, then re-implement the logic in the Cloudfront settings. When exporting to S3, two folders will be generated that will hold the _a_ version of all page routes and another for _b_. This allows Cloudfront to simply point users to the correct version of the site depending on the cookie that is set in the browser (removing any complex page specific logic).
