import React from "react";

const MasterServiceContent = ({
  link,
  title,
  service,
  marijuana,
  lastChild,
  url,
}) => {
  return (
    <div
      className={`${!marijuana ? "media" : ""} ${
        lastChild ? "border-0 m-0" : ""
      }`}
    >
      {link ? (
        <div dangerouslySetInnerHTML={{ __html: link }} />
      ) : (
        <div>
          <img src={url} style={{ width: 80 }} />
        </div>
      )}
      <div className="media-body">
        <h4>{title}</h4>
        <p>{service}</p>
      </div>
    </div>
  );
};

export default MasterServiceContent;
