exports.handler = async (event, context) => {

    let choices = JSON.parse(event.body)
    const keys = ["cdn", "msm", "avg"]
    keys.forEach(key => {
        choices[key] = choices[key].toLowerCase()
    });

    region = choices["reg"]
    ip = choices["ip"]
    choice_string = `${choices['cdn']}_${choices['msm']}_${choices['avg']}`
    console.log(`./images/${choices['month']}/images/${region}/${ip}/${choice_string}.png`)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"url": `/images/${choices['month']}/images/${region}/${ip}/${choice_string}.png`})
    };
  };