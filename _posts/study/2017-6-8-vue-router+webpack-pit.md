---
layout: study
title: vue-route+webpack部署单页路由项目，访问刷新出现404问题
tags: ['nginx','vue']
categories: ['前端框架','服务器']
header: vue-route+webpack部署单页路由项目，访问刷新出现404问题
tagline: vue-route+webpack部署单页路由项目，访问刷新出现404问题
loadCss: ['study_relevant']
loadJs: ['study_relevant']
date: 2017-6-8 18:20:21
ascription: study
brief: 使用Vue.js框架，利用vue-router结合webpack编写了一个单页路由项目，在服务器端配置nginx。部署完成后，访问首页没问题，从首页里打开二级页面没问题，但是所有的二级页面打开后，再次刷新，就会出现404现象。
---
<p>使用Vue.js框架，利用vue-router结合webpack编写了一个单页路由项目，在服务器端配置nginx。部署完成后，访问首页没问题，从首页里打开二级页面没问题，但是所有的二级页面打开后，再次刷新，就会出现404现象。</p>

<p>如图:</p>
<img src="/src/assets/img/nginx-404.png">

<pre>
<div class="note-warning">
<h4>问题原因：</h4>
<span class='warn-text'>刷新页面时访问的资源在服务端找不到，因为vue-router设置的路径不是真实存在的路径。</span>
</div>
</pre>

<p>二级页面，刷新页面，出现<code>404 Not Found</code>，是因为在nginx配置的根目录E:/project/demo/dist下面压根没有list这个真实资源存在，这些访问资源都是在js里渲染的</p>

<p>服务端nginx的一开始配置如下（假设域名为：test.demo.com）：</P>

<pre>
<textarea class="cm_textarea_script">
	server {
         listen 80;
         server_name test.demo.com;
         root E:/project/demo/dist;
         location / {
            #root   html;
            index  index.html index.htm;
        }
	}
</textarea>
</pre>
 <p>如上出现404的原因是由于在这个域名根目录E:/project/demo/dist下面压根就没有list这个真实目录存在。</p>

<pre>
<div class="note-warning">
<h4>问题解决：</h4>
<span class='warn-text'>在nginx配置里添加vue-route的跳转设置，正确配置如下</span>
</div>
</pre>

<pre>
<textarea class="cm_textarea_script">
	server {
         listen 80;
         server_name test.demo.com;
         root E:/project/demo/dist;
         location / {
            try_files $uri $uri/ @router;
            index index.html;
        }

        location @router {
            rewrite ^.*$ /index.html last;
        }
	}
	//配置解析
	//例如你访问www.baidu.com/abc.html他最后会跳转到www.baidu.com/index.html/abc.html
	/**
	 * 由于vuejs，单页面应用程序，必须由index.html入口文件加载静态资源，加载程序
	 * 所以，通过rewrite转发，先请求index.html加载资源，然后在跳转路由配置的二级页面
	 */
</textarea>
</pre>

