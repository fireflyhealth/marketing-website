/*
 * Browse react-icons:
 * https://react-icons.github.io/react-icons/
 */
import {
  GrAnnounce,
  GrCloudDownload,
  GrMailOption,
  GrHomeRounded,
  GrCircleQuestion,
  GrDocumentMissing,
  GrAidOption,
  GrArticle,
  GrTextWrap,
} from 'react-icons/gr';

/*
 * Browse Sanity icons:
 * https://icons.sanity.build
 */
import { DocumentIcon } from '@sanity/icons';

export const icons = {
  Home: GrHomeRounded,
  Page: DocumentIcon,
  Download: GrCloudDownload,
  Contact: GrMailOption,
  NotFound: GrDocumentMissing,
  Question: GrCircleQuestion,
  Press: GrAnnounce,
  Client: GrAidOption,
  Blog: GrArticle,
  Article: GrTextWrap,
};
