---
layout: study
title : mongoDB安装
header: mongoDB安装
tagline: mongoDB安装
date: 2018-4-15 20:20:21
loadCss: ['study_relevant']
loadJs: ['study_relevant']
ascription: study
brief: mongoDB安装过程问题，出现各种问题，于是记下来，方便以后使用！
---
<h2>MongoDB下载</h2>
<p>MongoDB 提供了可用于 32 位和 64 位系统的预编译二进制包，你可以从MongoDB官网下载安装，MongoDB 预编译二进制包下载地址：https://www.mongodb.com/download-center#community</p>
<p>上述方式我试了比较费劲，推荐这个地址<a class="" href="http://dl.mongodb.org/dl/win32/x86_64">http://dl.mongodb.org/dl/win32/x86_64</a></p>
<h2>MongoDB安装完后，添加环境变量</h2>
<p>这个不做介绍，不懂的自行百度！</p>
<h2>将其注册成windows服务，方式有两种</h2>
<h3>方式一：</h3>
<p>通过命令行参数</p>
<textarea class="cm_textarea_script">
//cmd 命令提示符下输入
mongod --dbpath "c:\bamzc\mongodb_data\db" --logpath "c:\bamzc\mongodb_data\log\mongodb.log"  --install --serviceName "MongoDB"
</textarea>
<p>此时出现问题：</p>
<textarea class="cm_textarea_script">
//运行完以后，执行命令
net start MonogoDB

//于是乎，出现问题！！查阅无数文档，无不是提议使用管理员权限打开cmd，再次输入命令执行！
//然后，还是出现问题！问题还是下面这个
服务名无效。
请键入 NET HELPMSG 2185 以获得更多的帮助。

//查看mongodb.log日志，出现以下错误
2018-05-31T17:16:50.416+0800 I CONTROL  [main] Trying to install Windows service 'MongoDBService'
2018-05-31T17:16:50.417+0800 I CONTROL  [main] Error connecting to the Service Control Manager: 拒绝访问。 (5)

//问题浮出水面，直接管理员权限打开cmd，再次输入以下命令
mongod --dbpath "c:\bamzc\mongodb_data\db" --logpath "c:\bamzc\mongodb_data\log\mongodb.log"  --install --serviceName "MongoDBService"

//输入命令,ok成功！
net start MongoDBService
MongoDB 服务正在启动 ..
MongoDB 服务已经启动成功。
</textarea>
<h3>方式二：</h3>
<p>通过配置文件</p>
<textarea class="cm_textarea_script">
//cmd 命令提示符下输入
mongod --install -f "c:\Program Files\MongoDB\Server\3.4\mongod.conf"
</textarea>
<p>mongod.conf内容如下：</p>
<textarea class="cm_textarea_script">
logpath = c:\bamzc\mongodb_data\log\mongodb.log
dbpath = c:\bamzc\mongodb_data\db
logappend = true
directoryperdb = true
serviceName = MongoDBService
serviceDisplayName = MongoDBService1
port = 27017
</textarea>
<p>命令执行后命令行没有任何输出直接结束了，但是启动服务时调用net start MongoDBService 还是出现方式一的错误！</p>

<p>查看日志文件mongodb.log，发现如下记录：</p>
<textarea class="cm_textarea_script">
//查看mongodb.log日志，出现以下错误
2018-05-31T17:16:50.416+0800 I CONTROL  [main] Trying to install Windows service 'MongoDBService'
2018-05-31T17:16:50.417+0800 I CONTROL  [main] Error connecting to the Service Control Manager: 拒绝访问。 (5)	

//于是！解决方案如方式一
//直接管理员权限打开cmd，再次输入以下命令
mongod --install -f "c:\Program Files\MongoDB\Server\3.4\mongod.conf"

//再次输入命令,ok成功！
net start MongoDBService
MongoDB 服务正在启动 ..
MongoDB 服务已经启动成功。
</textarea>
<p>这个真是费死劲，查阅很多教程，还是出现错误。有可能是我的电脑问题吧。记录一下！这个坑浪费了我很多时间，我希望我这篇文章能带给大家帮助吧。</p>


<p>最后！欢迎大家加入QQ群81148810，一起交流分享技术</p>