const simpleGit = require('simple-git');
const git = simpleGit();

// Define the file path and branch names
const filePath = 'test.js';
const masterBranch = 'master';
const featureBranch = 'compare-branch';

const regex = /let\s+a\s*=\s*(\d+);?\s*/;


// Get the content of the file in master branch
git.show([`${masterBranch}:${filePath}`], (err, masterContent) => {
  if (err) throw err;
  const masterValue = masterContent.match(regex)[1];
  console.log("MasterValue", masterValue);
  // Get the content of the file in feature branch
  git.show([`${featureBranch}:${filePath}`], (err, featureContent) => {
    if (err) throw err;
    const featureValue = featureContent.match(regex)[1];
    console.log("FeatureValue", featureValue);
    // Compare the content of the two files
    if (masterContent === featureContent) {
      console.log('The file content is the same in both branches.');
    } else {
      console.log('The file content is different in the two branches.');
    }
  });
});