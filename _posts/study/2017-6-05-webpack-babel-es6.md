---
layout: study
title: webpack+babel+es6整合
tags: ['webpack','babel','es6']
categories: ['前端框架','js']
header: webpack+babel+es6整合
tagline: webpack+babel+es6整合
loadCss: ['study_relevant']
loadJs: ['study_relevant']
date: 2017-6-5 18:20:21
ascription: study
brief: 一直以来，我对ES6都有很大的兴趣。随着ES6越来越火，webpack+babel，就跟es6深深的黏在了一起。通过初入es6，查阅教程、案例。也被es6的语法糖，甜的根本停不下来。然而每次配置，总得查阅文档（记性太差）。于是乎，记录一下在此。
---

<h3>前言</h3>
<p>一直以来，我对ES6都有很大的兴趣。随着ES6越来越火，webpack+babel，就跟es6深深的黏在了一起。通过初入es6，查阅教程、案例。也被es6的语法糖，甜的根本停不下来。然而每次配置，总得查阅文档（记性太差）。于是乎，记录一下在此。</p>
<p>本文只介绍如何利用webpack整合Babel来编译ES6的语法，而实际上若要使用ES6的其它属性甚至是ES7（ES2016），其实只需要引入Babel其它的preset/plugin即可，在用法上并无多大变化。</p>


<h3>首先，来看一下需要的依赖(npm包)</h3>

<p>十分关键的一个依赖，就是<code>babel-loader</code>，我们需要配置好babel-loader来加载那些使用了ES6语法的js文件。</p>
<p>babel相关的npm包：</p>
<ul>
	<li>1.<code>babel-core</code>babel的核心库</li>
	<li>2.<code>babel-preset-es2015</code>babel的preset（相当于plugin）。</li>
	<li>3.<code>babel-plugin-transform-runtime</code>优化项</li>
	<li>4.<code>babel-runtime</code>优化项</li>
</ul>
<h3>配置babel-loader</h3>
<pre>
	<textarea class="cm_textarea_script">
	{
      	test: /\.js$/,
      	exclude: /node_modules/,
      	loader: 'babel-loader',
    }
</textarea>
</pre>
<p>详细解释此配置</p>
<ul>
	<li>1.<code>test: /\.js$/</code>表明我只用babel-loader来加载js文件，如果你只是小部分js文件应用了ES6，那么也可以给这些文件换个<code>.es6</code>的后缀名并把此处改为<code>test: /\.es6$/</code>。</li>
	<li>2.<code>exclude: /node_modules/</code>，不需要用babel来加载的文件还是剔除掉，否则会大量增加编译的时间，一般我们只用babel编译我们自己写的应用代码。</li>
	<li>3.<code>loader: 'babel-loader'</code>，这一行是指定使用babel-loader并传入所需参数，这些参数其实也是可以通过babel配置文件.babelrc，不过我还是推荐在这里以参数的方式传入。</li>
</ul>
<h3>配置webpack.config.js</h3>
<pre>
<textarea class="cm_textarea_script">
	 module.exports = {
     entry: './src/app.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 }
</textarea>
</pre>
<h3>示例代码</h3>
我在github上有一demo，<a href="https://github.com/Bamzc/vue_demo">https://github.com/Bamzc/vue_demo</a>