## Merging

Creating and working on your branch:
```
git branch (your branch name)
git checkout (your branch name)
```

Updating your files in your branch:
```
git add (your files)
git commit -m "(relavent message)"
git push origin (your branch name)
```

Pull lastest changes from the main branch:
```
git pull (to fetch and merge chanegs from main into your branch)
or
git fetch origin (to fetch the changes but not merge)
```

Merging your branch into main:
```
git add (your files)
git commit -m "(relavent message)"
git push origin (your branch name)

After this click the compare and pull request promt on github
```

### Fixing merge conflicts:

1. First enter your version of the repository and use git status to check which files have merge conflict warnings.
```
cd REPOSITORY-NAME
git status
```

2. Incase something goes wrong during the process you should make a backup of your branch using:
```
git clone PATH-TO-BRANCH
```

3. Open your editor and navigate to the file that has merge conflicts.

Merge conflicts are marked with "<<<<<<<<<<< HEAD". "===========" divides your changes from the changes in the another branch, followed by ">>>>>>>>>>> BRANCH-NAME".

4. From here make your changes which can be either to delete one option or to make a brand new change. After you have to delete the conflict markers.

5. Now that the change is made you can either merge the branchs on the command line or push your changes to the repository and merge the changes in the pull request.
```
git add YOUR-FILES
git commit -m "relavent message"
git push origin (your branch name)
```
### Version Control 

Each file on GitHub has a history, making it easy to explore the changes that occurred to it at different time points.


## Deployment

After your recent changes on your own branch have been merged into main, you can now push your changes to Heroku. Make sure that the code being push is the most up to date version.
```
git push heroku main
```

Automatic Deployment:

On the Heroku dashboard navigate to "Deployment Method" and click on the github button. Below you should see a search bar where you can search up our project.

After this below you should see a section called "Automatic deploys", here you can select which branch where everytime it gets code pushed to it, it well deploy the new version of the branch automatically. In this case we select main.

Database Interaction: 

Connect Node.js application to MongoDB and work with data using the Node.js driver. The driver features an asynchronous API that you can use to access method return values through Promises or specify callbacks to access them when communicating with MongoDB.


```
npm i mongodb
```

code smaple in client to connect to MongoDB

```
const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
```

