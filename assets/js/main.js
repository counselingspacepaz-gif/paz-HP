<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {# jekyll-seo-tagがtitle, description, canonical, OGPの一部を自動生成する #}
    {% seo %}

    {%- comment -%}
      CSSキャッシュ対策：?v=20251117-2 (強制更新)
      relative_urlでPages/SWA両対応。このバージョン番号の更新がレイアウト修復の鍵となる。
    {%- endcomment -%}
    <link
      rel="stylesheet"
      href="{{ '/assets/css/styles.css?v=20251117-2' | relative_url }}"
    >

    {%- comment -%}
      OGP画像のフォールバック処理 (jekyll-seo-tagを補完)
      og_imageが未定義の場合、デフォルト画像を指定して二重に定義することでjekyll-seo-tagを上書きする。
    {%- endcomment -%}
    {% assign og_image_path = page.og_image | default: '/images/ogp/default-ogp.jpg' %}
    {%- if og_image_path -%}
      <meta property="og:image" content="{{ og_image_path | absolute_url }}">
      <meta name="twitter:image" content="{{ og_image_path | absolute_url }}">
    {%- endif -%}

    <link
      rel="icon"
      href="{{ '/favicon.ico' | relative_url }}"
      type="image/x-icon"
    >
    
    {%- comment -%}
      フォントリンクはhead.htmlの内容から除外されているため、ここでは省略。
      もし必要であれば、この<head>タグ内に追記して下さい。
    {%- endcomment -%}
    
  </head>

  <body>
    {%- comment -%}
      アクセシビリティ：スキップリンク（キーボード操作対応）
    {%- endcomment -%}
    <a class="skip-link" href="#main-content">メインコンテンツへスキップ</a>

    {% include header.html %}

    <main id="main-content">
      {{ content }}
    </main>

    {% include footer.html %}

    {%- comment -%}
      JSにもキャッシュ破壊用のバージョンを付与し、強制的に最新版を読み込ませる。
    {%- endcomment -%}
    <script src="{{ '/assets/js/main.js?v=20251117-2' | relative_url }}"></script>
  </body>
</html>
