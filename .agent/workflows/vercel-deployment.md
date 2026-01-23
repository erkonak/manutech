---
description: Vercel'e deployment ve domain bağlama
---

# 🚀 Vercel Deployment ve Domain Bağlama Rehberi

## Adım 1: GitHub Repository Oluşturma ve Projeyi Yükleme

### 1.1 GitHub'da yeni repository oluşturun:
- https://github.com/new adresine gidin
- Repository adı: `manutech` (veya istediğiniz bir isim)
- Public veya Private seçin
- **ÖNEMLİ:** "Add README" veya ".gitignore" seçeneklerini işaretlemeyin (proje zaten bunlara sahip)
- "Create repository" butonuna tıklayın

### 1.2 Projeyi GitHub'a yükleyin:

```bash
cd c:\xampp\htdocs\erkonak.manutech
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/manutech.git
git push -u origin main
```

**NOT:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

---

## Adım 2: Vercel'e Kaydolma ve Proje Import Etme

### 2.1 Vercel'e kaydolun:
- https://vercel.com adresine gidin
- "Sign Up" butonuna tıklayın
- "Continue with GitHub" seçeneğini seçin
- GitHub hesabınızla giriş yapın ve Vercel'e izin verin

### 2.2 Yeni proje oluşturun:
- Vercel dashboard'da "Add New..." → "Project" seçeneğine tıklayın
- GitHub repository'leriniz listelenecek
- `manutech` repository'nizi bulun ve "Import" butonuna tıklayın

### 2.3 Proje ayarlarını yapılandırın:
- **Framework Preset:** Next.js (otomatik algılanır)
- **Root Directory:** `./` (varsayılan)
- **Build Command:** `next build` (varsayılan)
- **Output Directory:** `.next` (varsayılan)
- **Install Command:** `npm install` (varsayılan)

### 2.4 Environment Variables (Opsiyonel):
Eğer projenizde environment variable'lar varsa (örn: API URL'leri):
- "Environment Variables" bölümünü açın
- Gerekli değişkenleri ekleyin (örn: `NEXT_PUBLIC_API_URL=https://admin.manutechsolutions.com/api`)

### 2.5 Deploy edin:
- "Deploy" butonuna tıklayın
- Vercel projenizi build edecek ve deploy edecek (2-3 dakika sürer)
- Deploy tamamlandığında size bir URL verilecek (örn: `manutech-xyz.vercel.app`)

---

## Adım 3: Kendi Domain'inizi Bağlama

### 3.1 Vercel'de domain ekleme:
- Vercel dashboard'da projenize gidin
- "Settings" → "Domains" sekmesine tıklayın
- "Add" butonuna tıklayın
- Domain adınızı girin (örn: `manutech.com` veya `www.manutech.com`)
- "Add" butonuna tıklayın

### 3.2 DNS ayarlarını yapın:

Vercel size 2 seçenek sunacak:

#### **Seçenek A: Nameserver Değiştirme (ÖNERİLEN)**
Bu yöntemde domain'inizin nameserver'larını Vercel'in nameserver'larına yönlendirirsiniz:

1. Domain sağlayıcınızın (GoDaddy, Namecheap, vb.) kontrol paneline gidin
2. Domain yönetimi → Nameservers bölümüne gidin
3. Mevcut nameserver'ları silin
4. Vercel'in verdiği nameserver'ları ekleyin:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
5. Değişiklikleri kaydedin
6. DNS propagation 24-48 saat sürebilir (genellikle 1-2 saat içinde tamamlanır)

#### **Seçenek B: A Record ve CNAME Ekleme**
Bu yöntemde mevcut DNS sağlayıcınızı kullanmaya devam edersiniz:

1. Domain sağlayıcınızın DNS yönetim paneline gidin
2. Aşağıdaki kayıtları ekleyin:

**Root domain için (örn: manutech.com):**
```
Type: A
Name: @ (veya boş)
Value: 76.76.21.21
TTL: 3600
```

**www subdomain için (örn: www.manutech.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

3. Değişiklikleri kaydedin
4. DNS propagation 1-24 saat sürebilir

### 3.3 SSL Sertifikası:
- Vercel otomatik olarak Let's Encrypt SSL sertifikası oluşturacak
- DNS ayarları tamamlandıktan sonra 5-10 dakika içinde SSL aktif olur
- Siteniz otomatik olarak HTTPS üzerinden erişilebilir olacak

---

## Adım 4: Deployment Doğrulama

### 4.1 Sitenizi test edin:
- Domain'inizi tarayıcıda açın (örn: https://manutech.com)
- Tüm sayfaların düzgün yüklendiğini kontrol edin
- API bağlantılarının çalıştığını doğrulayın
- Mobil görünümü test edin

### 4.2 Performans kontrolü:
- https://pagespeed.web.dev adresine gidin
- Domain'inizi girin ve analiz edin
- Vercel'in CDN'i sayesinde yüksek performans skorları almalısınız

---

## Adım 5: Otomatik Deployment Kurulumu

Artık her `git push` yaptığınızda Vercel otomatik olarak projenizi deploy edecek:

```bash
# Değişiklik yapın
# Dosyaları commit edin
git add .
git commit -m "Yeni özellik eklendi"
git push

# Vercel otomatik olarak build ve deploy edecek
```

### Preview Deployments:
- Her branch için otomatik preview URL'leri oluşturulur
- Pull request'ler için otomatik deployment yapılır
- Production branch (main) her zaman ana domain'e deploy edilir

---

## 🎯 Önemli Notlar

1. **API URL'leri:** Backend API'niz hala `https://admin.manutechsolutions.com/api` adresinde çalışmaya devam edecek
2. **CORS Ayarları:** Laravel backend'inizde Vercel domain'inizi CORS whitelist'e eklemeyi unutmayın
3. **Environment Variables:** Hassas bilgileri (API keys, vb.) Vercel environment variables'a ekleyin
4. **Build Time:** Her deployment 2-3 dakika sürer
5. **Ücretsiz Limit:** Vercel Free tier aylık 100GB bandwidth ve sınırsız deployment sunar

---

## 🔧 Sorun Giderme

### Domain bağlanmıyor:
- DNS propagation'ı bekleyin (24-48 saat)
- DNS ayarlarını kontrol edin: `nslookup manutech.com`
- Vercel'de domain durumunu kontrol edin

### Build hatası alıyorum:
- Vercel deployment logs'ları kontrol edin
- Local'de `npm run build` çalıştırıp hata olup olmadığını kontrol edin
- Environment variables'ları kontrol edin

### API çalışmıyor:
- Laravel backend'de CORS ayarlarını kontrol edin
- API URL'lerinin doğru olduğundan emin olun
- Browser console'da network hatalarını kontrol edin

---

## 📞 Yardım

Herhangi bir adımda takılırsanız:
1. Vercel documentation: https://vercel.com/docs
2. Vercel support: https://vercel.com/support
3. Community forum: https://github.com/vercel/vercel/discussions
