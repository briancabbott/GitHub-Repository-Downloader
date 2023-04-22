

export DIST_DIR=~/dev_space/GitHub-briancabbott/GitHub-Repository-Downloader/src/TypeScript/dist
export TOK_FILE=~/.briancabbott/GitHub-Repository-Downloader/github-downloader.tk

OSKIND=$(echo $OSTYPE)
SRC_LOCATION="https://github.com/briancabbott/GitHub-Repository-Downloader"
APPLICATION_INSTALL_DIR="/Applications/GitHub-Repository-Downloader.app/Contents/Resources/app"
USER_CONFIG_FILES_DIR="$HOME/.$USER/GitHub-Repository-Downloader"

echo OSKIND: $OSKIND
echo SRC_LOCATION: $SRC_LOCATION
echo APPLICATION_INSTALL_DIR: $APPLICATION_INSTALL_DIR
echo USER_CONFIG_FILES_DIR: $USER_CONFIG_FILES_DIR

# node  $DIST_DIR/main_cli.js download --github-auth-token-file $TOK_FILE --organization "$1" 