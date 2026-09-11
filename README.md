# UFFF — GitHub Pages site paketi

Premium koyu tema, lime/lila renkler ve uygulamanın gerçek ekranlarıyla hazırlanmış tanıtım, destek ve gizlilik sayfaları. Türkçe, İngilizce ve Almanca toplam 9 sayfa. Mobil ve masaüstü düzenler; JavaScript kapalıyken de çalışan dil seçimi ve sık sorulan sorular.

Bu klasör bağımsız bir web deposu olarak hazırlanmıştır. **GitHub deposunun köküne bu klasörün içindekileri koy.** Üstteki native UFFF proje klasörünü veya telefon kayıtlarını web deposuna ekleme. Yayın iş akışı sadece `public/` klasörünü barındırır.

## Push ve yayın

1. Bu klasörün içeriğini web için kullanacağın GitHub deposuna kopyala. Gizli `.github/` klasörü de dahil olmalı. ZIP paketinde bu klasör bulunur.
2. GitHub deposunda **Settings → Pages → Build and deployment → Source → GitHub Actions** seç.
3. Dosyaları `main` dalına push et. **Actions → Publish UFFF website** iş akışı sayfaları üretir, denetler ve yayımlar. Dosyalar zaten push edilmişse aynı iş akışında **Run workflow** kullanabilirsin.
4. Yeşil tamamlandıktan sonra **Settings → Pages** bölümündeki gerçek adresi aç. Tanıtım, destek ve gizlilik bağlantılarını kontrol edip bu üç URL’yi paylaş.

GitHub üzerinde bu paket için push veya yayın henüz yapılmadı. Dalın adı `main` değilse `.github/workflows/pages.yml` içindeki `branches` değerini kendi dalınla değiştir.

## App Store Connect alanları

GitHub Pages’in verdiği ana adresi `SITE/` olarak düşün:

| Dil | Marketing URL | Support URL | Privacy Policy URL |
|---|---|---|---|
| Türkçe | `SITE/` | `SITE/support/` | `SITE/privacy/` |
| English | `SITE/en/` | `SITE/en/support/` | `SITE/en/privacy/` |
| Deutsch | `SITE/de/` | `SITE/de/support/` | `SITE/de/privacy/` |

Örneğin `aozkul/UFFF` deposunu proje sitesi olarak yayımlarsan beklenen ana adres `https://aozkul.github.io/UFFF/` olur. Bu yalnızca adres örneğidir; canlı yayın doğrulaması yapılmadı. App Store Connect’e ve iOS uygulama ayarlarına gerçek, açılan URL’ler girilmeli. Bu paket iOS ayarlarındaki eksik URL’leri otomatik değiştirmez.

## Yerel önizleme ve kontrol

Node.js 22 veya üzeri yeterli. `npm install` gerekmiyor; bağımlılık yok.

```bash
node scripts/build.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

Tarayıcıda `http://127.0.0.1:8767/UFFF/` aç. Sunucu hem kök adresi hem `/UFFF/` proje yolunu destekler. Durdurmak için Ctrl+C. Alternatif komutlar: `npm run build`, `npm run check`, `npm run dev`.

## Düzenleme

- Metinler: `scripts/build.mjs` içindeki `copy.tr`, `copy.en`, `copy.de`.
- Renkler ve yerleşim: `public/assets/style.css`.
- Gerçek uygulama ekranları: `public/assets/film-*.png`, `characters-*.png`.
- İletişim: `scripts/build.mjs` içindeki `email` değişkeni.
- Politika tarihi her üç dilde içerikte bulunur; veri işleme şekli değiştiğinde metin ve tarihi birlikte güncelle.
- App Store sayfası **gerçekten açıldıktan sonra** `appStoreAvailable` değerini `true` yap. Ana düğme mevcut Apple ID’sine bağlanır ve “Yakında” bilgisi kaldırılır.
- Metin değişikliklerinden sonra `node scripts/build.mjs` ve `node scripts/check.mjs` çalıştır. Oluşan HTML dosyalarını da commit’e ekle.

Gizlilik metni uygulamanın mevcut yerel veri akışını, isteğe bağlı paylaşımı, Apple satın almasını, destek e-postalarını ve GitHub Pages barındırmasını anlatır. Satıcı adı ve e-posta mevcut sahip bilgileridir. İşletmene ait ek yasal kimlik/adres bilgileri gerekiyorsa bunları sahibi olarak tamamlamalısın; paket bilinmeyen adres veya saklama süreleri uydurmaz.

## Dosyalar ve yayın sınırı

`public/` içindeki sayfalar, CSS ve yedi PNG görsel yayınlanır. Kayıt, ses dosyası, kullanıcı kütüphanesi, native uygulama kaynakları ve test raporları pakete dahil değildir. Site çerez, analitik, reklam, harici yazı tipi veya uzaktaki JavaScript kullanmaz. GitHub’ın kendi barındırma kayıtları gizlilik sayfasında açıklanmıştır.

## Kaynaklar

- [GitHub Pages özel iş akışları](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages yayın kaynağını seçme](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages ve güvenlik amaçlı IP kayıtları](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub Gizlilik Bildirimi](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [Avrupa Komisyonu — bireylerin veri koruma hakları](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en)

İş akışı sürümleri ve GitHub Pages davranışı 11 Eylül 2026 tarihinde resmi kaynaklardan kontrol edildi. Yerel testler, GitHub Actions’ın hesabındaki gerçek yayın koşusunun yerine geçmez.
