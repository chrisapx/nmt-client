export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const formatDate = (date) =>
new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
}).format(date);


export const formatDateTime = (timestamp) =>
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
}).format(new Date(timestamp));


  
  