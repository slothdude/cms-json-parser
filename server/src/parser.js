fs = require('fs');
readline = require('readline');

const parse = (file) =>
{
  //The object later filled with the data from the cms_sample demographic info
  var willBeJson = {};

  //Wasn't sure why the format for address was in an array, just left it as both
  //lines of address in one single element of an array. Address and coverage are
  //defined beforehand because they are needed accross multiple lines.
  var address = [""];
  var coverage = [];

  //If a line has relevant attribute info, capture the info and put it into object
  //in correct format (ex. change key names, make lowercase, etc.)
  for(var i = 0; i < file.length; i++){
    line = file[i].trim();
    //Only read up through the end of demographic section
    if(line === "Emergency Contact"){
      return JSON.stringify(willBeJson, null, 4);
    }
    var match = line.match(/(\D+):(.*)/);
    if(match != null){
        //save to object
        var key = match[1];
        var val = match[2].trim();
        if(key === "Name"){
          var name = {};
          var match = val.match(/(.*)\s(.*)/);
          var first = match[1];
          var last = match[2];
          name["first_name"] = first;
          name["last_name"] = last;
          willBeJson["name"] = name;
        }
        else if(key === "Date of Birth"){
          willBeJson["dob"] = val;
        }
        else if(key === "Phone Number"){
          willBeJson["phone"] = val;
        }
        else if(key === "Address Line 1" || key === "Address Line 2") {
          address[0] = address[0]+val;
          willBeJson["address"] = address;
        }
        else if(key === "Part A Effective Date"){
          coverage.push({"type": "Part A",
                         "effective_date": val});
          willBeJson["coverage"] = coverage;
        }
        else if(key === "Part B Effective Date"){
          coverage.push({"type": "Part B",
                         "effective_date": val});
          willBeJson["coverage"] = coverage;
        }
        else if (key != "Source"){
          willBeJson[key.toLowerCase()] = val;
        }
    }
  };

  return JSON.stringify(willBeJson, null, 4);
}

//so parse function is accessible from server.js
module.exports = {parse: parse};
