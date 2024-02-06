/*
 * Browse react-icons:
 * https://react-icons.github.io/react-icons/
 */
import {
  GrCloudDownload,
  GrMailOption,
  GrHomeRounded,
  GrCircleQuestion,
  GrDocumentMissing,
  GrAidOption,
  GrArticle,
  GrTextWrap,
  GrTrash,
  GrCode,
  GrMenu,
  GrImage,
} from 'react-icons/gr';
import { SlSettings } from 'react-icons/sl';
import { PiHandPointing, PiBracketsAngleBold } from 'react-icons/pi';
import { RxComponent2 } from 'react-icons/rx';
import { BsMenuDown } from 'react-icons/bs';
import { BiCarousel, BiSolidNavigation } from 'react-icons/bi';

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
  Client: GrAidOption,
  Blog: GrArticle,
  Article: GrTextWrap,
  Trash: GrTrash,
  Settings: SlSettings,
  Code: GrCode,
  Navigation: GrMenu,
  Metadata: PiBracketsAngleBold,
  Component: RxComponent2,
  MenuDropdown: BsMenuDown,
  MenuItem: BiSolidNavigation,
  Image: GrImage,
  Carousel: BiCarousel,
  CTA: PiHandPointing,
};
