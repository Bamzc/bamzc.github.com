---
layout: study
title : session与cookie
tags: ['session','cookie']
categorys: ['软件','网络通信']
header: session与cookie
tagline: session与cookie
date: 2016-10-14 20:20:21
loadCss: ['study_relevant']
loadJs: ['study_relevant']
category: study
brief: Session:在计算机中，尤其是在网络应用中，称为“会话控制”。Session 对象存储特定用户会话所需的属性及配置信息。Cookie，有时也用其复数形式 Cookies，指某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。定义于 RFC2109 和 2965 中的都已废弃，最新取代的规范是 RFC6265  。（可以叫做浏览器缓存）
group: navigation
---
<h2>session</h2>
<p>
Session:在计算机中，尤其是在网络应用中，称为“会话控制”。Session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web 页时，如果该用户还没有会话，则 Web 服务器将自动创建一个 Session 对象。当会话过期或被放弃后，服务器将终止该会话。Session 对象最常见的一个用法就是存储用户的首选项。例如，如果用户指明不喜欢查看图形，就可以将该信息存储在 Session 对象中。有关使用 Session 对象的详细信息，请参阅“ASP 应用程序”部分的“管理会话”。注意 会话状态仅在支持 cookie 的浏览器中保留。
</p>
<h4>session的工作原理</h4>
<p>
（1）当一个session第一次被启用时，一个唯一的标识被存储于本地的cookie中。
（2）首先使用session_start()函数，PHP从session仓库中加载已经存储的session变量。
（3）当执行PHP脚本时，通过使用session_register()函数注册session变量。
（4）当PHP脚本执行结束时，未被销毁的session变量会被自动保存在本地一定路径下的session库中，这个路径可以通过php.ini文件中的session.save_path指定，下次浏览网页时可以加载使用。
</P>
<h2>cookie</h2>
<p>
    Cookie，有时也用其复数形式 Cookies，指某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。定义于 RFC2109 和 2965 中的都已废弃，最新取代的规范是 RFC6265[1]  。（可以叫做浏览器缓存）
</p>
<h4>cookie工作原理</h4>
<p>
    要了解Cookie，必不可少地要知道它的工作原理。一般来说，Cookie通过HTTP Headers从服务器端返回到浏览器上。
首先，服务器端在响应中利用Set-Cookie header来创建一个Cookie ，然后，浏览器在它的请求中通过Cookie header包含这个已经创建的Cookie，并且把它返回至服务器，从而完成浏览器的论证。
例如，我们创建了一个名字为login的Cookie来包含访问者的信息，创建Cookie时，服务器端的Header如下面所示，这里假设访问者的注册名是“Michael Jordan”，同时还对所创建的Cookie的属性如pathdomain、expires等进行了指定。
expires=Monday,01-Mar-99 00:00:01 GMT
上面这个Header会自动在浏览器端计算机的Cookie文件中添加一条记录。浏览器将变量名为“login”的Cookie赋值为“Michael Jordon”。注意，在实际传递过程中这个Cookie的值是经过了URLEncode方法的URL编码操作的。这个含有Cookie值的HTTP Header被保存到浏览器的Cookie文件后，Header就通知浏览器将Cookie通过请求以忽略路径的方式返回到服务器，完成浏览器的认证操作。
此外，我们使用了Cookie的一些属性来限定该Cookie的使用。例如Domain属性能够在浏览器端对Cookie发送进行限定，具体到上面的例子，该Cookie只能传送到指定的服务器上，而决不会跑到其他的Web站点上去。Expires属性则指定了该Cookie保存的时间期限，例如上面的Cookie在浏览器上只保存到1999年3月1日1秒。当然，如果浏览器上Cookie 太多，超过了系统所允许的范围，浏览器将自动对它进行删除。至于属性Path，用来指定Cookie将被发送到服务器的哪一个目录路径下。
说明：浏览器创建了一个Cookie后，对于每一个针对该网站的请求，都会在Header中带着这个Cookie；不过，对于其他网站的请求Cookie是绝对不会跟着发送的。而且浏览器会这样一直发送，直到Cookie过期为止。
</p>