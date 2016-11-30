---
layout: study
title : GitHub Pages 绑定来自阿里云的域名
tags: ['Github Pages','Custom domain']
categorys: ['网站','域名']
header: jekyll
tagline: GitHub Pages 绑定来自阿里云的域名
date: 2016-11-29 15:20:21
loadCss: ['study_relevant']
loadJs: ['study_relevant']
category: study
brief: 我在阿里云上注册了一个新域名：bamzc.top，我已经在GitHub Pages上建立了自己的博客：https://bamzc.github.io/。现在我希望将bamzc.top映射到https://bamzc.github.io/。
group: navigation
---
<p>我在阿里云上注册了一个新域名：<code>bamzc.top</code>，我已经在GitHub Pages上建立了自己的博客：<code>https://bamzc.github.io/</code>。现在我希望将<code>bamzc.top</code>映射到<code>https://bamzc.github.io/</code>。以下是我的实践过程：</p>
<h3>1. 创建CNAME文件</h3>
<p>在你的个人博客仓库的根目录中新建文件<code>CNAME</code>（注意没有后缀），在该文件增加一行文字，告诉Github Pages服务器你想指定的域名。该域名不能包含前缀信息，即不能添加<code>http:\\</code>前缀。</p>
<pre>
<div class="note-warning">
<h4>注意！！！</h4>
<span class='warn-text'><code>CNAME</code>文件名一定要大写，否则Github Pages服务器无法识别和解析。</span>
</div>
</pre>
<p>Github读取<code>CNAME</code>之后，Github服务器会设置<code>bamzc.top</code>为主域名，然后将<code>bamzc.github.io</code>重定向到<code>bamzc.top</code>。</p>
<h3>2. CNAME绑定域名</h3>
<p>登录<a href="https://netcn.console.aliyun.com/core/domain/list?spm=a21av.7663245.a2a45.1.ywyUxP">阿里云单域名控制台</a>，在域名解析中添加如图所示的解析</p>
<img src="/assets/src/img/DNS.jpg" alt="">
<p>默认使用阿里云提供的万网DNS服务器。当然你也可以使用<a href="https://www.dnspod.cn/">DNSPOD</a>提供的DNS服务器，这样可以使你的域名在国外更快速的传播。当你使用DNSPOD提供的DNS服务器时，除了DNS服务器不一样以外，其他的设置（比如A记录和CNAME记录）均相同。以下我们简要分析我们所添加的A记录和CNAME记录的含义。</p>
<p>在域名解析中，A记录就是直接指定一个IP，CNAME就是重命名，指向另一个域名。</p>
<ul>
<li>1、在阿里云控制台，设置主机记录@，记录类型为A，记录值是IP192.30.252.153。其中192.30.252.153是Github Pages服务器指定的IP地址，访问该IP地址即表示访问Github Pages。</li>
<li>2、在阿里云控制台，设置主机记录@，记录类型为A，记录值是IP192.30.252.154。同上。</li>
<li>3、在阿里云控制台，设置主机记录@，记录类型为CNAME，记录值是<code>bamzc.github.io.</code>。表示将<code>http://bamzc.top</code>这个主域名映射<code>bamzc.github.io</code>。在这里千万不要忘记记录值中.io后面还有一个点.(切记！)</li>
<li>4、但是很多时候，我们只想将子域名绑定到博客地址。比如如果你想将<code>blog.bamzc.top</code>（即博客子域名地址，主域名地址是<code>www.bamzc.top</code>）映射到<code>bamzc.github.io</code>，那么在主机记录中就应该填写blog，记录类型为CNAME，记录值是<code>bamzc.github.io</code>。因为你的主域名已经默认为<code>bamzc.top</code>，所以主域名和主机记录合起来就是<code>blog.bamzc.top</code>。而且这个时候，你github项目的CNAME文件内容也应该相应的改为blog.bamzc.top，因为你是想将<code>bamzc.github.io</code>和<code>blog.bamzc.top</code>绑定起来，而不是和<code>www.bamzc.top</code>绑定。</li>
<li>5、如果你想将<code>www.bamzc.top</code>（即主域名地址）映射到<code>bamzc.github.io</code>就将第三步的主机记录改为www。因为你的主域名已经默认为<code>bamzc.top</code>，所以主域名和主机记录合起来就是<code>www.bamzc.top</code>。
你可以将多个域名都映射到xxxxx.github.io之类的你自己的站点上，但是需要新建不同内容的CNAME文件。</li>
</ul>
<pre>
<div class="note-warning">
<h4>注意！！！</h4>
<span class='warn-text'>.top已经是顶级域名（和.com、.org等域名是同一级的），所以需要使用A记录进行域名解析。</span>
</div>
</pre>
<h3>3. 等待吧！</h3>
<p>这个看情况，一般很快，大概5分钟就搞定了。可以先ping一下自己的设置对不对。阿里云域名服务的工作原理是，在你更新了域名解析之后，首先是阿里的万网云解析，然后传播到各大运营商的DNS服务器，刷新DNS缓存，至此你的域名可以被访问。</p>