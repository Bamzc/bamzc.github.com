require('../css/main.css');
require('../css/codemirror.css');
require('../css/foldgutter.css');
import {CodeMirror} from '../../base/codemirror/codemirror';
import '../../base/codemirror/javascript.js';
import '../../base/codemirror/css.js';
import '../../base/codemirror/htmlmixed.js';

class loadCodeMirrorWay{
    handler(el,way){
        el.each((k,v) =>{
            CodeMirror.fromTextArea(v, {
                lineNumbers: true,
                mode: way,
                matchBrackets: true
            });
        });
    }
}
let cm = new loadCodeMirrorWay();
let cm_textarea = $('.cm_textarea');
let _script = $('.cm_textarea_script');
let _css = $('.cm_textarea_css');
cm_textarea.length > 0 && cm.handler(cm_textarea,'text/html');
_script.length > 0 && cm.handler(_script,'javascript');
_css.length > 0 && cm.handler(_css,'css');