---
layout: page
title: 前端面试题总结
header: Posts By Tag
group: navigation
---
{% include JB/setup %}
HTML/CSS部分
1.css垂直水平居中
定宽定高解决办法;父级 position:relavive;子级:position:absolute; top:50%; left:50%; width:100px;height:200px; margin:-100px 0 0 -50px；
宽高不定:父级 position:relavive;子级: position: absolute; transform:translate(-50%,-50%); top:50%; left:50%;
2行内元素与块级函数的三个区别
1.行内元素与块级元素直观上的区别
行内元素会在一条直线上排列，都是同一行的，水平方向排列
块级元素各占据一行，垂直方向排列。块级元素从新行开始结束接着一个断行。
2.块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素。
3.行内元素与块级元素属性的不同，主要是盒模型属性上行内元素设置width无效，height无效(可以设置line-height)，margin上下无效，padding上下无效

JavaScript部分
2.二维数组转化为数组
    Var arr=[[1,2,3],[2,3,4]];
	Arr.join(“,”).split(“,”);
3.实现按照指定长度为数字前面补零输出的方法。例如 str(123,5);
	function getStr(str,n){ 
  		var len = (str+"").length; 
  		return Array.apply(null,Array(n-len > 0 ? (n-len+1) : 0)).join("0")+str;
}       
getStr(123,5);