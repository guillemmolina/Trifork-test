/* This is the trifork developer test.

We're using Web-workers as organization example, using the fetch() function we request to GitHub API to get the number of repositories, the biggest repository, and the
number of organizations that are currently on Github.

1. The first fetch request, uses the orgName variable to search through the orgs github link and using the .length method we get the number of repositories.
2. In the second fetch request, we're using the .size method, and saving the biggest variable looping through the data array.
3. In the third fetch request, we're just taking the total_count variable from https://api.github.com/search/users?q=type%3Aorg

Guillem Molina
*/


const orgName = 'Web-Workers';
const apiUrl = `https://api.github.com/orgs/${orgName}/repos`;
const apiToken = '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';
let element = document.getElementById('elem')
let element2 = document.getElementById('elem2')
let element3 = document.getElementById('elem3')
const headers = {
    Authorization: `Bearer ${apiToken}`,
};

// 1. Given an organization return the number of repositories.

fetch(apiUrl, {headers})
.then(response => response.json())
.then((data) => {

    const  numRepos = data.length;
    console.log(`The ${orgName} organization has ${numRepos} repositories.`);
    element.innerHTML = `
    <p>The ${orgName} organization has ${numRepos} repositories.</p>
    `
    
})

.catch(err=>console.log(err))

  // 2. Return the number of organizations that are currently on Github.

  fetch(apiUrl, {headers})
  .then(response => response.json())
  .then((data) => {
  
      for (var i = 0; i < data.length; i++) {

        var biggestNumber = data[0].size;

        if (data[i].size > biggestNumber){
          biggestNumber = data[i].size;
        }
      }
  
      console.log(`The biggest repository of ${orgName} organization has ${biggestNumber * 1000} bytes.`);
      element2.innerHTML = `
    <p>The biggest repository of ${orgName} organization has ${biggestNumber * 1000} bytes.</p>
    `
      
  })
  
  .catch(err=>console.log(err))

// 3. Given an organization return the biggest repository (in bytes).

fetch('https://api.github.com/search/users?q=type%3Aorg', {headers})
.then(response => response.json())
.then(data => {

    const numOrganizations = data.total_count
    console.log(`There are currently ${numOrganizations} organizations on GitHub.`);

    element3.innerHTML = `
    <p>There are currently ${numOrganizations} organizations on GitHub.</p>
    `
  
  })
  .catch(error => {
    console.error(`Error retrieving organization data: ${error}`);
  });

