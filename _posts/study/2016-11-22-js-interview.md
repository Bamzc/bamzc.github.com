---
layout: study
title: 前端面试之JavaScript篇
tags: ['js']
categories: ['前端','面试']
header: 前端面试之JavaScript篇
tagline: 前端面试之JavaScript篇
loadCss: ['study_relevant']
loadJs: ['study_relevant']
date: 2016-11-22 19:20:21
ascription: study
brief: 每次找工作，面试总是个坎。总有那么几个题来回的搞，自己也不注意，总是出错。长点心，实践，理解！此乃长久之道啊！。
---
<h4>1.	如何判断Array，Object，Function？</h4>
<pre>
<textarea class="cm_textarea_script">
function isAOF(o) {
    return Object.prototype.toString.call(o).slice(8,-1);
}
var a = [],b = {},c = function(){};
console.log(isAOF(a));//Array
console.log(isAOF(b));//Object
console.log(isAOF(c));//Function
</textarea>
</pre>
<h4>2.	如何实现bind方法？</h4>
<pre>
<textarea class="cm_textarea_script">
Function.prototype.bind = Function.prototype.bind || function(context){
   var self = this;
 
   return function(){
      return self.apply(context, arguments);
   };
}
</textarea>
</pre>
<h4>3.	实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制</h4>
<pre>
<textarea class="cm_textarea_script">
//方法一：
var obj = {a:1,b:2}

var a = 1;

Object.prototype.clone = function(){
  var o = this instanceof Array ? [] : {};
  for(var i in this){
    o[i] = typeof this[i]==="object" ? this[i].clone() : this[i];
  }
  return o;
}

var s = obj.clone();

console.log(s)//{a:1,b:2}
</textarea>
</pre>