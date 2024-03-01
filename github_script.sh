month=$1 

cd netlify-site
git add "data/months.json"
git add "data/$month"
git add "images/$month"

git commit -m "script adding data from latest month"
git push

#./netlify-site/github_script.sh January_2024
#python3 github_python.py