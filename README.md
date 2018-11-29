# RedirectBatch-Node

Command-line Node.js scripts that can be used by prospect merchants to generate redirect links in batch.

## Getting Started

### Install Node.js

The scripts is written in Node.js so please download the package [here](https://nodejs.org).

### Install Frameworks

After node is installed, use the terminal client such as Terminal (Mac) or PowerShell (Windows) to browse to this directory. Use npm to install the necessary framework.

```
$ npm install
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
