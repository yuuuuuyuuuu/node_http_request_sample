var testTl = null;
$(document).ready(function(){


	var str = "ABCDEBCBC";
	console.log("RegExp");
	console.log(str.match("(BC)","i"));
	console.log(RegExp.$1);
	console.log(RegExp.$2);
	console.log(RegExp.$3);


	console.log("document.ready");

    var testDiv1 = $("#div_test1");
    var testDiv2 = $("#div_test2");
    var divs = [testDiv1, testDiv2];
    var container = $("#div_container");

    //doBezierAnimation(divs);
    doTimelineAnimation(divs);
    //TweenLite.to(container, {perspective:500});

	//TweenLite.to(testDiv, 1, {left:"500px"});
	//TweenLite.to(divs, 0.1, {backgroundColor:"green"});
	//TweenLite.to(testDiv, 5, {borderRadius: "50px", delay: 1});
	//TweenLite.to(testDiv, 2, {rotationX:10, scale: 0.8, z: 300});
	//TweenLite.to(testDiv, 1, {fontSize: "30px"});
	//TweenLite.to(testDiv, 1, {boxShadow:"0px 0px 20px red
    //TweenLite.from(testDiv, 1, {scaleX: 2, scaleY:2, rotation:90, onComplete: myComp, onUpdate: myUpdate});

    // TweenMax.to(container, 3, {rotation:180});

/*
    var tl = new TimelineLite();
    tl.to(divs, 2, {width: "+=100px"});
    tl.to(divs, 2, {width: "+=300px"});
    tl.staggerFrom(divs, 1, {rotation: "-50deg"}, 0.5);

    tl.play();
    */
    //testTl = TweenLite.to(divs, 2, {left: "500px", onComplete: myComp});

    //var urlTest = "https://jlp.yahooapis.jp/MAService/V1/parse?appid=dj0zaiZpPXY5TVBOYTl3c0JtMCZzPWNvbnN1bWVyc2VjcmV0Jng9MGM-&sentence=今日の天気は晴れのち曇りです。&results=ma,uniq";
    var urlTest = "./testmecab";

    var options = {
    	url : urlTest,
    	method: "GET",
    	dataType: "xml",
    	success: onSuccess,
    	error: onError,
    	complete: onComplete,
    	data: {sentence: "すもももももももものうち"}
    };

    $.ajax(options);
});

function doTimelineAnimation(targetJqObj)
{
	var sWidth = $(window).width() - 150;
	var sHeight = $(window).height();

	TweenLite.to(targetJqObj, 0.1, {backgroundColor: "gray"});
	TweenLite.to(targetJqObj, 0.1, {borderRadius: "50px"});

	var tl = new TimelineLite({paused: true});
	tl.to(targetJqObj, 4, {left: sWidth})
	.staggerTo(targetJqObj, 0.3, {rotation: "+=360px"});

	// tl.play();
	//tl.reverse(3);
	tl.timeScale(1.5);
	tl.play();
}

function doBezierAnimation(targetJqObj)
{
	var beziers = BezierPlugin.bezierThrough([{x:0, y:0}, {x:250, y:400}, {x:500, y:0}]);
	//TweenMax.to(targetJqObj, 5, {bezier:{values: [{left:100, top:250}, {left:300, top:0}, {left:500, top:400}], curviness: 1, ease:Power1.easeInOut});
	//TweenMax.to(targetJqObj, 5, {bezier:beziers, ease:Power1.easeInOut});
	TweenMax.to(targetJqObj, 5, {bezier:{curviness:1.25, values:[{x:100, y:250}, {x:300, y:0}, {x:500, y:400}], autoRotate:true}, backgroundColor:"#f00", ease:Power1.easeInOut});
 
}

function onSuccess(data, dataType)
{
	console.log("onSuccess");
	//console.log(data);
	console.log(dataType);

	var jsonObj = JSON.parse(data);
	console.log(jsonObj);

    var ma_result = jsonObj["ResultSet"].ma_result;
	var ma_result_words = jsonObj["ResultSet"].ma_result.word_list.word;
	console.log(ma_result_words);
	console.log(ma_result_words["0"]);

	var totalCount = ma_result.total_count;
	console.log("totalcount:" + totalCount);

	for(var i = 0; i < Number(totalCount); i++)
	{
		console.log(ma_result_words[String(i)]);
	}
}

function onError(XMLHttpRequest, textStatus, errorThrown)
{
	console.log("onError");
	console.log(textStatus);
}

function onComplete(XMLHttpRequest, textStatus)
{
	console.log("onComplete");
}

function myComp()
{
	console.log("myComp");
	testTl.reverse({onComplete: myComp});
}

function myUpdate()
{
	//console.log("myUpdate");
}