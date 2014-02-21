var testTl = null;
$(document).ready(function(){

	console.log("document.ready");

    var testDiv1 = $("#div_test1");
    var testDiv2 = $("#div_test2");
    var divs = [testDiv1, testDiv2];
    var container = $("#div_container");

    //TweenLite.to(container, {perspective:500});

	//TweenLite.to(testDiv, 1, {left:"500px"});
	TweenLite.to(divs, 0.1, {backgroundColor:"green"});
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
    testTl = TweenLite.to(divs, 2, {left: "500px", onComplete: myComp});

    var options = {
    	url : "./testhttp",
    	method: "GET",
    	dataType: "text",
    	success: onSuccess,
    	error: onError,
    	complete: onComplete,
    	data: {sentence: "testsentence"}
    };

    $.ajax(options);
});

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