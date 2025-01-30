# React and Node.js base template

In this repository, you will find a base template for an application with a Node.js server and a React frontend to kickstart custom app development.


## Setup

You can run the JavaScript-based application in DataRobot using a custom application or by running it locally. Custom applications can be created either via the NextGen Registry's **Applications** page or by using [DRApps](https://github.com/datarobot/dr-apps/blob/main/README.md).

Be sure to define the required variables for the app to communicate with DataRobot. If you run the app locally or in an environment other than a custom application, you'll need to manually set the environment variables or run the application with them configured.

```shell
DATAROBOT_ENDPOINT="$DATAROBOT_ENDPOINT" DATAROBOT_API_TOKEN="$DATAROBOT_API_TOKEN" npm run start:dev
```

- **DATAROBOT_ENDPOINT**: Example: https://app.datarobot.com/api/v2/
- **DATAROBOT_API_TOKEN**: Your API key, accessed from DataRobot's Developer Tools page

When this app is run via a custom application, the variables are set automatically.

Keep your application build scripts inside the `build-app.sh` file.

```shell
#build-app.sh

#Installing Node.js dependencies from package.json
npm install

...
#Installing React dependencies from package.json
cd client
npm install

...
npm run build
```

### Node.js server

There is a `server.js` file that contains all the Node.js server functionality, including examples of how to communicate with the DataRobot and handle routes.

### React app

You can find the base React application in the `./client` directory. It includes examples of working with images, CSS, and making API calls. You can run this application locally by executing `npm run dev` inside the `client` directory. Ensure the server is running as described in the Setup section.


## Add and use runtime parameters

To add runtime parameters, create a `metadata.yaml` file in your application source folder. Here is an example of a `DEPLOYMENT_ID` that creates an environment variable called `MLOPS_RUNTIME_PARAM_DEPLOYMENT_ID`:

```yaml
runtimeParameterDefinitions:
  - fieldName: DEPLOYMENT_ID
    type: string
```

Once this file is part of your application source in DataRobot, it displays the new runtime parameter(s) as part of the
app configuration.

To use the parameters, DataRobot recommends you add them via `start-app.sh`. Add the following conditional export before `gunicorn` starts:

```shell
if [ -n "$MLOPS_RUNTIME_PARAM_DEPLOYMENT_ID" ]; then
  export DEPLOYMENT_ID="$MLOPS_RUNTIME_PARAM_DEPLOYMENT_ID"
fi
```

Now you can use `process.env.DEPLOYMENT_ID` within your application code.


