var express = require("express"),
	app = express();

app.set("port", 3000);

app.use(require("body-parser")());
app.use(express.static(__dirname + "/"));
 
app.listen(app.get("port"), function() {
	console.log("Initializing PileAPP at port: 3000");
});
