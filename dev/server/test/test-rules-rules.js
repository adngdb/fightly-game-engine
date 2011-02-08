var sys = require('sys') ;
var rules_ = require('lib/rules/rules.js') ;

exports['load'] = function (test) {
	var r = new rules_.Rules() ;
	r.load('rules.json') ;
	test.done() ;
};

exports['execute'] = function (test) {
	var r = new rules_.Rules() ;
	r.load('rules.json') ;
	r.execute('foo') ;
	
	test.throws(function() { r.execute('UnexistantAction') }) ;

	test.done() ;
};
