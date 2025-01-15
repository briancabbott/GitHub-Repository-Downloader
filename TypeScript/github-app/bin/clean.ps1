remove-item node_modules  -Recurse -Force -ErrorAction SilentlyContinue
remove-item workingdir -Recurse -Force -ErrorAction SilentlyContinue
remove-item dist -Recurse -Force -ErrorAction SilentlyContinue
remove-item package-lock.json -Recurse -Force -ErrorAction SilentlyContinue
# rm repoList--*