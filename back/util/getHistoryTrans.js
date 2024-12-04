
export const getHistory = (userId) => {
  return  userId.transactions.map(({ from, to, money, date }) => ({ from, to, money, date }));
};
