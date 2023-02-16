const fs = require('fs');
const months = fs.readdirSync('../data/');

exports.handler = async () => {
    console.log(months)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"months": months})
    };
  };