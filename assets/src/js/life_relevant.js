import '../../base/bootstrap.min'; 

class comments{
    ajaxHandlerComments(cb,key){
    	$.ajax({
			url:'https://api.duoshuo.com/threads/counts.jsonp',
			type:'get',
			data:{
				short_name : 'bamzc',
				threads : key
			},
			dataType:'jsonp',
			success:function (res) {
				if(res.code == 0){
					cb(res.response[key]);
				}
				
			}
		});
    }
}
let cm = new comments();
let cs = $('.comments-link');

if(cs.length > 0){
	cs.each((k,v) => {
		let comments_a = $(v).find('a');
		cm.ajaxHandlerComments(function(res){
			comments_a.find('i').html(res.comments);
		},comments_a.data('thread-key'));
	});
}