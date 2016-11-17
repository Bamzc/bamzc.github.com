---
layout: study
title : JavaScript中的Repaint和Reflow基本认识和优化
tags: ['repaint','reflow']
categorys: ['web','javascript']
header: jekyll
tagline: JavaScript中的Repaint和Reflow基本认识和优化
date: 2016-11-12 19:20:21
loadCss: ['study_relevant']
loadJs: ['study_relevant']
category: study
brief: 对于DOM结构中的各个元素都有自己的盒子（模型），这些都需要浏览器根据各种样式（浏览器的、开发人员定义的等）来计算并根据计算结果将元素放到它该出现的位置，这个过程称之为reflow；当各种盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来后，浏览器于是便把这些元素都按照各自的特性绘制了一遍，于是页面的内容出现了，这个过程称之为repaint。
group: navigation
---
<h3>1. 什么是Repaint/Reflow?</h3>
<p>先来一张图：浏览器解析大概的工作流程</p>
<pre><img src="/assets/src/img/repaint_reflow.png" alt="浏览器解析大概的工作流程"></pre>
<p>这张图应该可以很好理解，归纳为四个步骤：</p>
<ul>
<li>1、解析HTML以构建DOM树：渲染引擎开始解析HTML文档，转换树中的html标签或js生成的标签到DOM节点，它被称为 -- 内容树。</li>
<li>2、构建渲染树：解析CSS（包括外部CSS文件和样式元素以及js生成的样式），根据CSS选择器计算出节点的样式，创建另一个树 —- 渲染树。</li>
<li>3、布局渲染树:从根节点递归调用，计算每一个元素的大小、位置等，给每个节点所应该出现在屏幕上的精确坐标。</li>
<li>4、绘制渲染树: 遍历渲染树，每个节点将使用UI后端层来绘制。</li>
</ul>