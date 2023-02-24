const boom = require('@hapi/boom');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

const getStartAndFinishOfMonth = (monthNumber = null, yearNumber = null) => {
  let baseDate = dayjs();

  if (!Number.isNaN(Number.parseInt(monthNumber, 10))) {
    baseDate = baseDate.month(Number.parseInt(monthNumber, 10));
  }

  if (!Number.isNaN(Number.parseInt(yearNumber, 10))) {
    baseDate = baseDate.year(Number.parseInt(yearNumber, 10));
  }

  const daysInMonth = baseDate.daysInMonth();
  const firstDay = baseDate.clone().date(1).hour(0);
  const lastDay = baseDate
    .clone()
    .date(daysInMonth)
    .hour(23)
    .subtract(1, 'day');

  return {
    firstDay,
    lastDay,
  };
};

const queryBetweenDatesOfMonth = (monthNumber = null, yearNumber = null) => {
  const { firstDay, lastDay } = getStartAndFinishOfMonth(
    monthNumber,
    yearNumber
  );

  if (monthNumber < 0 || monthNumber > 11) {
    throw boom.notFound('Debes utilizar un mes entre enero y diciembre');
  }

  return {
    [Op.between]: [firstDay.toDate(), lastDay.toDate()],
  };
};

module.exports = {
  queryBetweenDatesOfMonth,
  getStartAndFinishOfMonth,
};
