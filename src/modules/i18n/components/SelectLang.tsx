import React, { useEffect } from "react";
import i18n from "i18next";
import PropTypes from "prop-types";

SelectLang.propTypes = {};

function SelectLang() {
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

  return (
    <select
      className="absolute top-8 right-8 text-[13px] font-medium cursor-pointer block  rounded-xl py-2 px-6 text-center text-gray-600 bg-transparent border  border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-300 peer"
      onChange={changeLanguage}
    >
      <option value="en">EN</option>
      <option value="vi">VI</option>
    </select>
  );
}

export default SelectLang;
