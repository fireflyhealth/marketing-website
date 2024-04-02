import Script from 'next/script';
import { config } from '../../config';

const CustomScript = (props) => {
  <Script {...props} strategy="lazyOnload" />;
};

export const GtagScript = () => (
  <>
    <CustomScript
      id="gtag"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${config.googleTagManager.id}`}
    >
      <CustomScript id="gtag-init">
        {`
        function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${config.googleTagManager.id}');`}
      </CustomScript>
    </CustomScript>
  </>
);
