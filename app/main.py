from flask import Flask, send_file, request
import flask
import json
from io import BytesIO
import os
import calendar
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home_view():
    return send_file("index.html")

with open("./data/probe_coordinates.json") as f:
    probe_coordinates = json.load(fp=f)

@app.route('/graphs', methods=["POST"])
def get_graphs():
    choices = request.get_json()
    print(f"choices: {choices}")
    for key in ["cdn", "msm", "avg"]:
        choices[key] = choices[key].lower()
    buffer = BytesIO()

    region = choices["reg"]
    ip = choices["ip"]

    choice_string = f"{choices['cdn']}_{choices['msm']}_{choices['avg']}"
    print(f"./data/{choices['month']}/images/{region}/{ip}/{choice_string}.png")
    with open(f"./data/{choices['month']}/images/{region}/{ip}/{choice_string}.png", "rb") as img:
        for data in img:
            buffer.write(data)
    output = buffer.getvalue()

    return flask.Response(response=output, status=201)

@app.route('/months', methods=["GET"])
def get_months():

    months = {"months": []}

    calendar_months = calendar.month_name[1:]
    for filename in os.listdir("./data"):
        for month in calendar_months:
            if month in filename:
                months["months"].append(filename)
    print(months)
    return flask.Response(response=json.dumps(months), status=200)

@app.route('/probes', methods=["POST"])
def get_probes():
    choices = request.get_json()
    reg = choices["reg"]

    buffer = BytesIO()

    print("choices", choices)
    with open(f"./data/{choices['month']}/analysis/probes_websites.json") as f:
        month_results = json.load(fp=f)

    if choices['month'] == "August_2022": #REWRITE
        prev_month = "bad_months/July_2022"
    else:
        prev_month = "August_2022"

    with open(f"./data/{prev_month}/next_isp_probes/isp_probes_and_resolvers.json") as f:
        attempted_probes = json.load(fp=f).keys()

    probe_results = {}
    success = 0
    attempted = 0
    for probe_id in attempted_probes:
        if reg != "Global" and probe_coordinates[probe_id]["continent"] != reg:
            continue
        attempted += 1
        probe_results[probe_id] = probe_coordinates[probe_id]
        if len(month_results[probe_id]) == 0:
            probe_results[probe_id]["color"] = "black"
        else:
            probe_results[probe_id]["color"] = "green"
            success += 1

    probe_results["message"] = f"{reg} region: {success} successful probes out of {attempted} attempted. Failed probes are colored black."
    return flask.Response(response=json.dumps(probe_results), status=201)