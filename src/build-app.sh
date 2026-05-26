#!/usr/bin/env sh
# It's important to fail the build if a command such as `npm install` fails. 
set -e
if [ -f "package.json" ]; then
    echo "Installing Node.js dependencies from package.json..."
    npm install
else
    echo "No package.json found. Skipping npm install."
fi

# Install the required React packages
cd client

echo "Installing React dependencies from package.json..."
npm install

echo "Building React app..."

npm run build