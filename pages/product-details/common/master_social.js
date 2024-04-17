import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
const MasterSocial = () => {
  const shareUrl = "https://banhangonline.netlify.app/"; // URL to share
  const title = "Check out this website!";

  return (
    <div style={{ marginTop: 10 }}>
      <FacebookShareButton url={shareUrl} hashtag="#test">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
    // <ul className="product-social">
    //   <li>
    //     <a href="https://www.facebook.com" target="_blank">
    //       <i className="fa fa-facebook"></i>
    //     </a>
    //   </li>
    //   <li>
    //     <a href="https://plus.google.com" target="_blank">
    //       <i className="fa fa-google-plus"></i>
    //     </a>
    //   </li>
    //   <li>
    //     <a href="https://twitter.com" target="_blank">
    //       <i className="fa fa-twitter"></i>
    //     </a>
    //   </li>
    //   <li>
    //     <a href="https://www.instagram.com" target="_blank">
    //       <i className="fa fa-instagram"></i>
    //     </a>
    //   </li>
    //   <li>
    //     <a href="https://rss.com" target="_blank">
    //       <i className="fa fa-rss"></i>
    //     </a>
    //   </li>
    // </ul>
  );
};

export default MasterSocial;
