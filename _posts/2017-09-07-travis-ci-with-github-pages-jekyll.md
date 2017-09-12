---
layout: post
title: Travis-CI with Github Pages (Jekyll)
description: Travis-CI + GitHub Pages (Jekyll)
date: 2017-09-07 14:34:30
categories: Travis-CI
tags:
- travis-ci
- gitHub pages
- jekyll
photos:
- /_assets/images/post/2017/0907_js-travis-ci-github-pages.png
---

# 1. Travis CI ?

![Travis CI](/_assets/images/post/2017/0907_travis-ci.png)

Travis CI는 GitHub과 연동해 지속적 통합(Continuous Integration)을 호스팅해주는 서비스입니다.
지속적 통합의 정확한 의미는 조금 더 넓을 수 있지만, Travis CI로 한정해서 쉽게 생각하자면, GitHub 저장소에 새로운 커밋이 push되었을 때 CI 서버가 뒤에서 자동으로 새로운 커밋을 가져와서 빌드 테스트를 수행하고, 그 결과를 리포팅 해주는 서비스입니다.

> C, C++, Clojure, Erlang, Go, Groovy, Haskell, Java, JavaScript (Node.js), Objective-C, Perl, PHP, Python, Ruby, Scala, etc. [^1]

이상의 언어를 포함해서 많은 종류의 데이터베이스, 즉 다양한 환경의 테스트를 수행할 수 있도록 지원해주고 있습니다.
뿐만 아니라 지원하지 않는 영역에 대해서도 자유도를 폭넓게 제공하고 있어, 빌드 혹은 테스트 시에 라이브러리나 네이티브 모듈을 설치해서 테스트하는 것이 가능합니다.

# 2. Travis CI 시작하기

## 2.1 Github 가입 및 연동

Travis CI는 Github와 연동해서 동작합니다. 따라서 Github 계정을 이용하여 회원가입을 할 수 있습니다.

가입 후 프로필 페이지에 가면 다음과 같이 Github에서 사용중인 저장소 관리를 할 수 있습니다. (저장소 Hook 기능을 켜고 끌 수 있습니다.)

![Travis CI - Settings 1](/_assets/images/post/2017/0907_travis-setup-01.png)


단, 자신이 속한 그룹 (Organization) 의 저장소는 자동으로 처리되지 않는다고 합니다. 수동으로 훅을 설정해주어야 합니다. ([#242]{:target="_blank"}, [#325]{:target="_blank"} 참고)


## 2.2 저장소 내 .travis.yml 작성

연동할 저장소 내에 .travis.yml 을 작성합니다.
이 파일은 [YAML]{:target="_blank"} 파일로 Travis CI의 빌드 설정 및 테스트 환경 등에 대한 모든 설정을 기록하는 파일입니다. 
이 파일은 반드시 루트위치에 존재하여야 합니다.

{% highlight yaml linenos %}
# Travis CI 가 사용할 빌더
language: ruby

rvm:
  - 2.1

script:
  - bundle exec jekyll build
  - bundle exec htmlproofer ./_site --only-4xx --allow-hash-href --assume-extension --external_only --check-html --report-missing-names
  

# 브랜치 화이트리스트. GitHub Pages 에서만 사용됨
#branches:
#  only:
#  - gh-pages     # gh-pages 브랜치를 테스트 함
#  - /pages-(.*)/ # "pages-" 로 시작하는 모든 브랜치를 테스트 함

env:
  global:
    - NOKOGIRI_USE_SYSTEM_LIBRARIES=true # speeds up installation of html-proofer
{% endhighlight %}

.travis.yml은 위와 같은 형식이 됩니다. 
[Github Pages (with Jekyll)]{:target="_blank"}와 연동을 하기 위한 설정예시 입니다. 실제로 제가 사용하고 있는 설정입니다.
[html-proofer]{:target="_blank"}[^2] 플러그인 등을 설정할 수 있습니다. html-proofer의 옵션은 [html-proofer option Ref.]{:target="_blank"} 이곳에서 확인할 수 있습니다.

## 2.3 Github 저장소 커밋 후 푸시

푸시를 하시면 자동으로 Travis CI Queue에 추가 됩니다. 해당 언어에 대한 워커가 사용가능해지면 빌드를 시작하는 것죠.
최초의 빌드는 반드시 푸시를 통해서만 이루어지고 이후에는 푸시를 하거나 Github의 Test Hook[^3]으로 빌드를 실행할 수 있습니다.

# 3. 기타사항

## 3.1 빌드상태 이미지

Travis CI에서는 빌드 상태를 나타내는 이미지를 제공합니다.

![Travis Build Status 01](/_assets/images/post/2017/0907_travis-build-status01.png)
![Travis Build Status 02](/_assets/images/post/2017/0907_travis-build-status02.png)

위 버튼을 클릭하시면, 빌드상태를 알 수 있는 이미지의 주소를 획득할 수 있습니다.

예시. 다음은 제 저장소의 상태입니다.
[![Build Status](https://travis-ci.org/expVirusGene/expvirusgene.github.io.svg?branch=master)](https://travis-ci.org/expVirusGene/expvirusgene.github.io){:target="_blank"}

---

[^1]: [이곳(Here)](https://docs.travis-ci.com/){:target="_blank"}의 Language-specific Guides 참고
[^2]: [htmlproofer]는 html 을 검증하는 플러그인으로, Jekyll로 만들어진 결과물을 테스트 하기 위해 사용합니다.
[^3]: 저장소의 Settings 메뉴에서 Service Hooks (Integrations & services) 로 가시면,  Travis CI 가 등록된 것을 확인하실 수 있습니다. 클릭하시면 Test Hook 실행을 하실 수 있습니다.

[#242]: https://github.com/travis-ci/travis-ci/issues/242
[#325]: https://github.com/travis-ci/travis-ci/issues/325
[YAML]: http://yaml.org/
[Github Pages (with Jekyll)]: http://jekyllrb.com/docs/continuous-integration/travis-ci/
[html-proofer]: https://github.com/gjtorikian/html-proofer/
[html-proofer option Ref.]: https://github.com/gjtorikian/html-proofer/blob/master/bin/htmlproofer/