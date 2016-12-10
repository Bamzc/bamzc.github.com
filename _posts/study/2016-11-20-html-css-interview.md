---
layout: study
title: 前端面试之HTML+CSS篇
tags: ['html','css']
categories: ['前端','面试']
header: 前端面试之HTML+CSS篇
tagline: 前端面试之HTML+CSS篇
loadCss: ['study_relevant']
loadJs: ['study_relevant']
date: 2016-11-20 19:20:21
ascription: study
brief: 每次找工作，面试总是个坎。总有那么几个题来回的搞，自己也不注意，总是出错。长点心，实践，理解！此乃长久之道啊！。
---
<h4>1.	请解释一下为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？</h4>
<p>首先，使用浮动，是为了更方便的布局。</p>
<p>然后，浮动会使元素脱离文档流，使之包围其元素的父元素不占据空间，出现高度为0(高度塌陷)。所以需要清除浮动</p>
<p>清除浮动的方式大概有6种：</p>
<ul>
	<li>1. 添加额外的标签，比如在浮动元素末尾添加一个空标签<code>&lt;div style="clear:both"&gt;&lt;/div&gt;</code></li>
	<li>2. 父元素设置 <code>overflow:hidden</code>，通过设置父元素overflow值设置为hidden；在IE6中还需要触发 <code>hasLayout</code> ，例如 <code>*zoom:1；</code></li>
	<li>3. 父元素设置 <code>overflow:auto</code> 属性 ，同样IE6需要触发hasLayout，和2差不多</li>
	<li>4. 父元素也设置浮动 </li>
	<li>5. 父元素设置display:table </li>
	<li>6. 父使用:after 伪元素，实现方式<code>.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; } 
.clearfix { *zoom:1; } </code></li>
</ul>
<h4>2.	position的值relative和absolute定位原点是？</h4>
<p>
	<code>relative</code>定位原点是原来所在的位置为原点</p><p><strong>注：</strong>relative:元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。
</p>
<p>
	<code>absolute</code>定位原点是离自己最近的一级position设置为absolute或者relative的父元素的左上角为原点的。如果自己的所有父元素都没设置position，那么就以body为定位原点。</p><p>
	<strong>注：</strong>absolute:元素框从文档流完全删除，并相对于其包含块定位。包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。
</p>
<h4>3.	css优先级算法如何计算？</h4>
<ul>
<li>* 元素标签中定义的样式（Style属性）,加1,0,0,0</li>
<li>* 每个ID选择符(如 #id),加0,1,0,0</li>
<li>* 每个Class选择符(如 .class)、每个属性选择符(如 [attribute=])、每个伪类(如 :hover)加0,0,1,0</li>
<li>* 每个元素选择符（如p）或伪元素选择符(如 :firstchild)等，加0,0,0,1</li>
<li>算法：当遇到多个选择符同时出现时候 
按选择符得到的Specificity值逐位相加， 
{数位之间没有进制 比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0} 
就得到最终计算得的specificity， 
然后在比较取舍时按照从左到右的顺序逐位比较，大的优先级越高。</li>
</ul>
<p>需注意的：</p>
<ul>
	<li>1. !important的优先级是最高的，但出现冲突时则需比较”四位数“;</li>
	<li>2. 优先级相同时，则采用就近原则，选择最后出现的样式;</li>
	<li>3. 继承得来的属性，其优先级最低;</li>
	<li>!important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性</li>
</ul>
<h4>4.	png、jpg、gif这些图片格式有什么特点，分别什么时候用？</h4>
<p>png采用无损压缩，能在保证最不失真的情况下尽可能压缩图像文件的大小，可以储存透明，尺寸比jpg要大很多，不支持动画。适用于小图标。</p>
<p>jpg采用有损压缩，会使图像数据质量下降，并且在编辑和重新保存JPG格式图像时，这种下降损失会累积，尺寸比png小。适用于摄影图片，以及色彩丰富的图片。</p>
<p>gif可插入多帧，实现动画效果,可设置透明色。一般只作为动态图像格式使用</p>
<h4>5.	常见的CSS Hack 有哪些方式，怎么写？</h4>
<p><strong>方式一：条件注释法</strong></p>
<ul>
	<li>只在IE下生效<code>&lt;!--[if IE]&gt;
	这段文字只在IE浏览器显示
	&lt;![endif]--&gt;</code></li>
	<li>只在IE6下生效<code>&lt;!--[if IE 6]&gt;
	这段文字只在IE6浏览器显示
	&lt;![endif]--&gt;</code></li>
	<li>只在IE6以上版本生效
	<code>&lt;!--[if gte IE 6]&gt;
	这段文字只在IE6以上(包括)版本IE浏览器显示
	&lt;![endif]--&gt;</code></li>
	<li>只在IE8上不生效<code>&lt;!--[if ! IE 8]&gt;
	这段文字在非IE8浏览器显示
	&lt;![endif]--&gt;</code></li>
	<li>非IE浏览器生效
	<code>&lt;!--[if !IE]&gt;
	这段文字只在非IE浏览器显示
	&lt;![endif]--&gt;</code></li>
</ul>
<p><strong>方式二：类内属性前缀法</strong></p>
<table class="table table-striped">
<tbody>
<tr>
<td>hack</td>
<td>写法</td>
<td>实例</td>
<td>IE6(S)</td>
<td>IE6(Q)</td>
<td>IE7(S)</td>
<td>IE7(Q)</td>
<td>IE8(S)</td>
<td>IE8(Q)</td>
<td>IE9(S)</td>
<td>IE9(Q)</td>
<td>IE10(S)</td>
<td>IE10(Q)</td>
</tr>
<tr>
<td>*</td>
<td>*color</td>
<td style="">青色</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
</tr>
<tr>
<td>+</td>
<td>+color</td>
<td style="">绿色</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
</tr>
<tr>
<td>-</td>
<td>-color</td>
<td style="">黄色</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td>N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
</tr>
<tr>
<td>_</td>
<td>_color</td>
<td style="">蓝色</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
</tr>
<tr>
<td>#</td>
<td>#color</td>
<td style="">紫色</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
</tr>
<tr>
<td>\0</td>
<td>color:red\0</td>
<td style="">红色</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
</tr>
<tr>
<td>\9\0</td>
<td>color:red\9\0</td>
<td style="color:#F0F\9\0">粉色</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
</tr>
<tr>
<td>!important</td>
<td>color:blue !important;color:green;</td>
<td style="color:#630!important; color:#000">棕色</td>
<td class="unrender">N</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="unrender">N</td>
<td class="render">Y</td>
<td class="render">Y</td>
</tr>
</tbody>
</table>
<p><strong>方式三：选择器前缀法</strong></p>
<ul>
<li>*html *前缀只对IE6生效</li>
<li>*+html *+前缀只对IE7生效</li>
<li>@media screen\9{...}只对IE6/7生效</li>
<li>@media \0screen {body { background: red; }}只对IE8有效</li>
<li>@media \0screen\,screen\9{body { background: blue; }}只对IE6/7/8有效</li>
<li>@media screen and (min-width:0\0) {body { background: gray; }} 只对IE9/10有效</li>
<li>@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }} 只对IE10有效</li>
</ul>