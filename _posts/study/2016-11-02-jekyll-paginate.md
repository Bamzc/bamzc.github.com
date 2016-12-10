---
layout: study
title : jekyll，分页功能，附带分类分页！
tags: ['jekyll','blog']
categories: ['网站','博客']
header: jekyll
tagline: jekyll，分页功能，附带分类分页！
date: 2016-11-02 19:20:21
loadCss: ['study_relevant']
loadJs: ['study_relevant']
ascription: study
brief: 对于大多数网站（尤其是博客），当文章越来越多的时候，就会有分页显示文章列表的需求。Jekyll 已经自建分页功能，你只需要根据约定放置文件即可。jekyll的分页总的来说还算给力，基本的功能可以完成。但是有一些缺陷，就是category，tag的分类分页无法实现，必须通过插件的方式来做。
group: navigation
---
<h2>分页功能</h2>
<p>对于大多数网站（尤其是博客），当文章越来越多的时候，就会有分页显示文章列表的需求。Jekyll 已经自建分页功能，你只需要根据约定放置文件即可。但是有一些缺陷，就是category，tag的分类分页无法实现，必须通过插件的方式来做。</p>

<pre>
<div class="note-warning">
<h4>重点来了！</h4>
<span class='warn-text'>几番周折，几番折腾，终于实现分类分页，此时我内心控制不住的激动开始井喷般爆发！</span>
<span class='warn-text'>先试想一下，假如我实现分类分页了，jekyll-paginate是不是也只能对一个index.html页面生效？如果我想对多个页面分页呢？如何配置？</span>
<span class='warn-text'>jekyll-paginate的分页还是蛮坑的！完全没法满足我的需求，满足我内心的饥渴。于是，决定修改它！先付上"原装功能实现"！</span>

</div>
</pre>

<p>在 Jekyll 3 中，需要在 gems 中安装 <code>jekyll-paginate</code> 插件，并添加到你的 Gemfile 和 <code>_config.yml</code> 中。在 Jekyll 2 中，分页是标准功能。</p>

<div class="note info">
  <h5>分页功能只支持 HTML 文件</h5>
  <p>
    Jekyll 的分页功能不支持 Jekyll site 中的 Markdown 或 Textile 文件。分页功能从名为 <code>index.html</code> 的 HTML 文件中被调用时，才能工作。分页功能是可选的，可能通过 <code>paginate_path</code> 配置的值，驻留和生成在子目录中。
  </p>
</div>

<h2 id="section">开启分页功能</h2>

<p>开启分页功能很简单，只需要在 <code>_config.yml</code> 里边加一行，指明每页该展示多少项目：</p>

<pre>
paginate:5
paginate_path: "page:num"
</pre>

<p><code >blog/index.html</code> 将会读取这个设置，把它传给每个分页页面，然后从第 <code>2</code> 页开始输出到 <code>blog/page:num</code>, <code>:num</code> 是页码。如果有 12 篇文章并且做如下配置 <code>paginate: 5</code>, Jekyll 会将前 5 篇文章写入 <code>blog/index.html</code>，把接下来的 5 篇文章写入 <code>blog/page2/index.html</code>，最后 2 篇写入 
<code>blog/page3/index.html</code>。</p>
<pre>
<div class="note-warning">
<h4>注：不要设置 permalink</h4>
<span class='warn-text'>在你的博客的头信息中设置 permalink 会造成分页功能的瘫痪。缺省设置 permalink 即可。</span>
<span class='warn-text'>由此可见，jekyll的分页真的蛮坑的！</span>
</div>
</pre>

<h2 id="liquid-">可用的 Liquid 属性</h2>

<p>分页功能插件使得 <code class="highlighter-rouge">paginator</code> liquid 对象具有下列属性：</p>

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th><p>属性</p></th>
      <th><p>描述</p></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>page</code></p></td>
      <td><p>当前页码</p></td>
    </tr>
    <tr>
      <td><p><code>per_page</code></p></td>
      <td><p>每页文章数量</p></td>
    </tr>
    <tr>
      <td><p><code>posts</code></p></td>
      <td><p>当前页的文章列表</p></td>
    </tr>
    <tr>
      <td><p><code>total_posts</code></p></td>
      <td><p>总文章数</p></td>
    </tr>
    <tr>
      <td><p><code>total_pages</code></p></td>
      <td><p>总页数</p></td>
    </tr>
    <tr>
      <td><p><code>previous_page</code></p></td>
      <td>
          <p>
              上一页页码 或 <code>nil</code>（如果上一页不存在）
          </p>
      </td>
    </tr>
    <tr>
      <td><p><code>previous_page_path</code></p></td>
      <td>
          <p>
              上一页路径 或 <code>nil</code>（如果上一页不存在）
          </p>
      </td>
    </tr>
    <tr>
      <td><p><code>next_page</code></p></td>
      <td>
          <p>
              下一页页码 或 <code>nil</code>（如果下一页不存在）
          </p>
      </td>
    </tr>
    <tr>
      <td><p><code>next_page_path</code></p></td>
      <td>
          <p>
              下一页路径 或 <code>nil</code>（如果下一页不存在）
          </p>
      </td>
    </tr>
  </tbody>
