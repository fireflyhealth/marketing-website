/**
 * To get this data:
 *
 * - Install two CLI tools:
 *   - brew install pbcopy
 *   - brew install jq
 * - Run a query in the Vision tool using the query below.
 *   (Be sure to update it if you need to fetch more, expand any references,
 *   or if any of our fragments have changed.)
 * - Copy the Query URL from the tool
 * - In your terminal run:
 *
 *   curl "<query url>" | jq .result | pbcopy
 *
 * - Replace the contents below from your clipboard.
 *
 * Fun to-do - write a script that uses a compiled GROQ query to fetch from sanity
 * and write the contents to a JSON file!
 */

// *[_id == "mockData"]{
//   ...,
//   imageExamples[]{
//     _key,
//     label,
//     image {
//       _type,
//       _key,
//       asset->{
//         _id,
//         _type,
//         url,
//         metadata {
//           lqip,
//           dimensions {
//             aspectRatio,
//             width,
//             height
//           }
//         }
//       },
//       caption,
//       altText,
//       crop,
//       hotspot
//     }
//   },
// }[0]

export const mockData = {
  navigationExample: {
    navGroup: [
      {
        _key: 'c045eaa69bd1',
        _type: 'linkWithLabel',
        label: 'How It Works',
        link: {
          slug: '#',
        },
      },
      {
        _key: '1c734079d92a',
        _type: 'labelWithDropdown',
        label: 'For Businesses',
        subpages: [
          {
            _key: '448bb68e627e',
            _type: 'subpage',
            label: 'For Members',
            link: {
              slug: '#',
            },
          },
          {
            _key: 'ee610766c1eb',
            _type: 'subpage',
            label: 'Press',
            link: {
              slug: '#',
            },
          },
        ],
      },
      {
        _key: 'e22a5f48e2b5',
        _type: 'labelWithDropdown',
        label: 'Stories',
        subpages: [
          {
            _key: '2f30af252362',
            _type: 'subpage',
            label: 'For Members',
            link: {
              slug: '#',
            },
          },
        ],
      },
    ],
    title: 'Global Navigation',
  },
  imageExamples: [
    {
      _key: '32870e94f4e3',
      label: 'Download',
      image: {
        crop: null,
        hotspot: null,
        _type: 'richImage',
        _key: null,
        asset: {
          _id: 'image-21820f0a4428c37c61cd07aae1718a06e97c320d-2500x1945-png',
          _type: 'sanity.imageAsset',
          url: 'https://cdn.sanity.io/images/xgbrv2vi/production/21820f0a4428c37c61cd07aae1718a06e97c320d-2500x1945.png',
          metadata: {
            lqip: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnklEQVQokQGTA2z8ANa0vt6knu5+Uup3R9iZkNaqttmqtteuutawvdawvtyjrux4fPdZWu1sc9ubqNeyvtest8+BisZOVMY/RADOp8PXlqboblvkaVDTipXXkKzciqXUm7nOosTMn8HRnLrfh5/rcoXjfpbWmrnSpsbSoL3Ke4zCT1HCQj8AzZzKzYquz2Bnzlxez36d2Xuk3XKX0426yJTKwo7DyJTC1JXD2o+92JHA1JfI05rO05XE0nqMz1lK0E83ANCU0cSGuKtkfa9ke8h/rc11pspqlsyDuMaIu7+Bs8WKvs+Tz9GSz8yJvcmFtc2MxdOPyN1/judqQupiLADVlNLKkMm1ga26g7DKjMa4d62raprChKjLiJDIforMg6XQkcfLjsa7dpi0aoK/fKbOkMjei57veU73cCsA4I663J7Q1qHU2KHW1J3UuIW4q3qlx5GV0JFxz4l91ImN04+qx463s3OFqmNqtXWNxpHC0pS83oWB53hWAOZ6keGYw9+j2Nyf1taa0saNx8KMs9CUhcWEbbyDisOBgcV3fcF8lr12eLpuYLJwe6l6raZ9u6l3qKxwkwDec3DWiLLRjc/Lic3Fg8u+f8fDhKfLgnKua3KYY3+iW16tUku2YmDQfFXdg0a7c2CDXo1rWJ1qV5lpVpQAzYBWyIajxobBwYG9t3vDrXa5sm+Fu2pdpGhxjWFmiEg9jzwqoVAyznwy7JMzyH9Uf2CGYVWXXlSSXVSPALqETMeMkNWOmNaKjMWDoadzm5ZWYaVWSqt1YJt6X35USG44Knc8H6JcI9V9M86BX510kIdvn4VunIRtmwCjeVDQkXjvl2rzlFjciGqfZmdwP0B9QjOZakWog2CfeGWBVkJhNiFqNRyeUzHIe2TKkYzEk5TDkpLCkpEAlWxR2ZNo+5hc/ZJM3IFKhlE9Ti8qWjgri2E8wZBW2aRsxo5fi1o5WzIeZzglqW9N36Jt77B28a978q99AKN0Wd+TaPmIYPt9VdJtSXVAMFU0LX9XRLeFVtykXuyxbu6vdcuQX4NUN1w4IY1lLNKiOO+6R/i6Y/m2dwDSi3zijXrebmLlXVTIU0h7OTR/SUW7fXHZm4Hdn37foYPlpYndnYKqcV5zSzCFZR20lBbSsCHjslHpqX8A742f2n2OtFhfvEZIuEBAgzc3l1NdyH2Q04qd0Ymb0oqb04ub0omYtHJ5flNBc1kmiXIaqYwdyZhP25SMmXUIsMbcIbgAAAAASUVORK5CYII=',
            dimensions: {
              aspectRatio: 1.2853470437017995,
              width: 2500,
              height: 1945,
            },
          },
        },
        caption: null,
        altText:
          'A trippy image of two hands holding a phone-shaped pane of glass',
      },
    },
    {
      _key: '270f6dd43e1f',
      label: 'Download - Vertical Crop',
      image: {
        crop: {
          bottom: 0,
          _type: 'sanity.imageCrop',
          right: 0.2709923664122138,
          top: 0,
          left: 0.21564885496183217,
        },
        hotspot: {
          y: 0.5,
          height: 1,
          _type: 'sanity.imageHotspot',
          width: 0.4751908396946564,
          x: 0.47232824427480924,
        },
        _type: 'richImage',
        _key: null,
        asset: {
          _id: 'image-21820f0a4428c37c61cd07aae1718a06e97c320d-2500x1945-png',
          _type: 'sanity.imageAsset',
          url: 'https://cdn.sanity.io/images/xgbrv2vi/production/21820f0a4428c37c61cd07aae1718a06e97c320d-2500x1945.png',
          metadata: {
            lqip: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnklEQVQokQGTA2z8ANa0vt6knu5+Uup3R9iZkNaqttmqtteuutawvdawvtyjrux4fPdZWu1sc9ubqNeyvtest8+BisZOVMY/RADOp8PXlqboblvkaVDTipXXkKzciqXUm7nOosTMn8HRnLrfh5/rcoXjfpbWmrnSpsbSoL3Ke4zCT1HCQj8AzZzKzYquz2Bnzlxez36d2Xuk3XKX0426yJTKwo7DyJTC1JXD2o+92JHA1JfI05rO05XE0nqMz1lK0E83ANCU0cSGuKtkfa9ke8h/rc11pspqlsyDuMaIu7+Bs8WKvs+Tz9GSz8yJvcmFtc2MxdOPyN1/judqQupiLADVlNLKkMm1ga26g7DKjMa4d62raprChKjLiJDIforMg6XQkcfLjsa7dpi0aoK/fKbOkMjei57veU73cCsA4I663J7Q1qHU2KHW1J3UuIW4q3qlx5GV0JFxz4l91ImN04+qx463s3OFqmNqtXWNxpHC0pS83oWB53hWAOZ6keGYw9+j2Nyf1taa0saNx8KMs9CUhcWEbbyDisOBgcV3fcF8lr12eLpuYLJwe6l6raZ9u6l3qKxwkwDec3DWiLLRjc/Lic3Fg8u+f8fDhKfLgnKua3KYY3+iW16tUku2YmDQfFXdg0a7c2CDXo1rWJ1qV5lpVpQAzYBWyIajxobBwYG9t3vDrXa5sm+Fu2pdpGhxjWFmiEg9jzwqoVAyznwy7JMzyH9Uf2CGYVWXXlSSXVSPALqETMeMkNWOmNaKjMWDoadzm5ZWYaVWSqt1YJt6X35USG44Knc8H6JcI9V9M86BX510kIdvn4VunIRtmwCjeVDQkXjvl2rzlFjciGqfZmdwP0B9QjOZakWog2CfeGWBVkJhNiFqNRyeUzHIe2TKkYzEk5TDkpLCkpEAlWxR2ZNo+5hc/ZJM3IFKhlE9Ti8qWjgri2E8wZBW2aRsxo5fi1o5WzIeZzglqW9N36Jt77B28a978q99AKN0Wd+TaPmIYPt9VdJtSXVAMFU0LX9XRLeFVtykXuyxbu6vdcuQX4NUN1w4IY1lLNKiOO+6R/i6Y/m2dwDSi3zijXrebmLlXVTIU0h7OTR/SUW7fXHZm4Hdn37foYPlpYndnYKqcV5zSzCFZR20lBbSsCHjslHpqX8A742f2n2OtFhfvEZIuEBAgzc3l1NdyH2Q04qd0Ymb0oqb04ub0omYtHJ5flNBc1kmiXIaqYwdyZhP25SMmXUIsMbcIbgAAAAASUVORK5CYII=',
            dimensions: {
              aspectRatio: 1.2853470437017995,
              width: 2500,
              height: 1945,
            },
          },
        },
        caption: null,
        altText:
          'A trippy image of two hands holding a phone-shaped pane of glass',
      },
    },
    {
      _key: 'd659fa04281d',
      label: 'Download - upper-right hot spot',
      image: {
        asset: {
          _id: 'image-21820f0a4428c37c61cd07aae1718a06e97c320d-2500x1945-png',
          _type: 'sanity.imageAsset',
          url: 'https://cdn.sanity.io/images/xgbrv2vi/production/21820f0a4428c37c61cd07aae1718a06e97c320d-2500x1945.png',
          metadata: {
            lqip: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnklEQVQokQGTA2z8ANa0vt6knu5+Uup3R9iZkNaqttmqtteuutawvdawvtyjrux4fPdZWu1sc9ubqNeyvtest8+BisZOVMY/RADOp8PXlqboblvkaVDTipXXkKzciqXUm7nOosTMn8HRnLrfh5/rcoXjfpbWmrnSpsbSoL3Ke4zCT1HCQj8AzZzKzYquz2Bnzlxez36d2Xuk3XKX0426yJTKwo7DyJTC1JXD2o+92JHA1JfI05rO05XE0nqMz1lK0E83ANCU0cSGuKtkfa9ke8h/rc11pspqlsyDuMaIu7+Bs8WKvs+Tz9GSz8yJvcmFtc2MxdOPyN1/judqQupiLADVlNLKkMm1ga26g7DKjMa4d62raprChKjLiJDIforMg6XQkcfLjsa7dpi0aoK/fKbOkMjei57veU73cCsA4I663J7Q1qHU2KHW1J3UuIW4q3qlx5GV0JFxz4l91ImN04+qx463s3OFqmNqtXWNxpHC0pS83oWB53hWAOZ6keGYw9+j2Nyf1taa0saNx8KMs9CUhcWEbbyDisOBgcV3fcF8lr12eLpuYLJwe6l6raZ9u6l3qKxwkwDec3DWiLLRjc/Lic3Fg8u+f8fDhKfLgnKua3KYY3+iW16tUku2YmDQfFXdg0a7c2CDXo1rWJ1qV5lpVpQAzYBWyIajxobBwYG9t3vDrXa5sm+Fu2pdpGhxjWFmiEg9jzwqoVAyznwy7JMzyH9Uf2CGYVWXXlSSXVSPALqETMeMkNWOmNaKjMWDoadzm5ZWYaVWSqt1YJt6X35USG44Knc8H6JcI9V9M86BX510kIdvn4VunIRtmwCjeVDQkXjvl2rzlFjciGqfZmdwP0B9QjOZakWog2CfeGWBVkJhNiFqNRyeUzHIe2TKkYzEk5TDkpLCkpEAlWxR2ZNo+5hc/ZJM3IFKhlE9Ti8qWjgri2E8wZBW2aRsxo5fi1o5WzIeZzglqW9N36Jt77B28a978q99AKN0Wd+TaPmIYPt9VdJtSXVAMFU0LX9XRLeFVtykXuyxbu6vdcuQX4NUN1w4IY1lLNKiOO+6R/i6Y/m2dwDSi3zijXrebmLlXVTIU0h7OTR/SUW7fXHZm4Hdn37foYPlpYndnYKqcV5zSzCFZR20lBbSsCHjslHpqX8A742f2n2OtFhfvEZIuEBAgzc3l1NdyH2Q04qd0Ymb0oqb04ub0omYtHJ5flNBc1kmiXIaqYwdyZhP25SMmXUIsMbcIbgAAAAASUVORK5CYII=',
            dimensions: {
              aspectRatio: 1.2853470437017995,
              width: 2500,
              height: 1945,
            },
          },
        },
        caption: null,
        altText:
          'A trippy image of two hands holding a phone-shaped pane of glass',
        crop: {
          top: 0,
          left: 0,
          bottom: 0,
          _type: 'sanity.imageCrop',
          right: 0,
        },
        hotspot: {
          width: 0.1870229007633585,
          x: 0.9064885496183208,
          y: 0.11488647736415543,
          height: 0.22977295472831086,
          _type: 'sanity.imageHotspot',
        },
        _type: 'richImage',
        _key: null,
      },
    },
  ],
  _id: 'mockData',
  _updatedAt: '2024-01-22T19:53:43Z',
  articleRichText: [
    {
      style: 'h2',
      _key: 'f9549c2e94e7',
      markDefs: [],
      children: [
        {
          text: 'Good and Bad Cholesterol',
          _key: '2a6c1fa8737d',
          _type: 'span',
          marks: [],
        },
      ],
      _type: 'block',
    },
    {
      style: 'blockquote-large',
      _key: '1329dde686d3',
      markDefs: [],
      children: [
        {
          text: "It gets a bad rap, but cholesterol isn't always the villain. Your body actually needs cholesterol to survive and perform essential functions, such as building cells and making hormones. But, as is often the case, too much of a good thing can be bad for your health. Because high cholesterol is a major risk factor for heart disease and stroke, we’re breaking down the facts on cholesterol below.",
          _key: '57cbd81c29270',
          _type: 'span',
          marks: [],
        },
      ],
      _type: 'block',
    },
    {
      _type: 'block',
      style: 'h3',
      _key: 'ae870c9982f1',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'What is Cholesterol, anyway?',
          _key: '6d8a53e1302e',
        },
      ],
    },
    {
      style: 'normal',
      _key: 'a7386fd97ecb',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'When it comes to high cholesterol, the best treatment is prevention. Since high cholesterol is often the result of your lifestyle choices, there are ways you can help keep it in check by simply making healthy lifestyle choices.',
          _key: 'd8dcaf64e2a60',
        },
      ],
      _type: 'block',
    },
    {
      style: 'h4',
      _key: 'b7855f92fb00',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'Two types of Cholesterol',
          _key: '22b597d9117e',
        },
      ],
      _type: 'block',
    },
    {
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'The good kind',
          _key: '30a54005c774',
        },
      ],
      level: 1,
      _type: 'block',
      style: 'normal',
      _key: 'e8ef046a9e1e',
      listItem: 'number',
      markDefs: [],
    },
    {
      style: 'normal',
      _key: 'b039500d241d',
      listItem: 'number',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'The bad kind',
          _key: '4f2ba1f42b30',
        },
      ],
      level: 1,
      _type: 'block',
    },
    {
      _type: 'block',
      style: 'h4',
      _key: '77296c9625db',
      markDefs: [],
      children: [
        {
          marks: [],
          text: 'Fun Cholesterol Facts',
          _key: 'fdc875ebdf09',
          _type: 'span',
        },
      ],
    },
    {
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'It is often misspelled.',
          _key: '675f0342bde7',
        },
      ],
      level: 1,
      _type: 'block',
      style: 'normal',
      _key: '38aff29e4632',
      listItem: 'bullet',
      markDefs: [],
    },
    {
      listItem: 'bullet',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'The word ',
          _key: '18208473612e',
        },
        {
          _type: 'span',
          marks: ['em'],
          text: 'cholesterol',
          _key: '05b12cd8b11a1',
        },
        {
          _type: 'span',
          marks: [],
          text: ' comes from Ancient Greek ',
          _key: '05b12cd8b11a2',
        },
        {
          _key: '05b12cd8b11a3',
          _type: 'span',
          marks: ['em'],
          text: 'chole-',
        },
        {
          _key: '05b12cd8b11a4',
          _type: 'span',
          marks: [],
          text: " 'bile' and ",
        },
        {
          _type: 'span',
          marks: ['em'],
          text: 'stereos',
          _key: '05b12cd8b11a5',
        },
        {
          _type: 'span',
          marks: [],
          text: " 'solid', followed by the chemical suffix ",
          _key: '05b12cd8b11a6',
        },
        {
          _type: 'span',
          marks: ['em'],
          text: '-ol',
          _key: '05b12cd8b11a7',
        },
        {
          _type: 'span',
          marks: [],
          text: ' for an alcohol.',
          _key: '05b12cd8b11a8',
        },
      ],
      level: 1,
      _type: 'block',
      style: 'normal',
      _key: 'd2b90adb4e97',
    },
    {
      _key: '02f616b62bb9',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'The best treatment for high cholesterol is prevention. This includes eating healthy foods, moving your body, and managing stress.',
          _key: '42fea3033a330',
        },
      ],
      _type: 'block',
      style: 'blockquote',
    },
    {
      _key: 'd2fd59018041',
      _type: 'icon',
      icon: 'app',
    },
  ],
  _createdAt: '2024-01-18T20:57:43Z',
  simpleRichText: [
    {
      _key: 'ba1ffe54724a',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'Some simple rich text with ',
          _key: 'b8201dbc36e3',
        },
        {
          _key: '4aca0acaf27c',
          _type: 'span',
          marks: ['strong', 'em'],
          text: 'bold, ',
        },
        {
          marks: ['em'],
          text: 'italic',
          _key: 'aaa0b6c86420',
          _type: 'span',
        },
        {
          _type: 'span',
          marks: [],
          text: ', and ',
          _key: '2e48a5b64bff',
        },
        {
          _type: 'span',
          marks: ['underline'],
          text: 'underlined',
          _key: '9604f46b64f7',
        },
        {
          _key: '1003654503b2',
          _type: 'span',
          marks: [],
          text: ' text.',
        },
      ],
      _type: 'block',
      style: 'normal',
    },
    {
      children: [
        {
          marks: [],
          text: 'A second line with ',
          _key: '1a12600685dd',
          _type: 'span',
        },
        {
          _type: 'span',
          marks: ['strong', 'em', 'underline'],
          text: 'combined ',
          _key: '26b3a9714de2',
        },
        {
          _type: 'span',
          marks: ['em', 'underline'],
          text: 'styles',
          _key: 'fc363ff2e319',
        },
      ],
      _type: 'block',
      style: 'normal',
      _key: 'caacdb79d913',
      markDefs: [],
    },
  ],
  _rev: 'ZLvKaZvfbZlWBlGcp3l3p7',
  _type: 'mockData',
} as const;
