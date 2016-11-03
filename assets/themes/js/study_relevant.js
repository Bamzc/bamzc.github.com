require('../css/main.css');
require('../css/codemirror.css');
require('../css/foldgutter.css');
import {CodeMirror} from '../../base/codemirror/codemirror';
import '../../base/codemirror/javascript.js';
import '../../base/codemirror/css.js';
import '../../base/codemirror/htmlmixed.js';
import '../../base/bootstrap.min';

class category{
    handler(el,way){
        el.each((k,v) =>{
            CodeMirror.fromTextArea(v, {
                lineNumbers: true,
                mode: way,
                matchBrackets: true
            });
        });
    }
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

let cm = new category();
let cm_textarea = $('.cm_textarea');
let _script = $('.cm_textarea_script');
let _css = $('.cm_textarea_css');

cm_textarea.length > 0 && cm.handler(cm_textarea,'text/html');
_script.length > 0 && cm.handler(_script,'javascript');
_css.length > 0 && cm.handler(_css,'css');

let comments = $('.comments-link');

if(comments.length > 0){
	comments.each((k,v) => {
		let comments_a = $(v).find('a');
		cm.ajaxHandlerComments(function(res){
			comments_a.find('i').html(res.comments);
		},comments_a.data('thread-key'));
	});
}