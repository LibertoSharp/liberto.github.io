function scriptload() {

    var fs = require('fs');
    var files = fs.readdir("users/")

    console.log(files);
}