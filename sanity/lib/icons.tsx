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
import { BiCarousel, BiSolidNavigation } from 'react-icons/bi';
import { FaHubspot, FaQuoteLeft } from 'react-icons/fa';
import { BsFileBarGraph, BsMenuDown, BsSegmentedNav } from 'react-icons/bs';
import { MdOutlineCallToAction, MdPercent } from 'react-icons/md';
import { FaUserDoctor } from 'react-icons/fa6';
import { GoColumns } from 'react-icons/go';
import { RiArchiveDrawerLine } from 'react-icons/ri';
import { CgViewSplit } from 'react-icons/cg';
import { VscCaseSensitive } from 'react-icons/vsc';

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
  Hubspot: FaHubspot,
  BarGraph: BsFileBarGraph,
  DoubleCTA: MdOutlineCallToAction,
  Practitioner: FaUserDoctor,
  TwoColumn: GoColumns,
  Quote: FaQuoteLeft,
  Drawer: RiArchiveDrawerLine,
  Subnav: BsSegmentedNav,
  TwoUp: CgViewSplit,
  Percentage: MdPercent,
  Text: VscCaseSensitive,
};
