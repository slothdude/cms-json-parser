Trying it yourself
==========

In one terminal window:

```
git clone (project url)
cd server
npm install
npm start
```

You just started the server. In another terminal window, start the front end
(from root of project):

```
npm install
npm start
```

Upload your blue buttom cms file and click upload. Ex. file:  ![cms_sample.txt](./server/parse/cms_sample.txt)

Overview
============

This app lets you convert a blue button cms file in ASCII (.txt) to json format.
This file comes from healthcare providers and contains your personal information.
More info here: https://www.healthit.gov/faq/how-can-i-access-my-health-informationmedical-record
*Note: only parses demographics section*

Your new file (named post.json) will magically appear in the ./server/parsed-json directory.

How it works
===============

The front end makes a post request to the server sending your cms file in a `FormData` object.
The server then parses the file into json format using
![parser.js](./server/src/parser.js) and saves it into the file system using `fs.writeFile()`.
