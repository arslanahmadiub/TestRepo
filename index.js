const simpleGit = require('simple-git');
const git = simpleGit();

// Define the file path and branch names
const filePath = 'test.js';
const masterBranch = 'master';
const featureBranch = 'compare-branch';

// Define a regular expression to match the variable assignment
const regex = /let\s+a\s*=\s*(\d+);?\s*/;

// Checkout the feature branch
git.checkout(featureBranch, (err) => {
  if (err) throw err;

  // Get the content of the file in master branch
  git.show([`${masterBranch}:${filePath}`], (err, masterContent) => {
    if (err) throw err;
    console.log("MasterContent", masterContent);

    // Extract the value of the a variable from the master content
    const masterValue = masterContent.match(regex)[1];
    console.log("MasterValue", masterValue);

    // Get the content of the file in feature branch
    git.show([`${featureBranch}:${filePath}`], (err, featureContent) => {
      if (err) throw err;
      console.log("FeatureContent", featureContent);

      // Extract the value of the a variable from the feature content
      const featureValue = featureContent.match(regex)[1];
      console.log("FeatureValue", featureValue);

      // Compare the values of the a variable in the two branches
      if (masterValue === featureValue) {
        console.log('The value of a is the same in both branches.');
      } else {
        console.log('The value of a is different in the two branches.');
      }
    });
  });
});