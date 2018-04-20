---
layout: study
title : web前端性能优化（一）
tags: ['web','性能优化']
categories: ['工程','企业']
header: web前端性能优化（一）
tagline: web前端性能优化（一）
date: 2017-11-06 20:20:21
loadCss: ['study_relevant']
loadJs: ['study_relevant']
ascription: study
brief: 作为已经有经验的前端开发工程师，前端性能优化，对于企业级web应用开发至关重要。这个时候还得搬出雅虎14条性能优化原则。本文就把前辈们的经验再次总结下，理顺一下思路，到底怎么去做优化。
group: navigation
---

<h3>首先，看一下雅虎14条规则(<a target="_blank" href="https://developer.yahoo.com/performance/rules.html">详细地址点击这里</a>)</h3>
<div class="mobile-side-scroller textIndent">
	<table class="table table-bordered">
	  <thead>
	    <tr>
	      <th><p>规则</p></th>
	      <th><p>类别</p></th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td><p>1. 尽可能的减少 HTTP 的请求数</p></td>
	      <td><p>content</p></td>
	    </tr>
	    <tr class="info">
	      <td><p>2. 使用 CDN（Content Delivery Network）</p></td>
	      <td><p>server</p></td>
	    </tr>
	    <tr>
	      <td><p>3. 添加 Expires 头(或者 Cache-control )</p></td>
	      <td><p>server</p></td>
	    </tr>
	    <tr class="info">
	      <td><p>4. Gzip 组件</p></td>
	      <td><p>server</p></td>
	    </tr>
	    <tr>
	      <td><p>5. 将 CSS 样式放在页面的上方</p></td>
	      <td><p>css</p></td>
	    </tr>
	    <tr class="info">
	      <td><p>6. 将脚本移动到底部（包括内联的）</p></td>
	      <td><p> javascript</p>
	      </td>
	    </tr>
	    <tr>
	      	<td><p>7. 避免使用 CSS 中的 Expressions</p></td>
	      	<td> <p>css</p></td>
	    </tr>
	    <tr class="info">
	      	<td><p>8. 将 JavaScript 和 CSS 独立成外部文件</p></td>
	      	<td>
	          	<p>javascript css</p>
	      	</td>
	    </tr>
	    <tr>
	      <td><p>9. 减少 DNS 查询</p></td>
	      <td> <p>content</p></td>
	    </tr>
	    <tr class="info">
	      <td><p>10. 压缩 JavaScript 和 CSS (包括内联的)</p></td>
	      <td> <p>content</p></td>
	    </tr>
	    <tr>
	      <td><p>11. 避免重定向</p></td>
	      <td> <p>server</p></td>
	    </tr>
	    <tr class="info">
	      <td><p>12. 移除重复的脚本</p></td>
	      <td> <p>javascript</p></td>
	    </tr>
	    <tr>
	      <td><p>13. 配置实体标签（ETags）</p></td>
	      <td> <p>css</p></td>
	    </tr>
	    <tr class="info">
	      <td><p>14. 使 AJAX 缓存</p></td>
	      <td> <p></p></td>
	    </tr>
	  </tbody>
	</table>
