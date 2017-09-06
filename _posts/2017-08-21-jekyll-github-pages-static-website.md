---
title: Jekyll + GitHub Pages 로 Static WebSite 만들기
description: Jekyll + GitHub Pages = Static WebSite (Blog)
date: 2017-08-21 10:30:15
categories: Jekyll
tags:
- jekyll
- gitHub pages
---

# 1. Introduce; 소개
## 1.1. Jekyll ?
[Jekyll]은 [Markdown]으로 작성된 문서를 [HTML]로 변환, Web Page 를 쉽게 만들 수 있도록 돕는 Static Website Generator[^1]이며, [Ruby]로 작성되어 있습니다.

## 1.2. GitHub Pages ?
[GitHub Pages]는 GitHub에서 제공하는 Static Website로 GiitHub Repository에 리소스를 올려놓는 것 만으로도 간단히 웹 페이지로 변환합니다. 또한 무료로 Hosting 서비스까지 제공합니다.

## 1.3. Static WebSite ?
CGI 또는 Database 등은 사용할 수 없습니다. 하지만, Json등의 파일을 이용하여 간단한 것을 저장할 수 있으며, 다양한 Plug-In 등을 이용하여 댓글도 충분히 구현이 가능합니다.
무엇보다도 글을 작성할 때, 글 작성기([WYSIWYG] 에디터 등)이/가 필요하지 않습니다.  메모장에 글을 작성하듯이 자연스럽게 작성하기만 하면된다는 것이 큰 장점이라 할 수 있겠습니다.

<!--more-->

# 2. Cook-Book; 가이드
## 2.1. Create new repository for GitHub Pages

### 2.1.1. TEST: [Github.com] 가입 및 로그인 후, 저장소(Repository)를 생성합니다.
<br />(단, 저장소 이름은 "<ins>[username]</ins>.github.io " 로 만들어야 URL이 더이상 길어지지 않습니다.)
![new repository](/_assets/images/post/2017/0821_0001.png){: style="text-align: center;"}

## 2.2. Setting for dev

### 2.2.1. Install Ruby
*  [RVM(Ruby Version Manager)] 또는 [rbenv]를 이용하여 Ruby 를 설치합니다.
<br />**[참고! GitHub가 사용하는 Ruby는 2.4.0 (2017년08월 기준)입니다.] **

### 2.2.2. Install Jekyll; Local PC, Cloud IDE, etc...

* [RubyGem]을 이용하여 Jekyll 를 설치합니다.

### 2.2.3. Create new default Jekyll Site
~~~ bash
$ jekyll new username.github.io
$ cd username.github.io
$ bundle install
$ bundle exec jekyll serve
~~~

|<button type="button">command</button>| 설명 |
|:----:|:----:|
|<button type="button">new</button>|Jekyll의 기본 구조(scaffold)를 생성|
|<button type="button">serve</button>|웹 사이트를 build 하고 서버를 기동. 파일변경에 대해 지속적용. (--watch 기능) <br />단, _config.yml 이 변경되면 서버를 재기동하여야 함.|

### 2.2.4. Init git and push to github-repository
~~~ bash
$ cd ~
$ cd username.github.io
$ git add .
$ git commit -m "init project"
$ git remote add origin git@github.com:username/username.github.io
$ git push -u origin master
~~~

### 2.2.5. Done.

---

# # Reference; 참고
- [Jekyll], [GitHub Pages], [Jekyll Themes], [jekyllthemes.io]

---

[^1]: [More Static Website Generators](https://www.staticgen.com/)

[Jekyll]: http://jekyllrb.com/
[Markdown]: https://en.wikipedia.org/wiki/Markdown
[HTML]: https://en.wikipedia.org/wiki/HTML
[Ruby]: https://www.ruby-lang.org/ko/
[Github.com]: https://github.com/
[RVM(Ruby Version Manager)]: https://rvm.io/
[rbenv]: https://github.com/rbenv/rbenv
[참고! GitHub가 사용하는 Ruby는 2.4.0 (2017년08월 기준)입니다.]: https://pages.github.com/versions/
[RubyGem]: http://ruby-korea.github.io/rubygems-guides/what-is-a-gem/
[Jekyll Themes]: http://jekyllthemes.org/
[jekyllthemes.io]: https://jekyllthemes.io/
[GitHub Pages]: https://pages.github.com/

[BASE]: http://poiemaweb.com/jekyll-basics