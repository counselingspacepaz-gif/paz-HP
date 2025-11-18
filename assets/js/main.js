// main.js
// 純粋なJavaScript。HTMLやLiquidは混ぜないこと。
// UTF-8（BOMなし）で保存しておこう。

document.addEventListener('DOMContentLoaded', () => {
  // 1. スキップリンクのアクセシビリティ対応（キーボード操作）
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (skipLink.getAttribute('href') || '').replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.setAttribute('tabindex', '-1'); // 一時的にフォーカス可能にする
        targetElement.focus();                         // フォーカス移動
        targetElement.removeAttribute('tabindex');     // 後始末
      }
    });
  }

  // 2. モバイルメニューのトグル機能
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu   = document.getElementById('main-menu');
  const siteHeader = document.querySelector('.site-header');

  if (menuToggle && mainMenu && siteHeader) {
    // 初期値の安全化（HTML側で aria-expanded="false" を推奨）
    if (!menuToggle.getAttribute('aria-expanded')) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    const openMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'true');
      mainMenu.classList.add('is-open');
      siteHeader.classList.add('menu-active');
    };

    const closeMenu = (returnFocus = true) => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainMenu.classList.remove('is-open');
      siteHeader.classList.remove('menu-active');
      if (returnFocus) menuToggle.focus(); // フォーカスをトグルに戻す
    };

    // トグルボタン：クリックで開閉
    menuToggle.addEventListener('click', () => {
      const isExpanded = (menuToggle.getAttribute('aria-expanded') || 'false') === 'true';
      if (isExpanded) {
        closeMenu(false); // クリックで閉じる場合はフォーカス移動なし
      } else {
        openMenu();
      }
    });

    // 3. メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
      if (
        mainMenu.classList.contains('is-open') &&
        !mainMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // 4. Escキーで閉じる（UX/A11y向上）
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }
});