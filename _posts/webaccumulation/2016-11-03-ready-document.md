---
layout: study
title: dom加载ready方法实现
tags: ['ready','document']
categorys: ['网站','文档加载']
header: ready_document
tagline: dom加载ready方法实现
date: 2016-11-03 10:21:00
loadCss: ['study_relevant']
loadJs: ['study_relevant']
category: webacc
brief: 当 DOM（文档对象模型） 已经加载，并且页面（包括图像）已经完全呈现时，会发生 ready 事件。该事件在文档就绪后发生，ready() 函数规定当 ready 事件发生时执行的代码。
group: navigation
---
<pre>
<textarea class="cm_textarea_script">
    
var ready = (function(){

    var DOMContentLoaded,_fn,isReady = false;

    function doScrollCheck() {

        try {
            // 如果是IE低版本的话，可以使用 Diego Perini的这个技巧
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
        } catch(e) {
            setTimeout( doScrollCheck, 1 );
            return;
        }

        handle();
    }
    //firefox，chorme，safari，等等除基于IE内核以外的高级浏览器的添加事件方式
    //DOM2的用法
    if ( document.addEventListener ) {
        DOMContentLoaded = function() {
            document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            handle();
        };
    //IE处理事件的方式
    } else if ( document.attachEvent ) {
        DOMContentLoaded = function() {
            // 确保body存在，IE的处理方式
            if ( document.readyState === "complete" ) {
                document.detachEvent( "onreadystatechange", DOMContentLoaded );
                handle();
            }
        };
    }
    function handle(){
        if ( isReady ) {
            return;
        }

        _fn();

        isReady = true;

        _fn = null;
    }
    var loadRead = function(fn){

        if(isReady){
            fn.call(document);
            return;
        }

        _fn = fn;

        if ( document.readyState === "complete" ) {
            return setTimeout( handle, 1 );
        }
        //IE9+，firefox，chorme，safari，opera添加事件方式
        //DOM2级事件处理程序
        if ( document.addEventListener ) {
            document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            window.addEventListener( "load", handle, false );
        //IE事件处理程序
        } else if ( document.attachEvent ) {
            document.attachEvent( "onreadystatechange", DOMContentLoaded );
            window.attachEvent( "onload", handle );
            // 如果IE不支持onreadystatechange，可以使用以下方式触发
            // 检测document是否ready
            var toplevel = false;

            try {
                toplevel = window.frameElement == null;
            } catch(e) {}

            if ( document.documentElement.doScroll && toplevel ) {
                doScrollCheck();
            }
        }

    };
    return loadRead;
})();

ready(function(){
    console.log('loaded')
});

</textarea>
</pre>
<div>
<h3>DOM文档加载的步骤</h3>
<ul>
    <li>(1) 解析HTML结构。</li>
    <li>(2) 加载外部脚本和样式表文件。</li>
    <li>(3) 解析并执行脚本代码。</li>
    <li>(4) 构造HTML DOM模型。//ready</li>
    <li>(5) 加载图片等外部文件。</li>
    <li>(6) 页面加载完毕。//load</li>
</ul>
<p>由于该事件在文档就绪后发生，因此把所有其他的事件和函数置于该事件中是非常好的做法。由此可见，ready事件的执行顺序是要优于load事件的。</p>
<p><strong>load:</strong>当页面完全加载在window上面后触发，当所有框架都加载完毕是在框架集上面触发，当图像加载完毕是在img元素上面触发，或者当嵌入的内容加载完毕时在Object元素上面触发。</p>
</div>
<h3>HTML DOM readyState 属性</h3>
<div>
    <p>readyState 属性返回当前文档的状态（载入中……）。该属性返回以下值:</p>
    <ul>
        <li>(1) uninitialized - 还未开始载入</li>
        <li>(2) loading - 载入中</li>
        <li>(3) interactive - 已加载，文档与用户可以开始交互</li>
        <li>(4) complete - 载入完成</li>
    </ul>
<div>