---
layout: study
title : 我的jekyll之旅，分页功能
tags: ['jekyll','blog']
categorys: ['网站','博客']
header: jekyll
tagline: 我的jekyll之旅，分页功能
date: 2016-11-02 19:20:21
loadCss: ['study_relevant']
loadJs: ['study_relevant']
category: study
brief: 对于大多数网站（尤其是博客），当文章越来越多的时候，就会有分页显示文章列表的需求。Jekyll 已经自建分页功能，你只需要根据约定放置文件即可
group: navigation
---
<h2>分页功能</h2>
<p>对于大多数网站（尤其是博客），当文章越来越多的时候，就会有分页显示文章列表的需求。Jekyll 已经自建分页功能，你只需要根据约定放置文件即可。</p>

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
<span class='content'>在你的博客的头信息中设置 permalink 会造成分页功能的瘫痪。缺省设置 permalink 即可。</span>
<span class='content'>由此可见，jekyll的分页还是蛮坑的！所以我决定去掉这个分页。</span>
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
 <ul class="pagination">
    <li>
        <a href="&#123;&#123; site.baseurl&#125;&#125;/article/">
            <span>首页</span>
        </a>
    </li>
    <li>
    &#123;% if paginator.page == 1 %&#125;
        <span>&laquo;</span>
    &#123;% else %&#125;
        &#123;% if paginator.previous_page == 1 %&#125;
        <a href="&#123;&#123; site.baseurl&#125;&#125;/article/">
        &#123;% else %&#125;
        <a href="&#123;&#123; site.baseurl&#125;&#125;/article/&#123;&#123; paginator.previous_page &#125;&#125;">
        &#123;% endif %&#125;
            <span>&laquo;</span>
        </a>
    &#123;% endif %&#125;
    </li>
    &#123;% for i in (1..paginator.total_pages) limit:9 offset:&#123;&#123;paginator.page-1&#125;&#125; %&#125;
        &#123;% if paginator.page == i %&#125;
    <li class="active">
        &#123;% else %&#125;
    <li>
        &#123;% endif %&#125;
        &#123;% if i == 1 %&#125;
        <a href="&#123;&#123;site.baseurl&#125;&#125;/article">&#123;&#123;i&#125;&#125;</a>
        &#123;% else %&#125;
        <a href="&#123;&#123;site.baseurl&#125;&#125;/article/&#123;&#123;i&#125;&#125;">&#123;&#123;i&#125;&#125;</a>
        &#123;% endif %&#125;
    </li>
    &#123;% endfor %&#125;
    <li>
        &#123;% if paginator.page == paginator.total_pages %&#125;
        <span>&raquo;</span>
        &#123;% else %&#125;
        <a href="&#123;&#123; site.baseurl&#125;&#125;/article/&#123;&#123; paginator.next_page &#125;&#125;">
            <span>&raquo;</span>
        </a>
        &#123;% endif %&#125;
    </li>
    <li>
        <a href="&#123;&#123; site.baseurl&#125;&#125;/article/&#123;&#123;paginator.total_pages&#125;&#125;">
            <span>末页</span>
        </a>
    </li>
    <li class="disabled">
        <span>第&#123;&#123;paginator.page&#125;&#125;页 / 共&#123;&#123;paginator.total_pages&#125;&#125;页</span>
    </li>
</ul>
</textarea>
</pre>
//注：后面的结束标签由codemirror自动生成，忽略不计。
