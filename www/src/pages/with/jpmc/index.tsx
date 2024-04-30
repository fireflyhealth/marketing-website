import { useState } from 'react';
import cn from 'classnames';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import ReactPlayer from 'react-player';
import { RevalidationTime } from '@/constants';
import * as Sanity from '@/lib/sanity';
import { QueryConfig } from '@/lib/sanity';
import { Accordion } from '@/atoms/Accordion';

import heroImage from './images/about-hero-1.jpg';
import JPMCLogo from './images/648235e6145ec6158ef046bb_JPM white.svg';
import fireflyLogoLight from './images/FF_primary_light_180x29.svg';
import iconAlwaysOn from './images/icon-always-on.svg';
import iconConvenience from './images/icon-convenience.svg';
import iconSpecialist from './images/icon-Specialists.svg';
import iconTime from './images/icon-time.svg';
import careTeamGraphic from './images/careTeam_graphic-1.png';
import memberCareNetwork from './images/member-network-care-options.png';
import stepOne from './images/1---home.png';
import stepTwo from './images/2---pick-team.png';
import stepThree from './images/3---book-a-visit.png';

const JPMCLandingPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>
          Digital-first Primary Care | JPMorgan Chase and Firefly Health
        </title>
        <meta
          content="Medical issues, emotional well-being, healthy habits — Firefly is here for all of it, 24/7. With chat and video visits, you have complete care right at your fingertips."
          name="description"
        />
        <meta
          content="Digital-first Primary Care | JPMorgan Chase and Firefly Health"
          property="og:title"
        />
        <meta
          content="Medical issues, emotional well-being, healthy habits — Firefly is here for all of it, 24/7. With chat and video visits, you have complete care right at your fingertips."
          property="og:description"
        />
        <meta
          content="Digital-first Primary Care | JPMorgan Chase and Firefly Health"
          property="twitter:title"
        />
        <meta
          content="Medical issues, emotional well-being, healthy habits — Firefly is here for all of it, 24/7. With chat and video visits, you have complete care right at your fingertips."
          property="twitter:description"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        {/* <script type="text/javascript">WebFont.load({  google: {    families: ["Source Sans Pro:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic"]  }});</script> */}
        {/* <script src="https://use.typekit.net/piu7ihw.js" type="text/javascript"></script> */}
        {/* <script type="text/javascript">try{Typekit.load();}catch(e){}</script> */}
        {/* <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.classNameName+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.classNameName+=t+"touch")}(window,document);</script> */}
        <link
          href="images/favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <body id="JPMCLandingPage" className="container-padding-bleed p-0">
        <main className="main-wrapper">
          <div className="animation-load-first-group">
            <section className="section-fullbleed-partner-hero is-landing-page">
              <div className="w-layout-grid fullbleed-partner-hero_component">
                <div
                  id="w-node-_487a207e-5780-cc7b-b5ba-453d2b29275e-d1ed5f6f"
                  className="plan-hero_bg-image-wrapper relative"
                >
                  <Image
                    src={heroImage}
                    loading="lazy"
                    alt=""
                    className="absolute left-0 top-0 object-cover z-[-1] h-full w-full"
                  />
                </div>
                <div
                  id="w-node-_832af8b2-30eb-4536-a4a5-89cbe90c6455-d1ed5f6f"
                  className="page-padding"
                >
                  <div className="fullbleed-hero_content">
                    <div className="padding-vertical padding-large">
                      <div className="animation-first"></div>
                      <div className="fullbleed-hero_logo-container">
                        <Image
                          src={JPMCLogo}
                          loading="lazy"
                          alt="Firefly Health Logo"
                          id="w-node-_195fe602-e137-05f9-c763-ac59a7af45e3-d1ed5f6f"
                          className="fullbleed-hero_content-logo-firefly"
                        />
                        <Image
                          src={fireflyLogoLight}
                          loading="lazy"
                          alt="Firefly Health Logo"
                          id="w-node-_195fe602-e137-05f9-c763-ac59a7af45e3-d1ed5f6f"
                          className="fullbleed-hero_content-logo-firefly"
                        />
                      </div>
                      <div className="animation-second">
                        <h1 className="text-fullbleed-hero-heading w-dyn-bind-empty">
                          Your care team. Anytime. Anywhere.
                        </h1>
                      </div>
                      <div className="animation-third">
                        <div className="margin-top margin-small">
                          <p className="text-size-medium text-color-white text-color-blue-mobile">
                            No matter what your health concerns or questions,
                            Firefly is here for all of it 24/7. With chat and
                            video visits, you have complete care right at your
                            fingertips.
                          </p>
                        </div>
                        <div className="margin-top margin-small">
                          <p className="bcbs_hero-text-disclaimer w-dyn-bind-empty"></p>
                          <div className="button-group">
                            <a
                              href="#"
                              className="button button-size-large w-button"
                            >
                              Sign up today
                            </a>
                            <a
                              href="#video-section"
                              className="button button-size-large w-button"
                            >
                              Watch a video
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="animation-load-second-group">
            <section className="section_app-demo">
              <div className="padding-global">
                <div className="container-large">
                  <div className="padding-section-large">
                    <div className="w-layout-grid app-demo_component">
                      <div className="app-demo_content">
                        <div className="margin-bottom margin-medium animation-first">
                          <div className="max-width-medium">
                            <h2>Expect more from primary care </h2>
                          </div>
                          <div className="margin-top margin-small">
                            <div className="text-size-medium">
                              When you select a Firefly PCP, you get connected
                              with an interdisciplinary care team. Firefly’s
                              digital-first model allows for most interactions
                              to be virtual. And that has a lot of advantages.
                              <br />
                            </div>
                          </div>
                        </div>
                        <div className="w-layout-grid app-demo_item-list animation-third">
                          <div className="app-demo_item">
                            <div className="margin-bottom margin-small">
                              <Image
                                src={iconAlwaysOn}
                                loading="lazy"
                                alt=""
                                className="icon-medium"
                              />
                            </div>
                            <div className="margin-bottom margin-xsmall">
                              <h3 className="heading-small">
                                Care that’s always on
                              </h3>
                            </div>
                            <p>
                              From joint pain to high blood pressure, anxiety to
                              healthy eating, your care team is here for you
                              during visits — and between them too.
                            </p>
                          </div>
                          <div className="app-demo_item">
                            <div className="margin-bottom margin-small">
                              <Image
                                src={iconConvenience}
                                loading="lazy"
                                alt=""
                                className="icon-medium"
                              />
                            </div>
                            <div className="margin-bottom margin-xsmall">
                              <h3 className="heading-small">
                                Ridiculous convenience
                              </h3>
                            </div>
                            <p>
                              Firefly comes to you through video calls and chat.
                              No driving, no waiting rooms. Just 24/7 access to
                              your care team, wherever you are.
                            </p>
                          </div>
                          <div className="app-demo_item">
                            <div className="margin-bottom margin-small">
                              <Image
                                src={iconSpecialist}
                                loading="lazy"
                                alt=""
                                className="icon-1x1-medium"
                              />
                            </div>
                            <div className="margin-bottom margin-xsmall">
                              <h3 className="heading-small">
                                Specialists made easy
                              </h3>
                            </div>
                            <p>
                              Firefly puts in the referrals and works closely
                              with your other providers to coordinate your care.{' '}
                            </p>
                          </div>
                          <div className="app-demo_item">
                            <div className="margin-bottom margin-small">
                              <Image
                                src={iconTime}
                                loading="lazy"
                                alt=""
                                className="icon-medium"
                              />
                            </div>
                            <div className="margin-bottom margin-xsmall">
                              <h3 className="heading-small">
                                Complete support
                              </h3>
                            </div>
                            <p>
                              You’re not on your own anymore. Prescriptions,
                              labs, imaging? Firefly will guide you to the care
                              you need and solve any issues along the way.
                              <br />
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        id="w-node-b2161cb5-ef3c-c6ce-cec0-7face87e9758-d1ed5f6f"
                        className="app-demo_video-wrapper"
                      >
                        <div
                          data-poster-url="videos/BCBS_user_flow_v2-crop-poster-00001.jpg"
                          data-video-urls="videos/BCBS_user_flow_v2-crop-transcode.mp4,videos/BCBS_user_flow_v2-crop-transcode.webm"
                          data-autoplay="true"
                          data-loop="true"
                          data-wf-ignore="true"
                          className="app-demo_video w-background-video w-background-video-atom"
                        >
                          <video
                            id="b2161cb5-ef3c-c6ce-cec0-7face87e9759-video"
                            autoPlay={true}
                            loop={true}
                            muted={true}
                            playsInline={true}
                            data-wf-ignore="true"
                            data-object-fit="cover"
                          >
                            <source
                              src="/videos/BCBS_user_flow_v2-crop-transcode.mp4"
                              type="video/mp4"
                              data-wf-ignore="true"
                            />
                            <source
                              src="/videos/BCBS_user_flow_v2-crop-transcode.webm"
                              type="video/webm"
                              data-wf-ignore="true"
                            />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="section-team-approach background-color-lightgrey">
              <div className="padding-vertical padding-large">
                <div className="page-padding">
                  <div className="container-medium">
                    <div className="animation-first">
                      <div className="text-align-center">
                        <div className="padding-vertical padding-large">
                          <h2>A team approach to better health</h2>
                          <div className="margin-top margin-small">
                            <div className="text-size-medium">
                              Your health happens between doctor visits, not at
                              them. More than just annual wellness visits, your
                              Firefly care team delivers ongoing support. And of
                              course, all Firefly providers are fully licensed.
                              You choose your care team when you sign up.
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-large">
                    <div className="padding-vertical padding-large">
                      <div className="animation-second">
                        <div className="w-layout-grid team-approach_component">
                          {/* TODO: fix srcset */}
                          <Image
                            src={careTeamGraphic}
                            loading="lazy"
                            id="w-node-_03a31feb-8db8-6478-0830-be82431e8f64-d1ed5f6f"
                            width="418"
                            alt="Care team with patient"
                            // srcSet="images/careTeam_graphic-1-p-500.png 500w, images/careTeam_graphic-1.png 836w"
                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 418px, (max-width: 991px) 44vw, 23vw"
                          />
                          <div
                            id="w-node-_03a31feb-8db8-6478-0830-be82431e8f65-d1ed5f6f"
                            className="team-approach_item"
                          >
                            <h3 className="heading-small">
                              Primary care doctor
                            </h3>
                            <div className="margin-top margin-small">
                              <p>
                                Every team needs a steady hand to show the way.
                                Your Firefly doctor coordinates and personalizes
                                your care to meet your specific needs.
                              </p>
                            </div>
                          </div>
                          <div
                            id="w-node-_03a31feb-8db8-6478-0830-be82431e8f6b-d1ed5f6f"
                            className="team-approach_item"
                          >
                            <h3 className="heading-small">
                              Nurse practitioner (NP)
                            </h3>
                            <div className="margin-top margin-small">
                              <p>
                                Your NP will be the first to hop on a video call
                                or answer your chats, so you’ll feel known and
                                supported no matter what comes up.
                              </p>
                            </div>
                          </div>
                          <div
                            id="w-node-_03a31feb-8db8-6478-0830-be82431e8f71-d1ed5f6f"
                            className="team-approach_item"
                          >
                            <h3 className="heading-small">Health guide</h3>
                            <div className="margin-top margin-small">
                              <p>
                                From healthier eating to lowering stress, your
                                health guide is here for you. With practical
                                tips and positive support, you’ll feel empowered
                                to be your healthiest you.
                              </p>
                            </div>
                          </div>
                          <div
                            id="w-node-_03a31feb-8db8-6478-0830-be82431e8f77-d1ed5f6f"
                            className="team-approach_item"
                          >
                            <div className="heading-small">
                              Behavioral health specialist
                            </div>
                            <div className="margin-top margin-small">
                              <p>
                                Your licensed behavioral health specialist will
                                assess your concerns, create a plan, and check
                                your progress along the way.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-medium">
                    <div className="animation-third">
                      <div className="text-align-center">
                        <div className="margin-top margin-small">
                          <div className="text-align-center">
                            <div className="margin-top margin-medium">
                              <a
                                href="#"
                                className="button button-size-large w-button"
                              >
                                Sign up today
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="section-care-pass-how">
              <div className="page-padding">
                <div className="container-large">
                  <div className="padding-vertical padding-large">
                    <div className="text-align-center">
                      <div className="padding-vertical padding-large">
                        <h2>Yes, you can still get in-person care</h2>
                      </div>
                    </div>
                    <div className="w-layout-grid _50-50_component">
                      <div className="_50-50_content">
                        <div className="animation-first">
                          <div className="margin-top margin-small">
                            <div className="text-rich-text w-richtext">
                              <p>
                                Most services can be performed virtually by your
                                Firefly primary care team. However, when
                                in-person services are needed ─ such as
                                listening to your heart, checking an ankle
                                sprain, etc. ─ you’ll be referred to one of 58
                                Houston-area facilities in the Firefly In-Person
                                Primary Care Network. Care received within this
                                comprehensive network is available at no
                                additional cost and is made up of:
                                <br />
                              </p>
                              <ul role="list">
                                <li>
                                  Urgent care centers managed by Next Level
                                  Urgent Care{' '}
                                </li>
                                <li>
                                  Retail clinics operated by CVS Minute Clinics{' '}
                                </li>
                                <li>
                                  Acadian, which is an in-home provider offering
                                  coverage to those living in a zip code that
                                  begins with the following three digits - 770,
                                  772, 773, 774, 775, 789
                                </li>
                              </ul>
                              <p>
                                And for specialists, imaging, and labs? We’re
                                happy to work with your current providers or
                                connect you with one of our partners. We’ll take
                                care of the referral and make sure your care is
                                well coordinated.
                              </p>
                              <p>
                                <strong>Important note: </strong>Before
                                enrolling, please check to see if any of the 58
                                locations listed below are convenient to you.
                                Should you enroll anyway, Firefly may be able to
                                refer you to a facility outside of the in-person
                                network, in which case you are likely to
                                generate out-of-pocket costs. To learn more
                                about the availability of these locations in
                                Houston, you can explore the In-Person Primary
                                Care Network locations through the link below:
                              </p>
                              <p>
                                ‍
                                <a href="documents/Firefly-In-person-network-facilities-near-you.pdf">
                                  <strong>Download locations (PDF)</strong>
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="_50-50_image-wrapper">
                        <div className="animation-second">
                          {/* TODO: fix srcset */}
                          <Image
                            src={memberCareNetwork}
                            loading="lazy"
                            sizes="100vw"
                            // srcset="images/member-network-care-options-p-500.png 500w, images/member-network-care-options.png 700w"
                            alt="Member network care options"
                            className="future-coworkers_image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section_three-step-guide">
              <div className="padding-global">
                <div className="container-medium">
                  <div className="padding-section-medium">
                    <div className="three-step-guide_component">
                      <div className="margin-bottom margin-medium">
                        <div className="text-align-center">
                          <div className="padding-vertical padding-large">
                            <h2>What to expect</h2>
                            <div className="margin-top margin-small">
                              <div className="text-size-medium">
                                Here&#x27;s how to get started with Firefly
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-duration-in="400"
                        data-duration-out="200"
                        data-current="Tab 1"
                        data-easing="ease"
                        className="layout28_component w-tabs"
                      >
                        <div
                          id="w-node-be321025-a00f-7d22-0fd5-e57a25ae749d-d1ed5f6f"
                          className="layout28_tabs-menu w-tab-menu"
                        >
                          <a
                            data-w-tab="Tab 1"
                            className={cn(
                              'layout28_tabs-link w-inline-block w-tab-link',
                              currentStep === 1 ? 'w--current' : '',
                            )}
                            onClick={() => setCurrentStep(1)}
                          >
                            <div className="margin-bottom-7 margin-xsmall">
                              <h3 className="heading-small">
                                1. Sign up online and get our app
                              </h3>
                            </div>
                            <p>
                              Start signup on the web, finish in the Firefly
                              Health app.{' '}
                            </p>
                          </a>
                          <a
                            data-w-tab="Tab 2"
                            className={cn(
                              'layout28_tabs-link w-inline-block w-tab-link',
                              currentStep === 2 ? 'w--current' : '',
                            )}
                            onClick={() => setCurrentStep(2)}
                          >
                            <div className="margin-bottom-7 margin-xsmall">
                              <h3 className="heading-small">
                                2. Select your care team
                              </h3>
                            </div>
                            <p>
                              Browse our teams and find one that&#x27;s right
                              for you.
                            </p>
                          </a>
                          <a
                            data-w-tab="Tab 3"
                            className={cn(
                              'layout28_tabs-link w-inline-block w-tab-link',
                              currentStep === 3 ? 'w--current' : '',
                            )}
                            onClick={() => setCurrentStep(3)}
                          >
                            <div className="margin-bottom-7 margin-xsmall">
                              <h3 className="heading-small">
                                3. Book your first video visit
                              </h3>
                            </div>
                            <p>Get your first appointment on your calendar!</p>
                          </a>
                        </div>
                        <div className="w-tab-content">
                          <div
                            data-w-tab="Tab 1"
                            className={cn(
                              'w-tab-pane',
                              currentStep === 1 ? 'w--tab-active' : 'hidden',
                            )}
                          >
                            <div className="layout28_image-wrapper">
                              <Image
                                alt=""
                                loading="lazy"
                                src={stepOne}
                                className="three-step-guide_image"
                              />
                            </div>
                          </div>
                          <div
                            data-w-tab="Tab 2"
                            className={cn(
                              'w-tab-pane',
                              currentStep === 2 ? 'w--tab-active' : 'hidden',
                            )}
                          >
                            <div className="layout28_image-wrapper">
                              <Image
                                alt=""
                                loading="lazy"
                                src={stepTwo}
                                className="three-step-guide_image"
                              />
                            </div>
                          </div>
                          <div
                            data-w-tab="Tab 3"
                            className={cn(
                              'w-tab-pane',
                              currentStep === 3 ? 'w--tab-active' : 'hidden',
                            )}
                          >
                            <div className="layout28_image-wrapper">
                              <Image
                                alt=""
                                loading="lazy"
                                src={stepThree}
                                className="three-step-guide_image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="padding-global">
              <div className="container-large">
                <div className="padding-section-large">
                  <div
                    data-delay="4000"
                    data-animation="slide"
                    className="testimonial7_component w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                  >
                    <div className="testimonial7_mask w-slider-mask">
                      <div className="testimonial7_slide w-slide">
                        <div className="testimonial7_content">
                          <div
                            style={{ paddingTop: '56.27659574468085%' }}
                            className="video-firefly-difference w-video w-embed"
                          >
                            <iframe
                              className="embedly-embed"
                              src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F933426171%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=http%3A%2F%2Fvimeo.com%2F933426171&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1831874578-8edeab35ff8cd66ea3b97379704d16091c2d8b0fd314fe15fae6ece1cc8ad034-d_1280&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=vimeo"
                              width="940"
                              height="529"
                              scrolling="no"
                              allowFullScreen={true}
                              title="Meet Firefly Health: Virtual Primary Care for JPMC employees"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial7_slide w-slide">
                        <div className="testimonial7_content">
                          <div
                            style={{ paddingTop: '56.27659574468085%' }}
                            className="video-firefly-difference w-video w-embed"
                          >
                            <iframe
                              className="embedly-embed"
                              src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F933470542%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F933470542&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1831942319-c3489258cc00649aa37cb86c2e7e8b666cb554dcb1881ddf5fff2a1e8832138b-d_1280&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=vimeo"
                              width="940"
                              height="529"
                              scrolling="no"
                              allowFullScreen={true}
                              title="Your first video visit with Firefly Health"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial7_slide w-slide">
                        <div className="testimonial7_content">
                          <div
                            style={{ paddingTop: '56.27659574468085%' }}
                            className="video-firefly-difference w-video w-embed"
                          >
                            <iframe
                              className="embedly-embed"
                              src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F933474325%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F933474325&image=http%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1831946453-6f0ff2cc0160ca095e48a895c8a815857caac3440567a1af0b263612ed9a495c-d_1280&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=vimeo"
                              width="940"
                              height="529"
                              scrolling="no"
                              allowFullScreen={true}
                              title="Anytime, anywhere care with Firefly's care team"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial7_slide w-slide">
                        <div className="testimonial7_content">
                          <div
                            style={{ paddingTop: '56.27659574468085%' }}
                            className="video-firefly-difference w-video w-embed"
                          >
                            <iframe
                              className="embedly-embed"
                              src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F933477210%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F933477210&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1831951355-34f7b39a77b65995bf6dc50dd66a69b2481e9eafe1c071b5e32f09f0294e8018-d_1280&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=vimeo"
                              width="940"
                              height="529"
                              scrolling="no"
                              allowFullScreen={true}
                              title="Getting in-person care with Firefly"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial7_slide w-slide">
                        <div className="testimonial7_content">
                          <div
                            style={{ paddingTop: '56.27659574468085%' }}
                            className="video-firefly-difference w-video w-embed"
                          >
                            <iframe
                              className="embedly-embed"
                              src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F933480433%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F933480433&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1831956870-c921240f1df09716359c6f516ab7552c8d513aa64353cd63260fc784fe57e48c-d_1280&key=c4e54deccf4d4ec997a64902e9a30300&type=text%2Fhtml&schema=vimeo"
                              width="940"
                              height="529"
                              scrolling="no"
                              allowFullScreen={true}
                              title="Access a Behavioral Health Specialist"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial7_arrow hide-mobile-landscape w-slider-arrow-left">
                      <div className="testimonial7_arrow-icon w-embed">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.31066 8.75001L9.03033 14.4697L7.96967 15.5303L0.439339 8.00001L7.96967 0.469676L9.03033 1.53034L3.31066 7.25001L15.5 7.25L15.5 8.75L3.31066 8.75001Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="testimonial7_arrow w-slider-arrow-right">
                      <div className="testimonial7_arrow-icon hide-mobile-landscape w-embed">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.6893 7.25L6.96967 1.53033L8.03033 0.469666L15.5607 8L8.03033 15.5303L6.96967 14.4697L12.6893 8.75H0.5V7.25H12.6893Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="testimonial7_slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="animation-load-third-group">
            <section className="section-get-started">
              <div className="padding-vertical padding-huge">
                <div className="page-padding">
                  <div className="padding-vertical padding-large">
                    <div className="container-medium">
                      <div className="animation-first">
                        <div className="text-align-center">
                          <h2 className="text-color-white">
                            Get started with Firefly Health
                          </h2>
                          <div className="margin-top margin-small">
                            <div className="text-size-medium text-color-white">
                              Sign up online and get our app, choose your care
                              team, and book your first visit.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="animation-second">
                        <div className="text-align-center">
                          <div className="margin-top margin-medium">
                            <a
                              href="#Contact-Form"
                              className="button button-size-large w-button"
                            >
                              Sign up!
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div id="FAQ-blue" className="background-color-gradient-blue-green">
              <div className="padding-vertical padding-large">
                <div className="page-padding">
                  <div className="container-medium">
                    <div className="animation-first">
                      <div className="text-align-center">
                        <div className="padding-vertical padding-large">
                          <h2 className="text-color-white !text-white">
                            Frequently asked questions
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-medium">
                    <div className="animation-second">
                      <div className="border-b-[1px] border-white p-6">
                        <Accordion
                          title="Can I still see my current primary care provider (PCP)?"
                          isArrowIcon={false}
                          textOverride="!text-white"
                        >
                          <div className="text-rich-text-white w-dyn-bind-empty w-richtext">
                            No, because your Firefly care team becomes your new
                            PCP. We’ll help get your medical records from your
                            current doctor. You can keep your specialists
                            though.
                          </div>
                        </Accordion>
                      </div>
                      <div className="border-b-[1px] border-white p-6">
                        <Accordion
                          title="What are the benefits of virtual care?"
                          isArrowIcon={false}
                          textOverride="!text-white"
                        >
                          <div className="text-rich-text-white w-dyn-bind-empty w-richtext">
                            Your virtual Firefly care team is available on
                            demand by video and chat whenever you’re sick, need
                            to ask a one-off question, or have a health concern.
                            Most primary care services can be done virtually
                            with your Firefly care team through easy-to-schedule
                            primary care appointments available at the touch of
                            a button, right from your smartphone. There may be
                            instances where you need primary care services that
                            can only be done in-person. In these cases, your
                            care team will help guide you to a partner facility
                            that can address your specific primary care needs —
                            free of charge. These partner facilities make up
                            Firefly’s in-person primary care network which is
                            included at no additional cost when clinically
                            needed (e.g. strep test, checking your vitals).
                            <br />
                            <br />
                            Going virtual means you avoid a lot of hassle. Like
                            waiting weeks for an appointment, juggling time off
                            from work, or other things that get in the way of
                            seeing your doctor. With no rushed office visits,
                            you can easily fit your appointments around your
                            schedule.
                            <br />
                            <br />
                            Firefly’s virtual care teams offer care wherever and
                            whenever you need it through an easy to navigate
                            app. Firefly takes the best features of in-person
                            primary care and builds on them to give you care
                            that is focused on “the whole you” and care that
                            adapts to your schedule.
                          </div>
                        </Accordion>
                      </div>
                      <div className="border-b-[1px] border-white p-6">
                        <Accordion
                          title="Where are the In-Person Primary Care Network locations?"
                          isArrowIcon={false}
                          textOverride="!text-white"
                        >
                          <div className="text-rich-text-white w-dyn-bind-empty w-richtext">
                            To learn more about the availability of these
                            locations in Houston, you can explore the In-Person
                            Primary Care Network locations through the link
                            below:
                            <br />
                            <br />
                            Download locations (PDF)
                          </div>
                        </Accordion>
                      </div>
                      <div className="border-b-[1px] border-white p-6">
                        <Accordion
                          title="What health issues can Firefly treat virtually?"
                          isArrowIcon={false}
                          textOverride="!text-white"
                        >
                          <div className="text-rich-text-white w-dyn-bind-empty w-richtext">
                            Firefly can handle most primary care needs
                            virtually, including:
                            <ul className="list-disc list-outside">
                              <li className="!text-white">
                                Chronic conditions:They have advanced approaches
                                to managing your chronic conditions such as
                                asthma, diabetes or high blood pressure.
                              </li>
                              <li className="!text-white">
                                Acute concerns: They’re great for common
                                ailments like back pain, stomach flu, headaches,
                                sinus infections, and more.
                              </li>
                              <li className="!text-white">
                                Health coaching: They’ll help you be your best
                                self by supporting long-term health goals such
                                as managing your weight, quitting smoking, or
                                sleeping better.
                              </li>
                              <li className="!text-white">
                                Women’s health: From birth control counseling to
                                menstrual cycle concerns, they proactively
                                manage women’s health needs.
                              </li>
                              <li className="!text-white">
                                Behavioral health: As a Firefly member, you’ll
                                have the option to work with a licensed
                                behavioral health specialist to assess concerns
                                such as depression or anxiety, provide support,
                                and monitor your progress along the way.
                              </li>
                            </ul>
                          </div>
                        </Accordion>
                      </div>
                      <div className="border-b-[1px] border-white p-6">
                        <Accordion
                          title="What should I do in an emergency?"
                          isArrowIcon={false}
                          textOverride="!text-white"
                        >
                          <div className="text-rich-text-white w-dyn-bind-empty w-richtext">
                            If you have a life-threatening emergency, call 911.
                            <br />
                            <br />
                            If it’s not life threatening, message your Firefly
                            care team weekdays from 7 a.m. to 7 p.m. ET. If it’s
                            after hours, tap the After-Hours Emergency banner in
                            the app to contact us. The on-call Firefly provider
                            will call you within 30 minutes.
                          </div>
                        </Accordion>
                      </div>
                      <div className="border-b-[1px] border-white p-6">
                        <Accordion
                          title="Can my kids use Firefly?"
                          isArrowIcon={false}
                          textOverride="!text-white"
                        >
                          <div className="text-rich-text-white w-dyn-bind-empty w-richtext">
                            Only JMPC medical plan enrolled members 18 and older
                            can sign up for Firefly.
                          </div>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Script src="webflow.js" type="text/javascript" />
      </body>
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps =>
  async () => {
    const [siteSettings] = await Promise.all([Sanity.siteSettings.get()]);

    if (!siteSettings) {
      throw new Error('Could not fetch site settings from Sanity');
    }

    return {
      props: {
        siteSettings,
        navigationOverrides: null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };
export const getStaticProps = createGetStaticProps();

export default JPMCLandingPage;