</table>
</div>

<div class="note info">
  <h5>不支持对“标签”和“类别”分页</h5>
  <p>分页功能遍历 <code>posts</code> 下的所有文章，而忽略定义在文章内的头信息中的变量。现在不支持对“标签”和“类别”分页。也不支持任何文件集合，因为该功能被限制在 posts 中。</p>
</div>

<h2>生成带分页功能的文章</h2>

<p>接下来你需要做的事情，就是使用你已经掌握的 <code>paginator</code> 变量，列表展示你的文章。下边是一个简单的例子，在 HTML 文件中生成带分页功能的文章（以下使用bootstrap的分页）：</p>

<span> 遍历分页后的文章</span>
<pre>
<textarea class="cm_textarea_xml">
&#123;% for post in paginator.posts %&#125;
  <h1><a href="&#123;&#123; post.url &#125;&#125;">&#123;&#123; post.title &#125;&#125;</a></h1>
  <p class="author">
    <span class="date">&#123;&#123; post.date &#125;&#125;</span>
  </p>
  <div class="content">
    &#123;&#123; post.content &#125;&#125;
  </div>
&#123;% endfor %&#125;

<!-- 分页链接 -->
<div class="pagination">
  &#123;% if paginator.previous_page %&#125;
    <a href="/page&#123;&#123; paginator.previous_page &#125;&#125;" class="previous">Previous</a>
  &#123;% else %&#125;
    <span class="previous">Previous</span>
  &#123;% endif %&#125;
  <span class="page_number ">Page: &#123;&#123; paginator.page &#125;&#125; of &#123;&#123; paginator.total_pages &#125;&#125;</span>
  &#123;% if paginator.next_page %&#125;
    <a href="/page&#123;&#123; paginator.next_page &#125;&#125;" class="next">Next</a>
  &#123;% else %&#125;
    <span class="next ">Next</span>
  &#123;% endif %&#125;
</div>
</textarea>
</pre>
<h2>自定义插件paginate</h2>
<p>其实就是修改版的jekyll-paginate，小小的装一下(奸笑)。废话不多说直接上干货！</p>
<p>关于自定义插件，不多说，上传送门——<a href='http://jekyll.com.cn/docs/plugins/'>插件</a></p>
<h4>先说一下，jekyll安装插件,有两种安装插件的方式：</h4>
<ul>
  <li>1.在网站根下目录建立 _plugins 文件夹，插件放在这里即可。 Jekyll 运行之前，会加载此目录下所有以 *.rb 结尾的文件。</li>
  <li>2.在 _config.yml 文件中，添加一个以 gems 作为 key 的数组，数组中存放插件的 gem 名称。例如：
 gems: [jekyll-test-plugin, jekyll-jsonify, jekyll-assets]</li>
</ul>
<h4>然后，引入两个文件pager.rb和paginate.rb放到_plugins</h4>
<p>传送门——<a href='https://github.com/Bamzc/jekyll-paginate-plugin'>click here!</a></p>
<h2 id="section">同样开启分页功能</h2>
<pre>
<div class="note-warning">
<h4>注意，这里跟jekyll—paginate不一样的地方！</h4>
<span class='warn-text'>paginate:5</span>
<span class='warn-text'>paginatepath: ['topics/study/page/:num','topics/life/page/:num']</span>
</div>
</pre>
<p>没错，这里的<code>paginatepath: []</code>已然不再是<code>paginate_path:"page:num"</code>而是一个数组！就是我说的，假如我想对多个页面分页呢？</p>
<p><code>index.html</code>一定要放在你的分类名称的文件夹下！切记！</p>
<p><code>index.html</code>关于分类，我的做法是每个页面配置category，我也是根据category实现分页的
<pre>
---
layout: post
category: study
---
</pre>
</p>
<p>ok,到此已经完成了。可以尽情的使用了！其他功能都跟jekyll的分页类似了。</p>
<h4>请允许我碎碎念一下！</h4>
<ul>
  <li>烧脑一：为了实现我想要的功能，我对<code>ruby</code>语言是各种看，各种学习！这个能烧死我成千上万个脑细胞了！</li>
  <li>烧脑二：第一版其实实现的觉比较简单，我是这么想的，既然<code>paginate</code>可以作用到全局，那我是否引入<code>jekyll-paginate</code>修改一下全局变量<code>paginator.posts</code>改成按照我想要的分类分页，不是可以了？确实可以实现。比较简单！但是还是不满足我的需求。比如我的多页面多分类分页，于是乎继续无脑看，无脑改，最终版诞生了！</li>
  <li>烧脑三：比较犯傻的一个环节，关于<code>assign</code>赋值，傻傻的我还进行了用它对全局变量赋值！于是乎,<code>paginator.post=site.categorys</code>,灰常失败的去这么做了！突然发现这个坑！</li>
</ul>