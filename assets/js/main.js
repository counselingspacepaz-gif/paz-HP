// JekyllテンプレートのHTMLではなく、純粋なJavaScriptコードを記述します。// Uncaught SyntaxErrorを防ぐため、ファイルの先頭は必ずJavaScriptである必要があります。document.addEventListener('DOMContentLoaded', () => {// 1. スキップリンクのアクセシビリティ対応 (キーボード操作)const skipLink = document.querySelector('.skip-link');if (skipLink) {skipLink.addEventListener('click', (e) => {e.preventDefault();const targetId = skipLink.getAttribute('href').substring(1);const targetElement = document.getElementById(targetId);if (targetElement) {targetElement.setAttribute('tabindex', '-1');targetElement.focus();targetElement.removeAttribute('tabindex');}});}// 2. モバイルメニューのトグル機能
const menuToggle = document.getElementById('menu-toggle');
const mainMenu = document.getElementById('main-menu');
const siteHeader = document.querySelector('.site-header');

if (menuToggle && mainMenu) {
    
    // メニュー開閉関数
    const closeMenu = (returnFocus = true) => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainMenu.classList.remove('is-open');
        siteHeader.classList.remove('menu-active');
        if (returnFocus) {
            menuToggle.focus(); // フォーカスをトグルボタンに戻す (A11y向上)
        }
    };

    const openMenu = () => {
        menuToggle.setAttribute('aria-expanded', 'true');
        mainMenu.classList.add('is-open');
        siteHeader.classList.add('menu-active');
    };

    // トグルボタンのクリックイベント
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        if (isExpanded) {
            closeMenu(false); // クリックでのクローズ時はフォーカス移動なし
        } else {
            openMenu();
        }
    });

    // 3. メニュー外をクリックで閉じる
    document.addEventListener('click', (e) => {
        if (mainMenu.classList.contains('is-open') && 
            !mainMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            closeMenu();
        }
    });

    // 4. Escキーで閉じる処理を追加 (UX/A11y向上)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });
}
});