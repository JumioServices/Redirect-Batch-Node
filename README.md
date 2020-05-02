# RedirectBatch-Node

Command-line Node.js scripts that can be used by prospect merchants to generate redirect links in batch.

## Getting Started

### Install Node.js

Downloading the package [here](https://nodejs.org) and install.

### Install Frameworks

After node is installed, use the terminal client such as Terminal (Mac) or PowerShell (Windows) to browse to this directory. Use npm to install the necessary framework included within package.json.

```
$ npm install
```

## Configure the program

The program defaults to US datacenter. Please change the URL to point to the designated datacenter.

```
HTTP Request Method: POST
REST URL (US): https://netverify.com/api/v4/initiate
REST URL (EU): https://lon.netverify.com/api/v4/initiate
REST URL (SGP): https://core-sgp.jumio.com/api/v4/initiate
```

## Running the program

### Set API token/secret in environment variables

Netverify requires authentication through API token and secret. They can be stored in environment variables for easy access.

#### Bash
```
$ export API_TOKEN=********
$ export API_SECRET=********
```

#### PowerShell
```
$ $Env:API_TOKEN = "********"
$ $Env:API_SECRET = "********"
```

### Execution

Use below command and generate the links. The first argument denotes how many links to generate.

```
$ node redirect-batch-superagent.js 100
```

or

```
$ node redirect-batch-request.js 100
```

"redirects.csv" is generated after executing the scripts.
