import os 
import shutil

for month in ["October_2023"]:

    shutil.copy(f"data/{month}/analysis/probes_websites.json", f"data/{month}/.")
    shutil.copy(f"data/{month}/next_isp_probes/isp_probes_and_resolvers.json", f"data/{month}/.")

    shutil.copytree(f"data/{month}/images", f"images/{month}/images")

    for dir in ["analysis", "next_isp_probes", "msm_ids", "results", "images"]:
        shutil.rmtree(f"data/{month}/{dir}")
