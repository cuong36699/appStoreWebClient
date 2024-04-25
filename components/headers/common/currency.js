import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Media } from "reactstrap";
import language from "../../constant/langConfig.json";
import i18next from "../../constant/i18n";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";

const GET_CURRENCY = gql`
  query {
    getCurrency {
      currency
      name
      symbol
      value
    }
  }
`;

const Currency = ({ icon }) => {
  var { data } = useQuery(GET_CURRENCY);
  const Context = useContext(CurrencyContext);
  const selectedCurrency = Context.currencyContext.selectedCurrency;

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
  };

  return (
    <li className="onhover-div mobile-setting">
      <div>
        <Media src={icon} className="img-fluid" alt="" />
        <i className="fa fa-cog"></i>
      </div>
      <div className="show-div setting">
        <h6>Ngôn ngữ</h6>
        <ul>
          {language.map((item, i) => (
            <li key={i}>
              <a
                href={null}
                onClick={() => {
                  changeLanguage(item.val);
                }}
              >
                {item.lang}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Currency;
