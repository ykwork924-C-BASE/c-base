/* =====================================================
   C-BASE script.js
   ===================================================== */

// ===== ナビゲーション トグル =====
const navToggle = document.getElementById('navToggle');
const globalNav = document.getElementById('globalNav');

navToggle.addEventListener('click', () => {
  globalNav.classList.toggle('open');
});

// ナビリンクをクリックしたらメニューを閉じる
globalNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    globalNav.classList.remove('open');
  });
});

// ===== ヘッダー スクロール =====
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.style.background = 'rgba(13,18,24,0.98)';
  } else {
    header.style.background = 'rgba(13,18,24,0.92)';
  }
}, { passive: true });

// ===== フローティング CTA =====
const floatingCta = document.getElementById('floatingCta');
const hero = document.getElementById('hero');

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

heroObserver.observe(hero);

// ===== スムーズスクロール（iOS Safari対応） =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = 60;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== フォーム送信（仮実装） =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Formspree を使う場合は以下のように変更してください：
    // 1. action属性を "https://formspree.io/f/YOUR_FORM_ID" に変更
    // 2. このJSブロックを削除し、標準のフォーム送信に戻す

    // Netlify Forms を使う場合:
    // <form netlify name="contact"> に変更し、このブロックを削除

    // 現在は仮の確認メッセージを表示
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '送信しました ✓';
    btn.style.background = '#2a6a4a';
    btn.style.color = '#fff';
    btn.disabled = true;

    // フォームの上に確認メッセージを表示
    const msg = document.createElement('div');
    msg.style.cssText = `
      background: rgba(42,106,74,0.15);
      border: 1px solid rgba(42,106,74,0.3);
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      margin-bottom: 1.5rem;
      color: rgba(255,255,255,0.8);
      font-size: 0.9rem;
      line-height: 1.7;
    `;
    msg.innerHTML = '✓ お問い合わせを受け付けました。<br/>通常1〜3営業日以内にご連絡します。<br/>ありがとうございました！';
    contactForm.insertBefore(msg, contactForm.firstChild);
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ===== スクロール アニメーション =====
const animatables = document.querySelectorAll('.tour-card, .feature-item, .safety-block, .group-card, .faq-item, .property-card');
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (i % 4) * 80);
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatables.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  animateObserver.observe(el);
});

/*
 =====================================================
 LINE 予約ボタン追加方法：
 =====================================================
 1. LINE公式アカウントの「友だち追加URL」または「LINE予約」URLを取得
 2. index.html の <!-- LINE予約ボタン --> コメントを解除し、
    href="https://line.me/R/ti/p/@XXXXXXXX" を実際のURLに変更

 =====================================================
 Googleフォーム連携方法：
 =====================================================
 1. Googleフォームでフォームを作成
 2. 「送信」→「<>」でHTMLを取得（埋め込みコード）
 3. index.html の <!-- Googleフォーム埋め込み --> コメントを解除
 4. iframeのsrcを実際のGoogleフォームURLに変更
 5. 不要になった <form id="contactForm"> ブロックを削除

 =====================================================
 Formspree 設定方法：
 =====================================================
 1. https://formspree.io でアカウント作成
 2. フォームを作成してIDを取得（例: xyz12345）
 3. index.html の <form> の action を
    "https://formspree.io/f/xyz12345" に変更
 4. method="POST" のまま
 5. このJSファイルのフォーム送信ブロックを削除
    （Formspreeが自動でサンクスページにリダイレクト）

 =====================================================
 Netlify Forms 設定方法：
 =====================================================
 1. <form id="contactForm"> を
    <form id="contactForm" netlify name="contact"> に変更
 2. Netlifyにデプロイするだけで自動認識される
 3. Netlifyダッシュボードの「Forms」で送信内容を確認可能

 =====================================================
 公開方法の候補：
 =====================================================
 A) Netlify（おすすめ）:
    - https://app.netlify.com にログイン
    - フォルダごとドラッグ＆ドロップで即公開
    - 独自ドメインの設定が簡単
    - Netlify Formsが使えてフォーム連携が楽

 B) Vercel:
    - https://vercel.com にログイン
    - GitHubリポジトリと連携して自動デプロイ
    - 高速なCDN

 C) GitHub Pages:
    - GitHubリポジトリを作成してファイルをpush
    - Settings → Pages → Source を設定するだけ
    - 独自ドメインも設定可能
    - 無料

 D) レンタルサーバー（ロリポップ、さくら など）:
    - FTPでファイルをアップロード
    - 既存のサーバー契約があれば追加費用不要

 =====================================================
 今後追加するとよいページ案：
 =====================================================
 - /experience/   体験・ワークショップ一覧（収穫体験、レモン摘み など）
 - /stay/         宿泊情報（Villa Limone・HOTEL Narumi・C-BASE詳細）
 - /farm/         畑・農業体験（レモン、ホップ、野菜）
 - /shop/         島の物産・お土産（レモン加工品 など）
 - /blog/         島の今・ガイドの目線（SEO強化にも）
 - /access/       伊豆大島へのアクセス・島内の移動方法
 - /map/          スポットマップ

 =====================================================
 SEO 改善案：
 =====================================================
 1. Google Search Console への登録
 2. Googleビジネスプロフィールの作成・最適化
 3. ブログ記事の定期投稿（三原山、裏砂漠の情報 など）
 4. Airbnb体験ページとの相互リンク
 5. 伊豆大島観光協会等の地域サイトへの掲載依頼
 6. 施設名（Villa Limone、HOTEL Narumi）での検索対策
 7. 画像のalt属性設定（実画像差し替え時に必ず設定）
 8. ページ読み込み速度の最適化（画像の圧縮・WebP化）
 =====================================================
*/
