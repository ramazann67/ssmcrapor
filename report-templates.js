/* Sandy Shores Rapor Merkezi — report schemas + document renderer.
   Everything here mirrors the hand-built letterhead/seal/table system used
   for the real Sandy Shores PDFs: table-based layout (no flex) so a printed
   PDF's text layer never reorders, GİZLİ watermark, navy/orange/red brand. */

const RS = (() => {
  let sealSeq = 0;

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function nl2p(s) {
    return esc(s).split(/\n+/).filter(Boolean).map((p) => `<p class="doc-p">${p}</p>`).join('');
  }

  function todayTR() {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  }

  function pad(n, len) { return String(n).padStart(len, '0'); }

  function makeRaporNo(prefix) {
    const d = new Date();
    const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1, 2)}${pad(d.getDate(), 2)}`;
    return `SSMC-${prefix}-${stamp}-${pad(Math.floor(Math.random() * 900) + 100, 3)}`;
  }

  function makeDogrulamaKodu(suffix) {
    return `SSMC-${pad(Math.floor(Math.random() * 9000) + 1000, 4)}-${suffix}`;
  }

  function svgLogo() {
    return `<svg class="doc-logo" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sandy Shores Medical Center amblemi">
      <circle cx="220" cy="220" r="205" fill="#ffffff" stroke="#e7ecf0" stroke-width="2"/>
      <rect x="185" y="90" width="70" height="200" rx="8" fill="#ffffff" stroke="#e8791e" stroke-width="9"/>
      <rect x="115" y="160" width="210" height="70" rx="8" fill="#ffffff" stroke="#c22a1f" stroke-width="9"/>
      <path d="M 90 250 Q 150 210 210 245 T 330 240" fill="none" stroke="#0d5a96" stroke-width="14" stroke-linecap="round"/>
      <path d="M 100 270 Q 160 235 215 262 T 320 258" fill="none" stroke="#39b3c9" stroke-width="9" stroke-linecap="round"/>
      <path d="M 120 288 Q 175 260 225 280 T 310 278" fill="none" stroke="#7fd0de" stroke-width="6" stroke-linecap="round"/>
      <path d="M270 130 q10 -14 24 -10 q-6 12 -20 16 q14 0 20 10 q-16 4 -24 -6 z" fill="#39b3c9"/>
      <path d="M300 118 q9 -13 22 -9 q-6 11 -18 14 q13 0 18 9 q-14 4 -22 -5 z" fill="#7fd0de"/>
    </svg>`;
  }

  function svgSeal() {
    const id = `seal${++sealSeq}`;
    return `<svg class="doc-seal" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Resmi tıbbi mühür">
      <defs>
        <path id="${id}a" d="M 40 150 A 110 110 0 0 1 260 150" fill="none"/>
        <path id="${id}b" d="M 45 165 A 105 105 0 0 0 255 165" fill="none"/>
        <path id="${id}c" d="M 65 132 A 88 88 0 0 1 235 132" fill="none"/>
      </defs>
      <circle cx="150" cy="150" r="145" fill="#16305a"/>
      <circle cx="150" cy="150" r="122" fill="#fdf6ea"/>
      <circle cx="150" cy="150" r="145" fill="none" stroke="#fdf6ea" stroke-width="2"/>
      <circle cx="150" cy="150" r="122" fill="none" stroke="#16305a" stroke-width="2"/>
      <text font-family="Georgia, 'Times New Roman', serif" font-size="15" font-weight="700" fill="#fdf6ea" letter-spacing="1.4">
        <textPath href="#${id}a" startOffset="50%" text-anchor="middle">SANDY SHORES MEDICAL CENTER</textPath>
      </text>
      <text font-family="Georgia, 'Times New Roman', serif" font-size="11.5" font-weight="700" fill="#fdf6ea" letter-spacing="1.2">
        <textPath href="#${id}b" startOffset="50%" text-anchor="middle">BLAINE COUNTY, SAN ANDREAS</textPath>
      </text>
      <text font-family="Georgia, 'Times New Roman', serif" font-size="10.5" font-weight="700" fill="#16305a" letter-spacing="1.6">
        <textPath href="#${id}c" startOffset="50%" text-anchor="middle">OFFICIAL MEDICAL SEAL</textPath>
      </text>
      <g fill="#16305a">
        <rect x="58" y="146" width="18" height="4"/><rect x="65" y="139" width="4" height="18"/>
        <rect x="224" y="146" width="18" height="4"/><rect x="231" y="139" width="4" height="18"/>
      </g>
      <g fill="#16305a">
        <path d="M150 118 C 128 98, 96 98, 82 111 C 103 118, 122 122, 150 128 Z"/>
        <path d="M150 118 C 172 98, 204 98, 218 111 C 197 118, 178 122, 150 128 Z"/>
      </g>
      <g stroke="#16305a" fill="none" stroke-width="3.4" stroke-linecap="round">
        <line x1="150" y1="122" x2="150" y2="203"/>
        <path d="M150 128 C 118 140, 182 152, 150 162 C 118 172, 182 184, 150 194"/>
        <path d="M150 128 C 182 140, 118 152, 150 162 C 182 172, 118 184, 150 194"/>
      </g>
      <circle cx="150" cy="118" r="6.5" fill="#16305a"/>
      <text x="150" y="224" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="17" font-weight="800" fill="#16305a" letter-spacing="2">AUTHORIZED</text>
      <text x="150" y="240" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="10" font-weight="700" fill="#16305a" letter-spacing="1.5">EST. 1957</text>
    </svg>`;
  }

  function watermark(label) {
    const w = esc(label || 'GİZLİ');
    return `<div class="doc-watermark" aria-hidden="true"><span>${w}&nbsp;&nbsp;&nbsp;${w}&nbsp;&nbsp;&nbsp;${w}</span></div>`;
  }

  function letterhead({ sub, addr, tag }) {
    const t = esc(tag || 'GİZLİ');
    return `<table class="doc-letterhead"><tr>
      <td class="doc-logo-cell">${svgLogo()}</td>
      <td>
        <div class="doc-org-name">SANDY SHORES MEDICAL CENTER &amp; URGENT CARE</div>
        <div class="doc-org-sub">${esc(sub)}</div>
        <div class="doc-org-addr">${esc(addr)}</div>
      </td>
      <td class="doc-confid-cell">
        <span class="doc-confid-tag">${t}</span>
        <div class="doc-confid-sub">Hasta Mahremiyeti Kapsamında</div>
      </td>
    </tr></table>`;
  }

  function metaTable(pairs) {
    const rows = [];
    for (let i = 0; i < pairs.length; i += 2) {
      const [l1, v1] = pairs[i];
      const [l2, v2] = pairs[i + 1] || ['', ''];
      rows.push(`<tr><td class="doc-meta-label">${esc(l1)}</td><td>${esc(v1)}</td><td class="doc-meta-label">${esc(l2)}</td><td>${esc(v2)}</td></tr>`);
    }
    return `<table class="doc-meta">${rows.join('')}</table>`;
  }

  function section(num, title, inner) {
    return `<section class="doc-section"><h2>${num}. ${esc(title)}</h2>${inner}</section>`;
  }

  /* Body sections are declared per type as [id, defaultTitle, innerHtml]
     triples (in default order) and passed through here, which applies the
     user's saved reorder (_sectionOrder), hides (_hiddenSections) and
     rename overrides (_sectionTitles), then renumbers what's left 1..N so
     the printed report never shows a gap where a hidden section was. */
  function arrangeSections(entries, d) {
    const order = d._sectionOrder;
    const hidden = new Set(d._hiddenSections || []);
    const titles = d._sectionTitles || {};
    let arranged = entries;
    if (order && order.length) {
      const map = new Map(entries.map((e) => [e[0], e]));
      const ordered = order.filter((id) => map.has(id)).map((id) => map.get(id));
      const usedIds = new Set(order);
      arranged = [...ordered, ...entries.filter((e) => !usedIds.has(e[0]))];
    }
    const visible = arranged.filter(([id]) => !hidden.has(id));
    return {
      html: visible.map(([id, title, inner], i) => section(i + 1, titles[id] || title, inner)).join(''),
      count: visible.length,
    };
  }

  function kvTable(rows) {
    return `<table class="doc-kv">${rows.map(([k, v]) => `<tr><td class="doc-kv-k">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>`;
  }

  function findTable(rows) {
    return `<table class="doc-find">${rows.map(([k, v]) => `<tr><td class="doc-find-k">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>`;
  }

  function dataTable(headers, rows) {
    return `<table class="doc-data">
      <tr>${headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>
      ${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}
    </table>`;
  }

  function bulletList(items) {
    return `<ul class="doc-list">${items.filter(Boolean).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  }

  function box(label, text, tone) {
    return `<div class="doc-box doc-box--${tone}">
      <div class="doc-box-label">${esc(label)}</div>
      <div class="doc-box-text">${esc(text)}</div>
    </div>`;
  }

  function boxList(label, items, tone) {
    const rows = (items || []).filter(Boolean);
    const body = rows.length > 1
      ? `<ul class="doc-list doc-list--boxed">${rows.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
      : `<div class="doc-box-text">${esc(rows[0] || '')}</div>`;
    return `<div class="doc-box doc-box--${tone}">
      <div class="doc-box-label">${esc(label)}</div>
      ${body}
    </div>`;
  }

  function sigTable(signers) {
    const w = (100 / signers.length).toFixed(4);
    return `<table class="doc-sig"><tr>${signers.map((s) => `
      <td style="width:${w}%">
        ${s.sealed ? svgSeal() : ''}
        <div class="doc-signature">${esc(s.name)}</div>
        <div class="doc-sig-line">${esc(s.name)}</div>
        <div class="doc-sig-role">${esc(s.role)} — Sandy Shores Medical Center</div>
      </td>`).join('')}</tr></table>`;
  }

  function stampNote(text) {
    return `<div class="doc-stampnote">${esc(text)}</div>`;
  }

  function customSections(list, startNum) {
    return (list || []).map((cs, i) => {
      let inner;
      if (cs.type === 'list') {
        inner = bulletList(cs.items || []);
      } else if (cs.type === 'table') {
        const cols = (cs.cols || []).filter((c) => c !== null && c !== undefined);
        inner = cols.length ? dataTable(cols, cs.rows || []) : '<div class="doc-body">(Tablo için önce sütun ekleyin.)</div>';
      } else if (cs.type === 'box') {
        const tone = ['info', 'success', 'danger'].includes(cs.boxTone) ? cs.boxTone : 'info';
        const subLines = (cs.items || []).filter(Boolean).map((s) => `<div class="doc-box-sub">${esc(s)}</div>`).join('');
        inner = `<div class="doc-box doc-box--${tone}" style="text-align:center">
          ${cs.boxLabel ? `<div class="doc-box-label">${esc(cs.boxLabel)}</div>` : ''}
          <div class="doc-verdict">${esc(cs.text || '')}</div>
          ${subLines}
        </div>`;
      } else {
        inner = `<div class="doc-body">${nl2p(cs.text || '')}</div>`;
      }
      const html = section(startNum + i, cs.title || 'Ek Bölüm', inner);
      return cs.pageBreak ? `<div style="page-break-before:always">${html}</div>` : html;
    }).join('');
  }

  const ADDR = 'Sandy Shores, Blaine County · Vaka Hattı: 311-EMS · Belge Sınıfı: Hasta Sağlık Kaydı';

  /* ---------------------------------------------------------------- *
   * Report type registry
   * ---------------------------------------------------------------- */

  const TYPES = {};

  /* ---- 1. Sağlık ve Tedavi Raporu ---------------------------------- */
  TYPES.health = {
    id: 'health',
    label: 'Sağlık ve Tedavi Raporu',
    short: 'Sağlık Raporu',
    raporPrefix: 'SR',
    icon: 'M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z M9 12l2 2 4-4',
    defaultData() {
      return {
        adSoyad: 'Kitana Vesper', kimlikNo: 'ZLU52222', cinsiyet: 'Kadın', dogumTarihi: '12.07.2001',
        kabulSekli: 'Yürüyerek, kendi imkanlarıyla acil servise başvurmuştur', kabulTarihi: todayTR(),
        beyan: 'Hasta beyanına göre, ani ve ters bir hareket sonrasında omuz ekleminde akut ağrı ve harekette belirgin artış gösteren sızı geliştiği, kolunu etkin şekilde kullanamadığı ifade edilmiştir. Olayın gerçekleşme şekline dair tanık bulunmamaktadır; aşağıda yer alan bilgiler yalnızca hastanın kendi beyanına dayanmakta olup bağımsız olarak doğrulanmamıştır.',
        muayene: [
          ['İnspeksiyon', 'Omuz çevresinde belirgin deformite izlenmemiştir; hafif düzeyde yumuşak doku ödemi mevcuttur'],
          ['Palpasyon', 'Omuz eklemi ve akromiyoklavikuler bölgede belirgin hassasiyet (+)'],
          ['Hareket Açıklığı (ROM)', 'Aktif abdüksiyon ve fleksiyon belirgin şekilde kısıtlı; pasif hareket ağrılı'],
          ['Kas Gücü', 'Omuz abdüksiyonunda kas gücünde belirgin azalma (4/5)'],
          ['Nörovasküler Muayene', 'Distal nabızlar palpabl, kapiller dolum normal; motor ve duyusal defisit saptanmamıştır'],
          ['Ağrı Skalası (VAS)', '7/10 (hareketle artan, istirahatte kısmi gerileyen)'],
        ],
        goruntuleme: 'Direkt grafi incelemesinde kemik yapılarda akut fraktür veya dislokasyon bulgusuna rastlanmamıştır. Yumuşak doku değerlendirmesinde ödem izlenmiş olup ilgili bölgede zorlanma ile uyumlu bulgular saptanmıştır.',
        onTani: ['Omuz burkulması / rotator manşet zorlanması (akut kas-iskelet sistemi yaralanması)'],
        tedavi: [
          'Askı bandı (sling) ile eklemin immobilizasyonu sağlanmıştır.',
          'Ağrı kesici ve kas gevşetici tedavi başlanmıştır.',
          'Bölgeye soğuk uygulama (buz) yapılması önerilmiştir.',
          'Fizik tedavi ve rehabilitasyon polikliniğine yönlendirme yapılmıştır.',
          'Ağır kaldırma ve zorlayıcı hareketlerden kaçınması konusunda hasta bilgilendirilmiştir.',
        ],
        prognoz: 'Hastanın genel durumu stabildir; şuur açık, koopere ve oryantedir. Uygulanan immobilizasyon ve analjezik tedavi ile ağrıda kısmi gerileme izlenmiştir. Uygun istirahat ve tedavi ile prognozun olumlu seyretmesi beklenmektedir.',
        takip: 'Hasta, önerilen tedavi ve hareket kısıtlamaları konusunda bilgilendirilerek taburcu edilmiştir. Yaklaşık 1 hafta sonrasında kontrol muayenesi planlanmıştır. Şikayetlerin artması durumunda gecikmeksizin acil servise başvurması önerilmiştir.',
        isGoremezlikGun: 14,
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Acil Servis & Ayakta Tedavi Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const hafta = (Number(d.isGoremezlikGun) / 7);
      const haftaTxt = Number.isInteger(hafta) ? `${hafta} (${numToWordsTR(hafta)}) hafta` : `${(hafta).toFixed(1)} hafta`;
      const { html: sectionsHtml, count } = arrangeSections([
        ['hasta-bilgileri', 'Hasta Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo], ['Cinsiyet', d.cinsiyet],
          ['Doğum Tarihi', d.dogumTarihi], ['Kabul Şekli', d.kabulSekli], ['Kabul Tarihi', d.kabulTarihi],
        ])],
        ['yaralanma-mekanizmasi-hasta-beyani', 'Yaralanma Mekanizması (Hasta Beyanı)', `<div class="doc-body">${nl2p(d.beyan)}</div>`],
        ['muayene-bulgulari', 'Muayene Bulguları', findTable(d.muayene)],
        ['goruntuleme-ve-tanisal-degerlendirme', 'Görüntüleme ve Tanısal Değerlendirme', `<div class="doc-body">${nl2p(d.goruntuleme)}</div>`],
        ['on-tani', 'Ön Tanı', boxList('KLİNİK ÖN TANI', d.onTani, 'info')],
        ['uygulanan-tedavi-ve-oneriler', 'Uygulanan Tedavi ve Öneriler', bulletList(d.tedavi)],
        ['mevcut-durum-ve-prognoz', 'Mevcut Durum ve Prognoz', `<div class="doc-body">${nl2p(d.prognoz)}</div>`],
        ['taburculuk-ve-takip-plani', 'Taburculuk ve Takip Planı', `<div class="doc-body">${nl2p(d.takip)}</div>`],
        ['is-goremezlik-suresi', 'İş Göremezlik Süresi', `<div class="doc-box doc-box--danger" style="text-align:center">
            <div class="doc-box-label">RAPORLANAN İSTİRAHAT SÜRESİ</div>
            <div class="doc-iw-text">${d.isGoremezlikGun} (${numToWordsTR(d.isGoremezlikGun)}) GÜN — ${haftaTxt.toUpperCase()}</div>
            <div class="doc-box-sub">Bu süre boyunca hastanın fiziksel iş görme yeterliliğinin bulunmadığı değerlendirilmiştir.</div>
          </div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">SAĞLIK VE TEDAVİ RAPORU</h1>
          <div class="doc-subtitle">Kas-İskelet Sistemi Yaralanması Değerlendirme ve İş Göremezlik Raporu</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Muayene Eden Hekim', d.muayeneEdenHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol / Muayene Dosya No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.muayeneEdenHekim, role: 'Muayene Eden Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 2. İş Göremezlik Raporu (standalone) ------------------------ */
  TYPES.incapacity = {
    id: 'incapacity',
    label: 'İş Göremezlik Raporu',
    short: 'İş Göremezlik',
    raporPrefix: 'IG',
    icon: 'M4 7h16M4 12h16M4 17h10',
    defaultData() {
      return {
        adSoyad: 'Reggie Clark', kimlikNo: 'MRC48120', cinsiyet: 'Erkek', dogumTarihi: '22.03.1994',
        tani: ['Ateşli silah yaralanmasına bağlı cerrahi girişim sonrası iyileşme dönemi'],
        gerekce: ['Hasta, geçirdiği cerrahi girişim sonrası aktif iyileşme ve rehabilitasyon sürecindedir.', 'Fiziksel efor gerektiren görevleri yerine getirecek klinik yeterliliğe sahip değildir.'],
        gun: 45, baslangicTarihi: todayTR(),
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'İş Göremezlik Değerlendirme Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const bitis = addDaysTR(d.baslangicTarihi, Number(d.gun));
      const { html: sectionsHtml, count } = arrangeSections([
        ['hasta-bilgileri', 'Hasta Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo],
          ['Cinsiyet', d.cinsiyet], ['Doğum Tarihi', d.dogumTarihi],
        ])],
        ['tani', 'Tanı', boxList('KLİNİK TANI', d.tani, 'info')],
        ['gerekce', 'Gerekçe', bulletList(d.gerekce)],
        ['istirahat-suresi', 'İstirahat Süresi', `<div class="doc-box doc-box--danger" style="text-align:center">
            <div class="doc-box-label">RAPORLANAN İSTİRAHAT SÜRESİ</div>
            <div class="doc-iw-text">${d.gun} (${numToWordsTR(d.gun)}) GÜN</div>
            <div class="doc-box-sub">${esc(d.baslangicTarihi)} — ${esc(bitis)} tarihleri arasında geçerlidir.</div>
          </div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">İŞ GÖREMEZLİK RAPORU</h1>
          <div class="doc-subtitle">Geçici İş Görme Yetersizliği Değerlendirme Belgesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Muayene Eden Hekim', d.muayeneEdenHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.muayeneEdenHekim, role: 'Muayene Eden Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 3. Otopsi / Adli Ölüm Raporu -------------------------------- */
  TYPES.autopsy = {
    id: 'autopsy',
    label: 'Otopsi / Adli Ölüm Raporu',
    short: 'Otopsi Raporu',
    raporPrefix: 'ADR',
    icon: 'M12 3v4M8 7h8l2 5-1 9H7L6 12l2-5z',
    defaultData() {
      return {
        adSoyad: 'Lindis Mottram', unvan: 'Federal Savcı', kimlikNo: '', cinsiyet: 'Kadın',
        vakaSinifi: 'Adli Vaka — Ateşli Silah Yaralanması',
        kabulDurumu: 'Ateşli silah yaralanması nedeniyle kritik travma vakası olarak acil servise kabul edilmiştir',
        klinikBulgu: 'Olgu, ateşli silah yaralanması nedeniyle hemodinamik olarak kritik durumda acil servise kabul edilmiştir. Yapılan ilk travma değerlendirmesinde servikal bölgede, karotis arter komşuluğunda 2 (iki) adet ateşli silah mermi çekirdeğine ait giriş lezyonu; torasik kavitenin alt kesiminde (subkostal bölge) ise çıkış deliği izlenmeyen 3 (üç) adet mermi çekirdeğine ait giriş lezyonu saptanmıştır. Olguda masif hemoraji ve buna bağlı ileri hemodinamik instabilite tespit edilmesi üzerine olgu derhal acil cerrahi girişime alınmıştır.',
        cerrahiBulgular: [
          'Servikal bölgede karotis arter ve çevre yumuşak dokularda ağır travmatik doku hasarı ve aktif arteriyel hemoraji saptanmıştır.',
          'Torasik kavite alt kesiminde tespit edilen mermi çekirdekleri cerrahi girişim sırasında eksplorasyon ile bulunarak çıkarılmış ve balistik inceleme amacıyla ayrı ayrı etiketlenmiştir.',
          'Yaygın internal ve eksternal hemoraji bulguları izlenmiştir.',
          'Cerrahi girişim boyunca masif kan ve kan ürünü transfüzyonu uygulanmıştır.',
          'İleri kardiyak yaşam desteği (İKYD) protokolleri eşliğinde resüsitasyona devam edilmiştir.',
        ],
        yaraTablosu: [
          ['1', 'Boyun, sol lateral (karotis arter komşuluğu)', 'Giriş lezyonu', 'Düzensiz kenarlı, çevresinde ekimoz; komşu vasküler yapıda travmatik hasar'],
          ['2', 'Boyun, sağ lateral (karotis arter komşuluğu)', 'Giriş lezyonu', 'Düzensiz kenarlı, aktif hemoraji odağı; komşu yumuşak dokuda ağır hasar'],
          ['3', 'Torasik kavite, sol subkostal bölge', 'Giriş lezyonu, çıkışsız', 'Mermi çekirdeği cerrahi girişim sırasında çıkarılmıştır'],
        ],
        vitalTablosu: [
          ['Kabul Anı', '84/52 mmHg', '128/dk, zayıf ve filiform', '%89', '12'],
          ['Cerrahi Girişim Sırasında', '68/40 mmHg', '141/dk, filiform', '%81', '8'],
          ['Terminal Dönem', 'Ölçülemez', 'Nabızsız elektriksel aktivite (PEA)', 'Ölçülemez', '3'],
        ],
        labTablosu: [
          ['Hemoglobin', '6.1 g/dL', 'Ciddi anemi, akut masif kan kaybı ile uyumlu'],
          ['Hematokrit', '%18', 'Belirgin düşük, masif hemorajiyle uyumlu'],
          ['Serum Laktat', '9.8 mmol/L', 'Belirgin yüksek, doku hipoperfüzyonunu düşündürmekte'],
        ],
        sonuc: 'Uygulanan tüm cerrahi müdahalelere ve ileri kardiyopulmoner resüsitasyon girişimlerine rağmen olguda spontan dolaşım (ROSC) sağlanamamıştır. Olgu, kardiyorespiratuvar arrest sonucu eksitus olmuştur.',
        olumNedeni: ['Servikal ve torasik bölgeye isabet eden ateşli silah yaralanmasına bağlı masif hemorajik şok ve kardiyorespiratuvar arrest.'],
        olumTarihi: todayTR(), olumSaati: 'Kesin dakika kaydı doğrulanamamıştır; olgu belirtilen tarihte acil serviste kaybedilmiştir',
        adliDelil: [
          'Cerrahi girişimle çıkarılan mermi çekirdekleri ayrı ayrı etiketlenerek balistik inceleme amacıyla muhafaza altına alınmış olup ilgili adli makam/kolluk kuvvetine teslimi için kayıt altına alınmıştır.',
          'Olguya ait giysi ve kişisel eşyalar adli inceleme amacıyla ayrı ayrı paketlenerek muhafaza altına alınmıştır.',
          'Toksikoloji ve adli patoloji incelemesi için kan ve doku numuneleri alınarak saklanmıştır.',
        ],
        doktor1: 'Walantino Vayne', doktor2: 'Denis Walker Vayne', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Adli Vaka & Ölüm Raporlama Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği gizlidir; yalnızca ilgili adli/kolluk makamları ile paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['olguya-ait-kimlik-bilgileri', 'Olguya Ait Kimlik Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Unvan / Görev', d.unvan || 'Belirtilmemiştir'],
          ['Cinsiyet', d.cinsiyet], ['Kabul Durumu', d.kabulDurumu],
        ])],
        ['klinige-kabul-bulgulari', 'Kliniğe Kabul Bulguları', `<div class="doc-body">${nl2p(d.klinikBulgu)}</div>`],
        ['cerrahi-bulgular-ve-girisimler', 'Cerrahi Bulgular ve Girişimler', bulletList(d.cerrahiBulgular)],
        ['yara-lokalizasyon-ve-balistik-bulgular-tablosu', 'Yara Lokalizasyon ve Balistik Bulgular Tablosu', dataTable(['No', 'Lokalizasyon', 'Bulgu Tipi', 'Açıklama'], d.yaraTablosu)],
        ['vital-bulgular-ve-resusitasyon-seyri', 'Vital Bulgular ve Resüsitasyon Seyri', dataTable(['Değerlendirme Anı', 'TA', 'Nabız', 'SpO2', 'GKS'], d.vitalTablosu)],
        ['laboratuvar-bulgulari', 'Laboratuvar Bulguları', dataTable(['Parametre', 'Sonuç', 'Değerlendirme'], d.labTablosu)],
        ['sonuc', 'Sonuç', `<div class="doc-body">${nl2p(d.sonuc)}</div>${boxList('ÖLÜM NEDENİ', d.olumNedeni, 'danger')}${kvTable([['Ölüm Tarihi', d.olumTarihi], ['Ölüm Saati', d.olumSaati]])}
          <div class="doc-legalnote">Bu rapor yalnızca olguya ait tıbbi ve cerrahi bulguları içermektedir. Olayın oluş şekli, tarafların kimliği ve hukuki sorumluluğa ilişkin değerlendirme ilgili kolluk kuvvetleri ve adli makamların yetkisindedir; bu belge herhangi bir kusur veya suç isnadı içermemektedir.</div>`],
        ['adli-delil-ve-numune-kayitlari', 'Adli Delil ve Numune Kayıtları', bulletList(d.adliDelil)],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: 'Sandy Shores, Blaine County · Vaka Hattı: 311-EMS · Belge Sınıfı: Adli Ölüm Kaydı', tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">ADLİ ÖLÜM RAPORU</h1>
          <div class="doc-subtitle">Tıbbi ve Cerrahi Bulgu Raporu</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Vaka Sınıfı', d.vakaSinifi], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.doktor1, role: 'Vakayı Değerlendiren Hekim' },
            { name: d.doktor2, role: 'Vakayı Değerlendiren Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 4. CCW Silah Lisansı Sağlık Raporu --------------------------- */
  TYPES.ccw = {
    id: 'ccw',
    label: 'CCW Silah Lisansı Sağlık Raporu',
    short: 'CCW Lisans Raporu',
    raporPrefix: 'CCW',
    icon: 'M12 2l8 4v5c0 5.5-3.4 9.7-8 11-4.6-1.3-8-5.5-8-11V6l8-4z',
    defaultData() {
      return {
        adSoyad: 'Marco Rogers', kimlikNo: 'OWO31457', cinsiyet: 'Erkek', dogumTarihi: '28.01.2005',
        boy: '186', kilo: '85', kanGrubu: '0 Rh(+)',
        degerlendirme: [
          ['Epilepsi / Bilinç Kaybı Öyküsü', 'Bulunmamaktadır'],
          ['Ruhsal Rahatsızlık Öyküsü', 'Bulunmamaktadır'],
          ['Kendine / Başkasına Zarar Verme Riski', 'Bulunmamaktadır'],
          ['Alkol Kullanımı', 'Sosyal düzeyde, özel günlerle sınırlı; patolojik bir bulgu teşkil etmemektedir'],
          ['Madde Kullanımı', 'Bulunmamaktadır'],
          ['Yargı / Tepki Süresini Etkileyen İlaç Kullanımı', 'Bulunmamaktadır'],
          ['Görme Testi', 'Başarılı'],
          ['İşitme Testi', 'Başarılı'],
          ['El Titremesi (Tremor)', 'Bulunmamaktadır'],
          ['Hafıza / Oryantasyon', 'Kuvvetli, kognitif defisit saptanmamıştır'],
          ['Nörolojik Değerlendirme', 'Refleksler doğal, nörolojik defisit saptanmamıştır'],
          ['Öfke Kontrolü', 'Sağlıklı, patolojik bulguya rastlanmamıştır'],
          ['Tansiyon / Nabız', '118/76 mmHg, Nabız 74/dk — stabil seyretmektedir, patolojik bulguya rastlanmamıştır'],
        ],
        sonucVerdict: 'UYGUNDUR',
        gecerlilikSuresi: '1 (bir) hafta',
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Sağlık Uygunluk & Lisans Muayene Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili lisans/ruhsat makamı ile paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const uygun = d.sonucVerdict === 'UYGUNDUR';
      const { html: sectionsHtml, count } = arrangeSections([
        ['basvuran-kimlik-bilgileri', 'Başvuran Kimlik Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo], ['Cinsiyet', d.cinsiyet],
          ['Doğum Tarihi', d.dogumTarihi], ['Boy', `${d.boy} cm`], ['Kilo', `${d.kilo} kg`],
          ...(d.kanGrubu ? [['Kan Grubu', d.kanGrubu]] : []),
        ])],
        ['tibbi-ve-psikolojik-uygunluk-degerlendirmesi', 'Tıbbi ve Psikolojik Uygunluk Değerlendirmesi', dataTable(['Değerlendirme Kalemi', 'Bulgu'], d.degerlendirme)],
        ['sonuc', 'Sonuç', `<div class="doc-box doc-box--${uygun ? 'success' : 'danger'}" style="text-align:center">
            <div class="doc-verdict">${esc(d.sonucVerdict)}</div>
            <div class="doc-box-sub">Yapılan muayene ve değerlendirmeler sonucunda, yukarıda kimlik bilgileri belirtilen başvuranın CCW (Concealed Carry Weapon) silah taşıma/bulundurma lisansı açısından tıbbi ve psikolojik durumu ${uygun ? 'uygun bulunmuştur' : 'uygun bulunmamıştır'}.</div>
            <div class="doc-box-sub" style="margin-top:6px"><strong>Geçerlilik Süresi:</strong> Bu rapor düzenleme tarihinden itibaren ${esc(d.gecerlilikSuresi)} süreyle geçerlidir.</div>
          </div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">CCW SİLAH LİSANSI — SAĞLIK UYGUNLUK RAPORU</h1>
          <div class="doc-subtitle">Concealed Carry Weapon Başvurusu İçin Tıbbi ve Psikolojik Uygunluk Değerlendirmesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Muayene Eden Hekim', d.muayeneEdenHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol / Muayene Dosya No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.muayeneEdenHekim, role: 'Muayene Eden Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 5. Kimlik Tespiti Raporu ------------------------------------ */
  TYPES.identity = {
    id: 'identity',
    label: 'Kimlik Tespiti Raporu',
    short: 'Kimlik Tespiti',
    raporPrefix: 'KTR',
    icon: 'M3 5h18v14H3z M7 9h4 M7 12.5h7 M7 16h5 M16 9.5h2v3h-2z',
    defaultData() {
      return {
        adSoyad: 'Marcus Doyle', cinsiyet: 'Erkek', tahminiYas: '35-40 (tahmini)', kimlikNo: 'Kimlik üzerinde tespit edilmemiştir',
        tespitYontemi: [
          'Parmak izi karşılaştırması ile kolluk kuvvetleri veri tabanı üzerinden eşleştirme yapılmıştır.',
          'Yakın çevre/aile beyanına dayalı görsel teşhis desteği alınmıştır.',
        ],
        fizikselOzellikler: [
          ['Boy', '181 cm'], ['Kilo', '78 kg'], ['Saç Rengi', 'Kahverengi'], ['Göz Rengi', 'Ela'],
          ['Ayırt Edici İşaretler', 'Sol ön kolda dövme, sağ kaşta eski bir kesi izi'],
        ],
        sonucKarar: 'Doğrulanmıştır',
        sonucAciklama: 'Yukarıda belirtilen tespit yöntemleri neticesinde olgunun kimliği makul tıbbi ve adli kesinlikle belirlenmiştir.',
        guvenilirlikNotu: 'Bu tespit, düzenleme anında mevcut olan bulgulara dayanmaktadır. Kesin ve nihai kimlik teyidi ilgili adli makam ve kolluk kuvvetlerinin resmi kayıtlarına tabidir.',
        yetkiliHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Kimlik Tespit & Adli Kayıt Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği gizlidir; yalnızca ilgili adli/kolluk makamları ile paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['olguya-ait-bilgiler', 'Olguya Ait Bilgiler', kvTable([
          ['Ad Soyad', d.adSoyad], ['Cinsiyet', d.cinsiyet],
          ['Tahmini Yaş', d.tahminiYas], ['Kimlik / Seri Numarası', d.kimlikNo],
        ])],
        ['kimlik-tespit-yontemi', 'Kimlik Tespit Yöntemi', bulletList(d.tespitYontemi)],
        ['fiziksel-tanimlayici-ozellikler', 'Fiziksel Tanımlayıcı Özellikler', kvTable(d.fizikselOzellikler)],
        ['sonuc', 'Sonuç', boxList('KİMLİK TESPİTİ SONUCU: ' + d.sonucKarar, [d.sonucAciklama], d.sonucKarar === 'Doğrulanmıştır' ? 'success' : 'danger')],
        ['guvenilirlik-ve-sinirlamalar-notu', 'Güvenilirlik ve Sınırlamalar Notu', `<div class="doc-legalnote">${esc(d.guvenilirlikNotu)}</div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">KİMLİK TESPİTİ RAPORU</h1>
          <div class="doc-subtitle">Olguya Ait Kimlik Doğrulama Değerlendirmesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Yetkili Hekim', d.yetkiliHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.yetkiliHekim, role: 'Tespiti Yapan Yetkili Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 6. İş Kazası Raporu ------------------------------------------ */
  TYPES.workAccident = {
    id: 'workAccident',
    label: 'İş Kazası Raporu',
    short: 'İş Kazası',
    raporPrefix: 'IKR',
    icon: 'M12 3 22 20H2Z M12 9.5v4.5 M12 16.8h.01',
    defaultData() {
      return {
        adSoyad: 'Nate Ferris', kimlikNo: 'WRK40118', cinsiyet: 'Erkek', dogumTarihi: '17.05.1992',
        isyeriGorev: 'Blaine County Liman İşletmeleri — Vinç Operatörü',
        kazaMekanizmasi: 'Hasta/tanık beyanına göre, çalışma alanında yük indirme sırasında dengesini kaybederek yaklaşık 2 metre yükseklikten düşmüştür. Olayın oluş şekline dair bağımsız bir doğrulama bulunmamaktadır; aşağıdaki bilgiler beyana dayanmaktadır.',
        muayeneBulgulari: [
          ['İnspeksiyon', 'Sağ bilek çevresinde belirgin şişlik ve ekimoz izlenmektedir'],
          ['Palpasyon', 'Bilek eklemi üzerinde şiddetli hassasiyet (+)'],
          ['Nörovasküler Muayene', 'Distal nabızlar palpabl, motor-duyusal defisit saptanmamıştır'],
          ['Ağrı Skalası (VAS)', '8/10'],
        ],
        tani: ['Distal radius fraktürü (şüpheli, kapalı tip)'],
        tedavi: [
          'Bilek bölgesine atel ile immobilizasyon uygulanmıştır.',
          'Ağrı kesici ve ödem çözücü tedavi başlanmıştır.',
          'Direkt grafi için ortopedi polikliniğine yönlendirme yapılmıştır.',
          'İş yerine iş kazası bildirimi yapılması konusunda hasta bilgilendirilmiştir.',
        ],
        isGoremezlikGun: 21,
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'İş Kazası Değerlendirme Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['hasta-ve-isyeri-bilgileri', 'Hasta ve İşyeri Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo],
          ['Cinsiyet', d.cinsiyet], ['Doğum Tarihi', d.dogumTarihi],
          ['İşyeri / Görev', d.isyeriGorev],
        ])],
        ['kaza-mekanizmasi-beyan', 'Kaza Mekanizması (Beyan)', `<div class="doc-body">${nl2p(d.kazaMekanizmasi)}</div>`],
        ['muayene-bulgulari', 'Muayene Bulguları', findTable(d.muayeneBulgulari)],
        ['tani', 'Tanı', boxList('KLİNİK TANI', d.tani, 'info')],
        ['uygulanan-tedavi-ve-oneriler', 'Uygulanan Tedavi ve Öneriler', bulletList(d.tedavi)],
        ['is-goremezlik-suresi', 'İş Göremezlik Süresi', `<div class="doc-box doc-box--danger" style="text-align:center">
            <div class="doc-box-label">RAPORLANAN İSTİRAHAT SÜRESİ</div>
            <div class="doc-iw-text">${d.isGoremezlikGun} (${numToWordsTR(d.isGoremezlikGun)}) GÜN</div>
            <div class="doc-box-sub">Bu süre boyunca hastanın fiziksel iş görme yeterliliğinin bulunmadığı değerlendirilmiştir.</div>
          </div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">İŞ KAZASI RAPORU</h1>
          <div class="doc-subtitle">Çalışma Ortamı Kaynaklı Yaralanma Değerlendirme Belgesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Muayene Eden Hekim', d.muayeneEdenHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.muayeneEdenHekim, role: 'Muayene Eden Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 7. Ortopedi Raporu ------------------------------------------- */
  TYPES.orthopedic = {
    id: 'orthopedic',
    label: 'Ortopedi Raporu',
    short: 'Ortopedi',
    raporPrefix: 'ORT',
    icon: 'M5 9a2 2 0 1 1 4 0v6a2 2 0 1 1-4 0Z M15 9a2 2 0 1 1 4 0v6a2 2 0 1 1-4 0Z M9 12h6',
    defaultData() {
      return {
        adSoyad: 'Priya Nandan', kimlikNo: 'ORT55291', cinsiyet: 'Kadın', dogumTarihi: '28.08.1996',
        sikayetOyku: 'Hasta, iki hafta önce geçirdiği düşme sonrası diz ekleminde devam eden ağrı, şişlik ve merdiven inip çıkarken instabilite hissi ile polikliniğe başvurmuştur.',
        fizikMuayene: [
          ['İnspeksiyon', 'Diz ekleminde orta düzeyde efüzyon ve hafif kızarıklık izlenmektedir'],
          ['Palpasyon', 'Medial eklem aralığında hassasiyet (+)'],
          ['Hareket Açıklığı (ROM)', 'Tam ekstansiyon sağlanabilmekte, fleksiyon son derecede ağrılı şekilde kısıtlı'],
          ['Özel Testler', 'Lachman testi hafif pozitif, McMurray testi medialde ağrılı'],
          ['Nörovasküler Muayene', 'Distal nabızlar palpabl, motor-duyusal defisit saptanmamıştır'],
        ],
        goruntulemeBulgusu: 'Manyetik rezonans görüntülemede medial menisküs posterior boynuzunda parsiyel yırtık ve ön çapraz bağda düşük dereceli sinyal artışı izlenmiştir.',
        ortopedikTani: ['Medial menisküs parsiyel yırtığı', 'Ön çapraz bağ (ACL) Grade I zorlanması'],
        girisim: [
          'Diz bölgesine fonksiyonel breys uygulanmıştır.',
          'Efüzyonu azaltmak amacıyla soğuk uygulama ve NSAİİ tedavisi başlanmıştır.',
          'Artroskopik değerlendirme için ortopedi kliniğine yönlendirme yapılmıştır.',
          'Yük vermeyi kısıtlayıcı yürüme talimatları verilmiştir.',
        ],
        rehabilitasyon: 'Ağrı ve efüzyon gerileyene kadar aşamalı fizik tedavi programı, kuadriseps güçlendirme egzersizleri ile devam edilmesi planlanmıştır.',
        kontrolPlani: '2 hafta sonrasında ortopedi polikliniği kontrolü ve gerekirse artroskopik girişim değerlendirmesi planlanmıştır.',
        ortopediUzmani: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Ortopedi ve Travmatoloji Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['hasta-bilgileri', 'Hasta Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo],
          ['Cinsiyet', d.cinsiyet], ['Doğum Tarihi', d.dogumTarihi],
        ])],
        ['sikayet-ve-oyku', 'Şikayet ve Öykü', `<div class="doc-body">${nl2p(d.sikayetOyku)}</div>`],
        ['fizik-muayene', 'Fizik Muayene', findTable(d.fizikMuayene)],
        ['goruntuleme-bulgusu', 'Görüntüleme Bulgusu', `<div class="doc-body">${nl2p(d.goruntulemeBulgusu)}</div>`],
        ['ortopedik-tani', 'Ortopedik Tanı', boxList('ORTOPEDİK TANI', d.ortopedikTani, 'info')],
        ['uygulanan-girisim', 'Uygulanan Girişim', bulletList(d.girisim)],
        ['rehabilitasyon-plani', 'Rehabilitasyon Planı', `<div class="doc-body">${nl2p(d.rehabilitasyon)}</div>`],
        ['kontrol-plani', 'Kontrol Planı', `<div class="doc-body">${nl2p(d.kontrolPlani)}</div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">ORTOPEDİ RAPORU</h1>
          <div class="doc-subtitle">Kas-İskelet ve Eklem Değerlendirme Belgesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Ortopedi Uzmanı', d.ortopediUzmani], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.ortopediUzmani, role: 'Ortopedi Uzmanı' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 8. Uyuşturucu Testi Raporu ------------------------------------ */
  TYPES.drugTest = {
    id: 'drugTest',
    label: 'Uyuşturucu Testi Raporu',
    short: 'Uyuşturucu Testi',
    raporPrefix: 'UDT',
    icon: 'M9 2h6 M10 2v6.2l-5.2 9.3A2 2 0 0 0 6.6 20.5h10.8a2 2 0 0 0 1.8-3L14 8.2V2',
    defaultData() {
      return {
        adSoyad: 'Chelsea Renner', kimlikNo: 'TOX61830', cinsiyet: 'Kadın', dogumTarihi: '19.10.1997',
        numuneBilgisi: [
          ['Numune Türü', 'İdrar'], ['Alınma Şekli', 'Gözetim altında, tanıklı numune alımı'],
          ['Numune Kod No', `SSMC-TOX-${Math.floor(Math.random() * 9000) + 1000}`], ['Alınma Tarihi', todayTR()],
        ],
        testSonuclari: [
          ['Amfetamin / Metamfetamin', 'Negatif', 'Referans sınırın altında'],
          ['Kannabinoid (THC)', 'Negatif', 'Referans sınırın altında'],
          ['Opiat', 'Negatif', 'Referans sınırın altında'],
          ['Kokain Metaboliti', 'Negatif', 'Referans sınırın altında'],
          ['Alkol (Etanol)', 'Negatif', '—'],
        ],
        genelDegerlendirme: 'Test edilen panel kapsamında herhangi bir maddeye rastlanmamıştır. Sonuçlar test anındaki numuneyi yansıtmaktadır.',
        dogrulamaNotu: 'Bu rapor yalnızca belirtilen panel ve numune için geçerlidir. Numune zinciri (chain of custody) kaydı laboratuvarda muhafaza edilmektedir. Sonuçların hukuki değerlendirmesi ilgili makamların yetkisindedir.',
        laboratuvarSorumlusu: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Toksikoloji & Laboratuvar Birimi', gizlilikEtiketi: 'GİZLİ', altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['hasta-bilgileri', 'Hasta Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo],
          ['Cinsiyet', d.cinsiyet], ['Doğum Tarihi', d.dogumTarihi],
        ])],
        ['numune-bilgisi', 'Numune Bilgisi', kvTable(d.numuneBilgisi)],
        ['test-sonuclari', 'Test Sonuçları', dataTable(['Madde / Panel', 'Sonuç', 'Not'], d.testSonuclari)],
        ['genel-degerlendirme', 'Genel Değerlendirme', box('DEĞERLENDİRME', d.genelDegerlendirme, 'success')],
        ['dogrulama-notu', 'Doğrulama Notu', `<div class="doc-legalnote">${esc(d.dogrulamaNotu)}</div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">UYUŞTURUCU TESTİ RAPORU</h1>
          <div class="doc-subtitle">Toksikolojik Tarama Sonuç Belgesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Laboratuvar Sorumlusu', d.laboratuvarSorumlusu], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.laboratuvarSorumlusu, role: 'Laboratuvar Sorumlusu' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 9. Zehirlenme / Entoksikasyon Raporu -------------------------- */
  TYPES.poisoning = {
    id: 'poisoning',
    label: 'Zehirlenme / Entoksikasyon Raporu',
    short: 'Zehirlenme',
    raporPrefix: 'ZEH',
    icon: 'M9 2h6 M10 2v5.5c0 .9-.3 1.8-.9 2.5l-3.6 4.3A5 5 0 0 0 9.3 22h5.4a5 5 0 0 0 3.8-7.7l-3.6-4.3a3.8 3.8 0 0 1-.9-2.5V2',
    defaultData() {
      return {
        adSoyad: 'Harlan Ives', kimlikNo: 'ZHR40912', cinsiyet: 'Erkek', dogumTarihi: '30.06.1991',
        maruziyetBilgisi: 'Hasta/tanık beyanına göre, bilinmeyen miktarda bir madde alımını takiben bilinç bulanıklığı ve bulantı geliştiği ifade edilmiştir. Alınan maddenin türü ve miktarına dair kesin bilgi bulunmamaktadır; aşağıdaki bilgiler beyana dayanmaktadır ve doğrulanmamıştır.',
        klinikBulgular: [
          ['Bilinç Durumu', 'Somnolan, ağrılı uyarana yanıt mevcut (GKS 12)'],
          ['Pupil Durumu', 'Bilateral miyotik, ışık refleksi zayıf'],
          ['Solunum', 'Yüzeyel, 10/dk, hafif bradipneik'],
          ['Kardiyovasküler Bulgular', 'TA 98/62 mmHg, Nabız 58/dk (bradikardik)'],
          ['Cilt Bulguları', 'Soğuk, nemli; siyanoz saptanmamıştır'],
        ],
        uygulananTedavi: [
          'Havayolu, solunum ve dolaşım (ABC) değerlendirmesi yapılarak destek tedavisi başlanmıştır.',
          'Damar yolu açılarak izotonik sıvı desteği sağlanmıştır.',
          'Bilinen antidot endikasyonu değerlendirilerek uygun durumlarda uygulanmıştır.',
          'Kardiyak monitörizasyon ve yakın nörolojik takip altına alınmıştır.',
        ],
        toksikolojiBulgulari: [
          ['Kan Gazı (pH)', '7.31', 'Hafif respiratuvar asidoz ile uyumlu'],
          ['Glukoz', '92 mg/dL', 'Normal sınırlarda'],
          ['Genel Toksikoloji Taraması', 'Değerlendirmede', 'Spesifik ajan tespiti için ileri analiz sürmektedir'],
        ],
        sonucPrognoz: 'Uygulanan destek tedavisi ile hastanın vital bulgularında kısmi düzelme izlenmiştir. Yakın izlem ve seri nörolojik değerlendirme ile prognozun olumlu seyretmesi beklenmektedir; ajanın netleşmemesi nedeniyle klinik durum değişkenlik gösterebilir.',
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Toksikoloji & Yoğun Bakım Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['hasta-bilgileri', 'Hasta Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo],
          ['Cinsiyet', d.cinsiyet], ['Doğum Tarihi', d.dogumTarihi],
        ])],
        ['maruziyet-bilgisi-beyan', 'Maruziyet Bilgisi (Beyan)', `<div class="doc-body">${nl2p(d.maruziyetBilgisi)}</div>`],
        ['klinik-bulgular', 'Klinik Bulgular', findTable(d.klinikBulgular)],
        ['uygulanan-tedavi', 'Uygulanan Tedavi', bulletList(d.uygulananTedavi)],
        ['toksikoloji-bulgulari', 'Toksikoloji Bulguları', dataTable(['Parametre', 'Sonuç', 'Değerlendirme'], d.toksikolojiBulgulari)],
        ['sonuc-ve-prognoz', 'Sonuç ve Prognoz', `<div class="doc-body">${nl2p(d.sonucPrognoz)}</div>`],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">ZEHİRLENME / ENTOKSİKASYON RAPORU</h1>
          <div class="doc-subtitle">Akut Madde Maruziyeti Değerlendirme Belgesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Muayene Eden Hekim', d.muayeneEdenHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.muayeneEdenHekim, role: 'Muayene Eden Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 10. Nakil / Sevk Raporu ---------------------------------------- */
  TYPES.transfer = {
    id: 'transfer',
    label: 'Nakil / Sevk Raporu',
    short: 'Nakil / Sevk',
    raporPrefix: 'NSV',
    icon: 'M3 16V7a1 1 0 0 1 1-1h9v10 M13 10h4l3 3.5V16h-7 M6.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M16.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    defaultData() {
      return {
        adSoyad: 'Selin Aydemir', kimlikNo: 'NKL22087', cinsiyet: 'Kadın', dogumTarihi: '08.01.1996',
        sevkEdenKurum: 'Sandy Shores Medical Center & Urgent Care',
        sevkEdilenKurum: 'Pillbox Hill Medical Center — Yoğun Bakım Ünitesi',
        sevkGerekcesi: 'Hastanın ileri düzey nöroşirürjikal değerlendirme ve yoğun bakım imkanları gerektiren klinik tablosu nedeniyle, kurumumuzun mevcut imkanlarının yetersiz kalması üzerine sevk kararı alınmıştır.',
        nakilSirasindaDurum: [
          ['Tansiyon (TA)', '112/70 mmHg'], ['Nabız', '88/dk, ritmik'],
          ['SpO2', '%96 (oksijen desteği ile)'], ['Bilinç Durumu', 'Uykuya meyilli, ağrılı uyarana yanıt mevcut (GKS 13)'],
        ],
        nakilSekli: 'Kara ambulansı, ileri yaşam desteği donanımlı',
        refakatPersoneli: 'Paramedik ve hemşire eşliğinde, sürekli monitörizasyon altında',
        sevkEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Hasta Nakil & Sevk Koordinasyon Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['hasta-bilgileri', 'Hasta Bilgileri', kvTable([
          ['Ad Soyad', d.adSoyad], ['Kimlik Seri Numarası', d.kimlikNo],
          ['Cinsiyet', d.cinsiyet], ['Doğum Tarihi', d.dogumTarihi],
        ])],
        ['sevk-bilgileri', 'Sevk Bilgileri', kvTable([
          ['Sevk Eden Kurum', d.sevkEdenKurum], ['Sevk Edilen Kurum', d.sevkEdilenKurum],
          ['Nakil Şekli', d.nakilSekli], ['Refakat Personeli', d.refakatPersoneli],
        ])],
        ['sevk-gerekcesi', 'Sevk Gerekçesi', `<div class="doc-body">${nl2p(d.sevkGerekcesi)}</div>`],
        ['nakil-sirasindaki-durum', 'Nakil Sırasındaki Durum', kvTable(d.nakilSirasindaDurum)],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">NAKİL / SEVK RAPORU</h1>
          <div class="doc-subtitle">Kurumlar Arası Hasta Nakil Belgesi</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Sevk Eden Hekim', d.sevkEdenHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.sevkEdenHekim, role: 'Sevk Eden Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  /* ---- 11. Boş Rapor Kağıdı ------------------------------------------- */
  TYPES.blank = {
    id: 'blank',
    label: 'Boş Rapor Kağıdı',
    short: 'Boş Rapor',
    raporPrefix: 'BRK',
    icon: 'M7 2h8l5 5v15H7z M15 2v5h5 M10 12h6 M10 15.5h6 M10 19h4',
    defaultData() {
      return {
        adSoyad: '', kimlikNo: '', cinsiyet: 'Belirtilmemiştir', dogumTarihi: '',
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Genel Rapor Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [
          { title: 'Genel Not', type: 'paragraph', text: 'Bu, serbest formatlı bir rapor şablonudur. Aşağıdaki "Özel Bölümler" alanından istediğin başlıkla metin, madde listesi ya da tablo ekleyerek raporun tüm içeriğini kendin oluşturabilirsin.', items: [], cols: ['Sütun 1', 'Sütun 2'], rows: [], pageBreak: false },
        ],
      };
    },
    render(d) {
      const { html: sectionsHtml, count } = arrangeSections([
        ['kimlik-bilgileri-opsiyonel', 'Kimlik Bilgileri (Opsiyonel)', kvTable([
          ['Ad Soyad', d.adSoyad || '—'], ['Kimlik Seri Numarası', d.kimlikNo || '—'],
          ['Cinsiyet', d.cinsiyet || '—'], ['Doğum Tarihi', d.dogumTarihi || '—'],
        ])],
      ], d);
      return `
        ${watermark(d.gizlilikEtiketi)}
        <div class="doc-page">
          ${letterhead({ sub: d.birimAdi, addr: ADDR, tag: d.gizlilikEtiketi })}
          <h1 class="doc-title">SERBEST FORMATLI RAPOR</h1>
          <div class="doc-subtitle">Boş Rapor Kağıdı</div>
          ${metaTable([
            ['Rapor No', d._raporNo], ['Düzenleme Tarihi', d._duzenlemeTarihi],
            ['Yetkili Hekim', d.muayeneEdenHekim], ['Onaylayan Baş Hekim', d.onaylayanBasHekim],
            ['Protokol No', d._protokolNo], ['Doğrulama Kodu', d._dogrulamaKodu],
          ])}
          ${sectionsHtml}
          ${customSections(d.customSections, count + 1)}
          ${sigTable([
            { name: d.muayeneEdenHekim, role: 'Yetkili Hekim' },
            { name: d.onaylayanBasHekim, role: 'Onaylayan Baş Hekim', sealed: true },
          ])}
          ${stampNote(d.altNot)}
        </div>`;
    },
  };

  function numToWordsTR(n) {
    const ones = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
    const teens = ['on', 'on bir', 'on iki', 'on üç', 'on dört', 'on beş', 'on altı', 'on yedi', 'on sekiz', 'on dokuz'];
    const tens = ['', '', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
    n = Number(n);
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + ones[n % 10] : ''}`.trim();
    return String(n);
  }

  function addDaysTR(trDate, days) {
    const [dd, mm, yyyy] = trDate.split('.').map(Number);
    const dt = new Date(yyyy, mm - 1, dd);
    dt.setDate(dt.getDate() + days);
    return `${pad(dt.getDate(), 2)}.${pad(dt.getMonth() + 1, 2)}.${dt.getFullYear()}`;
  }

  function instantiate(typeId, overrideData) {
    const type = TYPES[typeId];
    const data = overrideData ? JSON.parse(JSON.stringify(overrideData)) : type.defaultData();
    data._raporNo = makeRaporNo(type.raporPrefix);
    data._duzenlemeTarihi = todayTR();
    data._protokolNo = `SSMC-PR-${new Date().getFullYear()}-${pad(Math.floor(Math.random() * 9000) + 1000, 4)}`;
    data._dogrulamaKodu = makeDogrulamaKodu(type.raporPrefix);
    data._hiddenSections = data._hiddenSections || [];
    data._sectionOrder = data._sectionOrder || [];
    data._sectionTitles = data._sectionTitles || {};
    data.customSections = data.customSections || [];
    return data;
  }

  return { TYPES, instantiate, todayTR, numToWordsTR, addDaysTR, makeRaporNo, makeDogrulamaKodu, esc };
})();
