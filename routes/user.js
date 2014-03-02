
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.testmecab = function(req, res)
{
    console.log("testmecab");

    var exec = require('child_process').exec;
    
    var TMP_FILE_NAME = '__tmp__.txt';
    var fs = require("fs");

    var sentence = req.query.sentence;
    if(!sentence) res.send("No sentence found");
    console.log("target sentence: " + sentence);

    fs.writeFile(TMP_FILE_NAME, sentence, function(err){
        
        if(err) console.log("Error on fs.writeFile");

        exec('mecab ' + TMP_FILE_NAME, function(err, stdout, stderr){
            
            if(err) console.log("Error on exec mecab");

            var mecabResultArr = [];
            mecabResultArr = stdout.split('\n');

            var finalResultArr = [];

            for(var i = 0; i < mecabResultArr.length; i++)
            {
                var line = mecabResultArr[i];
                // console.log(line);

                var tabSplit = line.split('\t');
                if(tabSplit[0] == 'EOS')
                {
                    console.log("End of data");
                    break;
                }

                var word = tabSplit[0];
                var commaSplit = tabSplit[1].split(',');
                commaSplit.unshift(word);

                finalResultArr.push(commaSplit);
            }
            console.log("Segmentation finished");
            console.log(finalResultArr);

            res.send(finalResultArr);
        });
    });

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