
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.testhttp = function(req, res)
{
	console.log("testhttp");
	console.log(req.query);
	console.log(req.query.sentence);

    var http = require('http');
    var qs = require('querystring');
    var xmlToJson = require('xmljson').to_json;
    
    var appid_c = "dj0zaiZpPXY5TVBOYTl3c0JtMCZzPWNvbnN1bWVyc2VjcmV0Jng9MGM-";
    
    var queryoption = {
    	appid: appid_c,
    	sentence: "今日の天気は晴れのち曇りです。",
    	results: "ma,uniq"
    };

    var options = {
    	host: 'jlp.yahooapis.jp',
    	port: 80,
    	path: '/MAService/V1/parse?' + qs.stringify(queryoption)
    };

    res.setHeader("Content-Type", "text");

    http.get(options, function(responsedData){
    	console.log("http get callback");
    	console.log(responsedData.statusCode);
    	
    	responsedData.on('data', function(chunk)
    	{
    		console.log("httpget on data");
    		xmlToJson(chunk, function(error, data){
    			console.log(data);
    			res.send(data);
    		});
    		
    	});
    	
    });
}