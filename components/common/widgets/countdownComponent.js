import moment from "moment";
import React, { Fragment } from "react";
import Countdown from "react-countdown";

const CountdownComponent = ({ endDate }) => {
  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="timer-box">
          <div className="timer">
            <div className="timer-p" id="demo">
              <span>
                {days}
                <span className="padding-l">:</span>
                <span className="timer-cal">Days</span>
              </span>
              <span>
                {hours}
                <span className="padding-l">:</span>
                <span className="timer-cal">Hrs</span>
              </span>
              <span>
                {minutes}
                <span className="padding-l">:</span>
                <span className="timer-cal">Min</span>
              </span>
              <span>
                {seconds}
                <span className="timer-cal">Sec</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  var year = moment(endDate, "DD/MM/YYYY hh:mm").year();
  var month = moment(endDate, "DD/MM/YYYY hh:mm").month();
  var day = moment(endDate, "DD/MM/YYYY hh:mm").date();
  var hour = moment(endDate, "DD/MM/YYYY hh:mm").hour();
  var min = moment(endDate, "DD/MM/YYYY hh:mm").minute();
  var coundown = new Date(year, month, day, hour, min).getTime();

  return (
    <Fragment>
      <Countdown date={coundown} renderer={renderer} />
    </Fragment>
  );
};

export default CountdownComponent;
