dos2unix package-lock.json
dos2unix package.json
dos2unix tsconfig.json

find ./src -name "*.ts" | xargs dos2unix