</div>
<h4>第一，尽可能的减少 HTTP 的请求数</h4>
<p>确实yahoo介绍的那样，用户进入一个网站(或者web应用)，有80%的响应时间花费在前端。大部分时间都在下载页面中的所有组件，比如图像，样式，脚本，flash等等。减少组件数量，就会减少呈现页面所需要的http请求数量，这是页面响应速度更快的关键。</p>
<p>常用的方法，就是合并css、js以及<code>Image maps</code>和<code>css sprites</code>。在如今前端自动化构建工具（比如<code>webpack、gulp、grunt</code>）盛行的情况下 ，合并css、js已经不是问题。而<code>css sprites</code>是指只用将页面上的背景图合并成一张，然后通过css的<code>background-position</code>属性定义不同的值来取他的背景。大部分网站都是这么搞得。</p>
<h4>第二，使用 CDN（Content Delivery Network）</h4>
<p>用户与Web服务器的距离对响应时间有影响。在多个地理位置分散的服务器上部署您的内容将使您的网页从用户的角度更快加载。</p>
<p>内容分发网络,其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。</p>
<p>说白了，就是北京用户访问北京节点服务器上的内容，上海用户访问上海节点服务器上的内容。</p>
<h4>第三，添加 Expires 头(或者 Cache-control)</h4>
<p>网页内容越来越丰富，诸如css、js、image、flash等越来越多。首次访问页面可能需要发出多个http请求，如果使用<code>Expires</code>设置缓存时间，即可避免后续页面浏览中不必要的http请求。</p>
<p>做了缓存以后，浏览器以后就不需要再从服务器下载这些文件而是而直接从缓存中读取，这样再次访问页面的速度会大大加快。</p>
<h4>第四，Gzip 组件</h4>
<p>在服务器端对文件进行压缩，在浏览器端对文件解压缩，可有效减少通信传输的数据量。目前的浏览器都能良好地支持 gzip，而且gzip的压缩比例非常大，文本文件的压缩效率可达到80%以上，因此HTML、CSS、javascript文件启用GZip压缩可达到较好的效果。但是压缩对服务器和浏览器产生一定的压力，在通信带宽良好，而服务器资源不足的情况下要权衡考虑。</p>
<p>从HTTP / 1.1开始，Web客户端通过HTTP请求中的<code>Accept-Encoding</code>标头指示对压缩的支持</p>
<pre>&nbsp;&nbsp;&nbsp;&nbsp;<code>Accept-Encoding：gzip，deflate</code></pre>
<p>Web服务器通过响应中的Content-Encoding标头通知Web客户端。</p>
<pre>&nbsp;&nbsp;&nbsp;&nbsp;<code>内容编码：gzip</code></pre>
<h4>第五，将 CSS 样式放在页面的上方</h4>
<p>浏览器会在下载完成全部CSS之后才对整个页面进行渲染，因此最好的做法是将CSS放在页面最上面，让浏览器尽快下载CSS。样式表禁止在许多浏览器（包括Internet Explorer）中进行渐进式呈现。将样式表放在文档底部，这些浏览器会阻止渲染，以避免在样式更改时重新绘制页面元素。所以用户就会停留在查看空白页面，用户体验非常不好。</p>
<h4>第六，将脚本移动到底部（包括内联的）</h4>
<p>将脚本放在页面最下面的目的主要有两点：</p>
<ul>
	<li>1.防止script脚本的执行阻塞页面的下载。在页面加载的过程中，当浏览器读到js执行语句的时候一定会把它全部解释完毕后，才会继续读下面的内容。</li>
	<li>2.脚本引起的问题是它们会阻止并行下载。HTTP / 1.1规范建议的浏览器每个主机的并行下载数不超过两个（IE只能为2个，其他浏览器如谷歌、火狐等都是默认设置为2个，不过新出的ie8可以达6个）。如果把图像文件分布到多台机器的话，可以达到超过2个的并行下载。但是当脚本文件下载时，浏览器不会启动其他的并行下载。</li>
</ul>
<h4>第七，避免使用 CSS 中的 Expressions</h4>
<p>CSS表达式是动态设置CSS属性的强大（也是危险的）方法。从版本5开始，它们在Internet Explorer中受支持，但从IE8开始已弃用。例如，可以使用CSS表达式将背景颜色设置为每隔一小时交替一次：</p>
<pre>&nbsp;&nbsp;&nbsp;&nbsp;background-color：expression(new Date()).getHours()%2?"＃B8D4FF":"＃F08A00"）;</pre>
<p>当这段代码执行之后，只是鼠标动来动去，或者滚动条上下拖动几下，就会执行数千次。这些函数需要一次一次的执行，毫无疑问地会拖累页面执行的效率，乃至浏览器的性能。</p>
<h4>第八，将 JavaScript 和 CSS 独立成外部文件</h4>
<p>在浏览器使用外部文件通常会产生更快的页面，因为浏览器会缓存JavaScript和CSS文件。</p>
<p>每次请求HTML文档时，都会下载HTML文档中内联的JavaScript和CSS。这减少了所需的HTTP请求数量，但增加了HTML文档的大小。另一方面，如果JavaScript和CSS位于浏览器缓存的外部文件中，则HTML文档的大小会减少，而不会增加HTTP请求的数量。</p>
<h4>第九，减少 DNS 查询</h4>
<p>域名系统（DNS）将主机名映射到IP地址，就像电话本将人名映射到他们的电话号码一样。当您在浏览器中输入<code>www.bamzc.top</code>时，浏览器联系的DNS解析器会返回该服务器的IP地址。DNS是有成本的，DNS通常需要20-120毫秒才能查找给定域名的IP地址。直到DNS查找完成后，浏览器才能从此域名下载内容。</p>
<p>减少域名的数量可减少DNS查找的数量，但是可能会减少页面中发生的并行下载量。避免DNS查找会缩短响应时间，但减少并行下载可能会增加响应时间。所以，yahoo的建议是一个页面所包含的域名尽量控制在2-4个。</p>
<h4>第十，压缩 JavaScript 和 CSS (包括内联的)</h4>
<p>压缩代码是从代码中删除不必要的字符以缩小其大小从而缩短加载时间的做法。当代码缩小时，所有注释都将被删除，以及不需要的空白字符（空格，换行符和制表符）。</p>
<p>压缩js和css作用很显然，减少页面字节数。容量小页面加载速度自然也就快。</p>
<h4>第十一，避免重定向</h4>
<p></p>
<h4>第十二，移除重复的脚本</h4>
<h4>第十三，配置实体标签（ETags）</h4>
<h4>第十四，使 AJAX 缓存</h4>

<p>https://blog.csdn.net/u010648555/article/details/50721751</p>
<p>https://github.com/fouber/blog/issues/3</p>