month=$1 

cd netlify-site
git add "data/$month"
git add "images/$month"
string="script - adding data from $month"
git commit -m $string
git push