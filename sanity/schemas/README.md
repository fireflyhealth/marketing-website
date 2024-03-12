# Working with the Schema

## Preventing breaking changes

When you make changes to the Sanity Schema, make sure they are not breaking changes.

**✅ Adding new non-required fields:** is safe, nothing to worry about.

**Removing non-required fields:** is safe, but should be handled by hiding the field and marking it as deprecated. Production code is already checking to see if they exist, so it won’t be caught off guard when they go missing. Note that the values will still be on these documents in Sanity, and editors will see a warning about unknown fields (with a button to remove them).

- Instead of removing the field from the schema, mark it as hidden, and include a comment that describes why it is being removed. Include a link to your PR or a follow-up ticket that indicates when it is OK to remove it from the schema, i.e. (“OK to remove after #123 is merged”).

**⚠️ Adding new required fields or making an existing field required:** is not safe. After your changes are deployed, any documents missing these fields will have validation errors, and the production site will be expecting these values to be there.

- Before your PR is merged, you will need to go into the production Sanity studio, find all documents that have this field, and add the values.

**⚠️ Removing required fields:** is not safe. The production site’s code will be expecting these values until your PR is merged, and will crash when it encounters null values. This should be handled by:

- Not removing the field (yet)
- marking the field as `hidden: true` in your PR. Add a comment describing why it was being removed. Include a link to your PR or a follow-up ticket that indicates when it is OK to remove it from the schema, i.e. (“OK to remove after #123 is merged”).
- Once your changes have been merged and the production code is using the updated schema, you can create another PR to remove the deprecated field (You should also clear out any "unknown data" warnings that will pop up in the studio at this point).

**⚠️ Modifying fields:** is not safe.

- Preserve & deprecate the field we are modifying (same deprecation instructions as above)
- Add a new field. If it is required, make sure you update documents in both production studios\* before your PR is merged.

For example, imagine you are replacing a `type: 'string'` field named `text` property with a `type: richText`

- **Don't**:
  - Change the type of the field to `richText`
- **Do:**
  - Mark the field as hidden and deprecated
  - Create a new field, i.e. `name: 'textRichText', type: richText`
  - If it is required, make sure that all documents implementing this field have values **before** merging to `main`.
  - Make the frontend changes necessary to read this field.
  - Merge your PR
  - Come back later to remove the deprecated `name: 'text', type: 'string'` field.
