//Keep in mind directory paths may change between local and prod
var fs = require('fs');

exports.handler = async (event, context) => {

    let choices = JSON.parse(event.body)
    console.log(choices)
    reg = choices["reg"]

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    var prev_month;
    for (var i=0; i<months.length; i++) {
        if (choices["month"].includes(months[i])) {
            year = choices["month"].split(months[i])[1]
            if (i == 0) {
                year = `_${parseInt(year.split("_")[1]) - 1}`
            }
            
            prev_i = i > 0? i-1: 11
            prev_month = months[prev_i] + year
        }
    }

    const probe_coordinates = JSON.parse(fs.readFileSync('./data/probe_coordinates.json', 'utf8')); 
    const month_results = JSON.parse(fs.readFileSync(`./data/${choices['month']}/probes_websites.json`, 'utf8')); 
    const attempted_probes = JSON.parse(fs.readFileSync(`./data/${prev_month}/isp_probes_and_resolvers.json`, 'utf8')); 

    /*
    const month_results = require(`../data/${choices['month']}/analysis/probes_websites.json`)
    const attempted_probes = require(`./data/${prev_month}/next_isp_probes/isp_probes_and_resolvers.json`)
    const probe_coordinates = require('./data/probe_coordinates.json')*/

    var probe_results = {}
    var success = 0
    var attempted = 0

    for (probe_id in attempted_probes) {
        if (reg != "Global" && probe_coordinates[probe_id]["continent"] != reg)
            continue
        attempted += 1
        probe_results[probe_id] = probe_coordinates[probe_id]
        if (month_results[probe_id].length == 0)
            probe_results[probe_id]["color"] = "black"
        else {
            probe_results[probe_id]["color"] = "green"
            success += 1
        }
    }
        
    probe_results["message"] = `${reg} region: ${success} successful probes out of ${attempted} attempted. Failed probes are colored black.`

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(probe_results)
    };
  };