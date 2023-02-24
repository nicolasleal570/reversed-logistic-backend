const dayjs = require('dayjs');
const { Op } = require('sequelize');

const queryCurrentMonth = (monthNumber = null) => {
  let baseDate = dayjs();

  if (monthNumber !== null) {
    baseDate = baseDate.month(monthNumber);
  }

  const daysInMonth = baseDate.daysInMonth();
  const firstDay = baseDate.clone().date(1).hour(0);
  const lastDay = baseDate
    .clone()
    .date(daysInMonth)
    .hour(23)
    .subtract(1, 'day');

  return {
    [Op.not]: null,
    [Op.between]: [firstDay.toDate(), lastDay.toDate()],
  };
};

module.exports = {
  queryCurrentMonth,
};
