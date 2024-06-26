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
  GrVideo,
  GrDeploy,
} from 'react-icons/gr';
import { SlSettings } from 'react-icons/sl';
import {
  PiHandPointing,
  PiBracketsAngleBold,
  PiTabs,
  PiCardsFill,
} from 'react-icons/pi';
import { RxComponent2 } from 'react-icons/rx';
import {
  BiCarousel,
  BiColumns,
  BiSolidNavigation,
  BiGridHorizontal,
  BiCard,
} from 'react-icons/bi';
import { FaHubspot, FaQuoteLeft, FaHighlighter, FaMap } from 'react-icons/fa';
import {
  BsFileBarGraph,
  BsMenuDown,
  BsSegmentedNav,
  BsFiles,
  BsChatSquareQuoteFill,
  BsTag,
  BsTags,
  BsQrCode,
} from 'react-icons/bs';
import {
  MdOutlineCallToAction,
  MdPercent,
  MdOutlineViewTimeline,
  MdRateReview,
  MdOutlineDescription,
} from 'react-icons/md';
import { FaUserDoctor } from 'react-icons/fa6';
import { GoColumns, GoQuote, GoListOrdered } from 'react-icons/go';
import { RiArchiveDrawerLine } from 'react-icons/ri';
import { CgViewSplit } from 'react-icons/cg';
import { VscCaseSensitive } from 'react-icons/vsc';
import { IoMdImages } from 'react-icons/io';
import { FiDivideSquare, FiColumns, FiAlignJustify } from 'react-icons/fi';

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
  SequenceBlock: MdOutlineViewTimeline,
  Reviews: MdRateReview,
  Grid: BiGridHorizontal,
  Cards: PiCardsFill,
  Columns: BiColumns,
  Tabs: PiTabs,
  Video: GrVideo,
  Deploy: GrDeploy,
  ImageTextOverlap: BsFiles,
  Testimonial: BsChatSquareQuoteFill,
  Tags: BsTags,
  Tag: BsTag,
  RichQuote: GoQuote,
  OverlapDoubleImages: IoMdImages,
  HeaderContent: BiCard,
  QrCode: BsQrCode,
  Divider: FiDivideSquare,
  DoubleCta: FiColumns,
  RichText: FiAlignJustify,
  Highlight: FaHighlighter,
  Description: MdOutlineDescription,
  Map: FaMap,
  Footnotes: GoListOrdered,
};
