import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";

export default function TooltipCustom({
  contentRender,
  title,
  placement,
  margin,
}) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            slotProps={
              margin === "right"
                ? {
                    popper: {
                      sx: {
                        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                          {
                            marginLeft: "5px",
                          },
                      },
                    },
                  }
                : {
                    popper: {
                      sx: {
                        [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                          {
                            marginRight: "5px",
                          },
                      },
                    },
                  }
            }
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={title}
            placement={placement}
          >
            <div onClick={handleTooltipOpen}>
              {contentRender && contentRender()}
            </div>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
}
