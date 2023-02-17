const fs = require('fs');
const available_months = fs.readdirSync('./data/');

exports.handler = async () => {

  const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  const monthdict = {"months": []}
  
  i = 7
  year = 2022
  
  curr_month = "August_2022"
  while (available_months.includes(curr_month)) {
    monthdict["months"].push(curr_month)
    i += 1
    if (i == 12) {
      i = 0
      year += 1
    }
    curr_month = `${months[i]}_${year}`
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(monthdict)
  };
};
