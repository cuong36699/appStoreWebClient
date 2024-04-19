import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/base/Snackbar";
import { styled } from "@mui/system";
import SVG from "../SVG";
import { Transition } from "react-transition-group";
import Icons from "../../public/assets/svg/icon";
import { setToasterGlobal } from "../../redux/reducers/common";

const blue = {
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
`;

const SnackbarContent = styled("div")(
  ({ theme }) => `
  position: relative;
  overflow: hidden;
  z-index: 5500;
  display: flex;
  left: auto;
  justify-content: space-between;
  max-width: 560px;
  min-width: 300px;
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  // border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0 2px 8px rgb(0 0 0 / 0.5)`
      : `0 2px 8px ${grey[200]}`
  };
  padding: 0.75rem;
  color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  font-family: 'DMSans_Medium'
  font-weight: 600;

  & .snackbar-title {
    font-family: 'DMSans-Bold';
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    font-size: 10px;
    width: 1.25rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `
);

const positioningStyles = {
  entering: "translateX(0)",
  entered: "translateX(0)",
  exiting: "translateX(500px)",
  exited: "translateX(500px)",
  unmounted: "translateX(500px)",
};

export default function ToasterGlobal() {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const [exited, setExited] = useState(true);

  const toasterGlobal = useSelector((state) => state?.common?.toasterGlobal);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      setToasterGlobal({
        active: false,
      })
    );
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <React.Fragment>
      <StyledSnackbar
        autoHideDuration={3000}
        open={toasterGlobal?.active}
        onClose={handleClose}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={toasterGlobal?.active}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <SnackbarContent
              style={{
                transform: positioningStyles[status],
                transition: "transform 300ms ease",
              }}
              ref={nodeRef}
            >
              <div style={{ display: "flex" }}>
                <SVG
                  src={Icons.check}
                  size={20}
                  color={
                    toasterGlobal?.status == "error"
                      ? "red"
                      : toasterGlobal?.status == "suscess"
                      ? "#4AE261"
                      : "#FFD266"
                  }
                />
                <div className="snackbar-message">
                  <p className="snackbar-title" style={{ marginLeft: 7 }}>
                    {toasterGlobal?.status &&
                      toasterGlobal?.status.toUpperCase()}
                  </p>
                  {toasterGlobal?.mess &&
                  typeof myVar === "string" &&
                  toasterGlobal?.mess.includes("\n") ? (
                    (toasterGlobal?.mess.split("\n") || []).map((r, index) => (
                      <p
                        className="snackbar-description"
                        key={index}
                        style={{ marginLeft: 7 }}
                      >
                        {r ? `- ${r}` : ""}
                      </p>
                    ))
                  ) : (
                    <p
                      className="snackbar-description"
                      style={{ marginLeft: 7 }}
                    >
                      {toasterGlobal?.mess?.message ||
                        toasterGlobal?.mess ||
                        ""}
                    </p>
                  )}
                </div>
              </div>
              {/*  */}
              <SVG
                onClick={handleClose}
                className="snackbar-close-icon"
                src={Icons.close}
              />
            </SnackbarContent>
          )}
        </Transition>
      </StyledSnackbar>
    </React.Fragment>
  );
}
