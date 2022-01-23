import React from 'react';
import {isValid} from './utils.js';

export default function DataCell(props) {
  const { startDate } = props.itemData;
  //const isDisableDate = Utils.isHoliday(startDate) || Utils.isWeekend(startDate);
  const isValid1 = isValid(startDate)

  const cssClasses = [];

   if (isValid1) {
    cssClasses.push('valid');
  }

  return (
    <div className={cssClasses} />
  );
}