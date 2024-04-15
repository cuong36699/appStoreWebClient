import React from "react";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

export default function SVG({
  src,
  color,
  onClick,
  height,
  width,
  size,
  justStroke,
  justFill,
}) {
  function changeSvgColor(svgString, color, justStroke) {
    // Parse the SVG string
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");

    // Modify all fills and strokes
    const paths = doc.querySelectorAll(
      "path, circle, rect, polygon, line, ellipse"
    );
    paths.forEach((path) => {
      if (justStroke) {
        path.setAttribute("stroke", color);
      } else if (justFill) {
        path.setAttribute("fill", color);
      } else {
        path.setAttribute("stroke", color);
        path.setAttribute("fill", color);
      }
    });

    // Serialize the SVG back to string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc.documentElement);
  }

  const coloredSvgString = color ? changeSvgColor(src, color, justStroke) : src;

  return (
    <ReactSVG
      httpRequestWithCredentials={true}
      beforeInjection={(svg) => {
        svg.setAttribute(
          "style",
          `width: ${width || size || 20}; height: ${height || size || 20};${
            onClick ? "cursor: pointer;" : ""
          }`
        );
      }}
      onClick={onClick}
      onError={(error) => {
        console.error(error, "svg");
      }}
      src={`data:image/svg+xml;utf8,${encodeURIComponent(coloredSvgString)}`}
      wrapper="span"
    />
  );
}

SVG.propTypes = {
  src: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  size: PropTypes.number,
  justStroke: PropTypes.bool,
  justFill: PropTypes.bool,
};
