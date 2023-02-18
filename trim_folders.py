import os 
import shutil

for month in ["August_2022", "September_2022", "October_2022", "November_2022", "December_2022", "January_2023", "February_2023"]:

#for month in ["February_2023"]:
    #shutil.copy(f"data/{month}/analysis/probes_websites.json", f"data/{month}/.")
    #shutil.copy(f"data/{month}/next_isp_probes/isp_probes_and_resolvers.json", f"data/{month}/.")

    #for dir in ["images"]:#["analysis", "next_isp_probes", "msm_ids", "results"]:
        #shutil.rmtree(f"data/{month}/{dir}")

    os.remove(f"images/{month}/isp_probes_and_resolvers.json")
    os.remove(f"images/{month}/probes_websites.json")