import { BONUS_NUMBER, WINNING_NUMBERS } from '../../components/WinningNumber/WinningNumber.services';
import {
  BONUS_CHECK_REQUIRED_COUNT,
  BONUS_COUNT,
  LOTTO_UNIT_PRICE,
  RESULT_TABLE_DATA,
} from '../../constants/lottoRules';

export const getNumOfMatch = (lotto) => {
  let numOfMatch = lotto.reduce((acc, cur) => acc + Number(WINNING_NUMBERS.includes(cur)), 0);

  if (numOfMatch === BONUS_CHECK_REQUIRED_COUNT && lotto.includes(BONUS_NUMBER)) {
    numOfMatch += BONUS_COUNT;
  }
  return numOfMatch;
};

export const getMatchCount = (lottoBundle) => {
  const matchCount = {};

  lottoBundle.forEach((lotto) => {
    const numOfMatch = getNumOfMatch(lotto);

    matchCount[numOfMatch] = matchCount[numOfMatch] === undefined ? 1 : matchCount[numOfMatch] + 1;
  });

  return matchCount;
};

export const getStatistics = (lottoBundle, matchCount) => {
  const investment = lottoBundle.length * LOTTO_UNIT_PRICE;
  const profit = Object.keys(matchCount).reduce((acc, key) => acc + matchCount[key] * RESULT_TABLE_DATA[key].PRIZE, 0);

  return {
    profit,
    rateOfReturn: (((profit - investment) / investment) * 100).toFixed(2),
  };
};
