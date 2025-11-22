
# 💡 Jekyll → SWA & GitHub Pages デプロイチェックリスト

## 1. Jekyll ビルド確認
- ターミナルで `_site/index.html` が生成されることを確認
  ```bash
  bundle exec jekyll build
  ls -l _site/index.html
  ```
- `_config.yml` が正しく設定されているか確認（`permalink`、`baseurl` 等）

## 2. GitHub Actions の設定確認
- `workflow_dispatch` イベントトリガーがあるか（手動起動も可能にする場合）
- `build_site → deploy_swa → deploy_pages` のジョブ順序が正しい
- `needs:` によって依存関係を明示

## 3. アーティファクト管理
- SWA と Pages 用で同一アーティファクト名を使用（例：`github-pages`）
- 衝突を防ぐため、`upload-pages-artifact@v3` は使わず、`upload-artifact@v4` に統一
- `build_site` でアーティファクトをアップロード
- デプロイ時に `download-artifact@v4` で `_site` を復元

## 4. Azure Static Web Apps 設定
- `app_location` が `_site` を指している（完成した HTML が格納されているフォルダを指定）
- `skip_app_build: true` を指定（Jekyll ビルド済みのため）
- `azure_static_web_apps_api_token` は最新のトークンに更新済み

## 5. GitHub Pages 設定
- `deploy-pages@v4` で Pages 用アーティファクトを自動利用
- `upload-pages-artifact@v3` は不要
- Pages 専用環境（`environment: github-pages`）が指定されている

## 6. デバッグ用確認
- SWA デプロイ前に `_site/index.html` の存在をログで確認
  ```yaml
  - name: Verify _site
    run: |
      ls -l _site
      test -f _site/index.html
  ```
- Actions 実行画面で「View workflow file」を開き、最新 YAML が適用されているか確認

## 7. Ruby / Jekyll バージョン管理
- `Gemfile.lock` に合わせて Ruby バージョンを指定（例：3.3）
- Jekyll / プラグインのバージョンが互換性あるか確認

## ✅ 備考
- `_site` 内に必ず `index.html` が生成されることが最重要
- アーティファクト名の衝突は `409 Conflict` エラーの主要原因
- SWA と Pages を同時運用する場合は、サブドメインを分けると管理が楽
