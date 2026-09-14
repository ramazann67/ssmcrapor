/* Sandy Shores Rapor Merkezi — app shell: form, live preview, history, export. */

const STORAGE_HISTORY = 'ssrs_history_v1';
const STORAGE_SESSION = 'ssrs_session_v1';

const els = {
  typeNav: document.getElementById('typeNav'),
  historyList: document.getElementById('historyList'),
  historyEmpty: document.getElementById('historyEmpty'),
  historySearch: document.getElementById('historySearch'),
  historyToolbar: document.getElementById('historyToolbar'),
  historySortBtn: document.getElementById('historySortBtn'),
  form: document.getElementById('formPanel'),
  sheet: document.getElementById('sheet'),
  exampleMenu: document.getElementById('exampleMenu'),
  exampleBtn: document.getElementById('exampleBtn'),
  saveToast: document.getElementById('saveToast'),
  pngModal: document.getElementById('pngModal'),
  pngImg: document.getElementById('pngImg'),
  pngStatus: document.getElementById('pngStatus'),
  pngFilename: document.getElementById('pngFilename'),
  reportTitleTag: document.getElementById('reportTitleTag'),
  zoomIn: document.getElementById('zoomIn'),
  zoomOut: document.getElementById('zoomOut'),
  zoomValue: document.getElementById('zoomValue'),
  paperWrap: document.getElementById('paperWrap'),
  themeToggle: document.getElementById('themeToggle'),
  backupBtn: document.getElementById('backupBtn'),
  backupModal: document.getElementById('backupModal'),
  backupClose: document.getElementById('backupClose'),
  backupText: document.getElementById('backupText'),
  backupStatus: document.getElementById('backupStatus'),
  backupCopyBtn: document.getElementById('backupCopyBtn'),
  backupLoadBtn: document.getElementById('backupLoadBtn'),
  backupScope: document.getElementById('backupScope'),
  backupHint: document.getElementById('backupHint'),
};

const state = {
  typeId: 'health',
  data: null,
};

/* ---------------------------------------------------------------- *
 * Persistence
 * ---------------------------------------------------------------- */

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || []; }
  catch { return []; }
}

function saveHistory(list) {
  try { localStorage.setItem(STORAGE_HISTORY, JSON.stringify(list)); } catch {}
}

function saveSession() {
  try { localStorage.setItem(STORAGE_SESSION, JSON.stringify(state)); } catch {}
}

function loadSession() {
  try { return JSON.parse(localStorage.getItem(STORAGE_SESSION)); }
  catch { return null; }
}

/* ---------------------------------------------------------------- *
 * State transitions
 * ---------------------------------------------------------------- */

function setType(typeId, data) {
  state.typeId = typeId;
  state.data = data || RS.instantiate(typeId);
  renderAll();
  saveSession();
}

function loadExample(typeId, exampleData) {
  state.typeId = typeId;
  state.data = RS.instantiate(typeId, exampleData);
  renderAll();
  saveSession();
}

function updateField(key, value) {
  state.data[key] = value;
  renderPreview();
  saveSession();
}

/* ---------------------------------------------------------------- *
 * Sidebar: type switcher
 * ---------------------------------------------------------------- */

function renderTypeNav() {
  els.typeNav.innerHTML = Object.values(RS.TYPES).map((t) => `
    <button type="button" class="type-btn ${t.id === state.typeId ? 'is-active' : ''}" data-type="${t.id}">
      <svg viewBox="0 0 24 24" class="type-icon" aria-hidden="true"><path d="${t.icon}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>
      <span>${t.short}</span>
    </button>`).join('');
}

els.typeNav.addEventListener('click', (e) => {
  const btn = e.target.closest('.type-btn');
  if (!btn) return;
  const typeId = btn.dataset.type;
  if (typeId === state.typeId) return;
  setType(typeId);
});

/* ---------------------------------------------------------------- *
 * Sidebar: history
 * ---------------------------------------------------------------- */

let historyFilter = '';
let historySortAz = false;

function renderHistory() {
  const all = loadHistory();
  els.historyToolbar.hidden = all.length < 4;
  const q = historyFilter.trim().toLowerCase();
  let items = q
    ? all.filter((i) => i.title.toLowerCase().includes(q) || RS.TYPES[i.typeId].short.toLowerCase().includes(q))
    : all.slice();
  items = historySortAz
    ? items.sort((a, b) => a.title.localeCompare(b.title, 'tr'))
    : items.reverse();
  els.historyEmpty.hidden = all.length > 0;
  els.historySortBtn.classList.toggle('is-az', historySortAz);
  els.historyList.innerHTML = items.map((item) => `
    <li class="hist-item" data-id="${item.id}">
      <button type="button" class="hist-open" data-id="${item.id}">
        <span class="hist-name" data-id="${item.id}">${RS.esc(item.title)}</span>
        <span class="hist-meta">${RS.TYPES[item.typeId].short} · ${item.savedAt}</span>
      </button>
      <div class="hist-actions">
        <button type="button" class="hist-rename" data-id="${item.id}" aria-label="Adını değiştir" title="Adını değiştir">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        </button>
        <button type="button" class="hist-dup" data-id="${item.id}" aria-label="Kopyala" title="Kopyala">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="1.5"/><path d="M5 15V4.5A1.5 1.5 0 0 1 6.5 3H15"/></svg>
        </button>
        <button type="button" class="hist-del" data-id="${item.id}" aria-label="Kaydı sil" title="Kaydı sil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0 1 12a1 1 0 001 1h6a1 1 0 001-1l1-12"/></svg>
        </button>
      </div>
    </li>`).join('');
}

els.historySearch.addEventListener('input', () => {
  historyFilter = els.historySearch.value;
  renderHistory();
});
els.historySortBtn.addEventListener('click', () => {
  historySortAz = !historySortAz;
  els.historySortBtn.title = historySortAz ? 'Tarihe göre sırala' : 'Alfabetik sırala';
  renderHistory();
});

function startRename(id) {
  const nameSpan = els.historyList.querySelector(`.hist-name[data-id="${id}"]`);
  if (!nameSpan) return;
  const current = nameSpan.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'hist-name-input';
  input.value = current;
  nameSpan.replaceWith(input);
  input.focus();
  input.select();
  const commit = () => {
    const items = loadHistory();
    const item = items.find((i) => i.id === id);
    if (item) {
      item.title = input.value.trim() || item.title;
      saveHistory(items);
    }
    renderHistory();
  };
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') { input.value = current; input.blur(); }
  });
}

els.historyList.addEventListener('click', (e) => {
  const renameBtn = e.target.closest('.hist-rename');
  const dupBtn = e.target.closest('.hist-dup');
  const delBtn = e.target.closest('.hist-del');
  const openBtn = e.target.closest('.hist-open');
  if (renameBtn) {
    startRename(renameBtn.dataset.id);
  } else if (dupBtn) {
    const items = loadHistory();
    const item = items.find((i) => i.id === dupBtn.dataset.id);
    if (!item) return;
    const copy = {
      id: `h${Date.now()}`,
      typeId: item.typeId,
      data: JSON.parse(JSON.stringify(item.data)),
      title: `${item.title} (kopya)`,
      savedAt: RS.todayTR(),
    };
    items.push(copy);
    saveHistory(items);
    renderHistory();
    setType(copy.typeId, copy.data);
    flashToast('Kayıt kopyalandı ve açıldı.');
  } else if (delBtn) {
    const items = loadHistory();
    const item = items.find((i) => i.id === delBtn.dataset.id);
    if (item && window.confirm(`"${item.title}" kaydını silmek istediğine emin misin? Bu işlem geri alınamaz.`)) {
      saveHistory(items.filter((i) => i.id !== delBtn.dataset.id));
      renderHistory();
    }
  } else if (openBtn) {
    const items = loadHistory();
    const item = items.find((i) => i.id === openBtn.dataset.id);
    if (item) setType(item.typeId, item.data);
  }
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const items = loadHistory();
  const type = RS.TYPES[state.typeId];
  items.push({
    id: `h${Date.now()}`,
    typeId: state.typeId,
    data: JSON.parse(JSON.stringify(state.data)),
    title: state.data.adSoyad || type.short,
    savedAt: RS.todayTR(),
  });
  saveHistory(items);
  renderHistory();
  flashToast('Rapor geçmişe kaydedildi.');
});

function flashToast(msg) {
  els.saveToast.textContent = msg;
  els.saveToast.classList.add('is-visible');
  clearTimeout(flashToast._t);
  flashToast._t = setTimeout(() => els.saveToast.classList.remove('is-visible'), 2600);
}

/* ---------------------------------------------------------------- *
 * Examples menu
 * ---------------------------------------------------------------- */

function renderExampleMenu() {
  const list = RS_EXAMPLES[state.typeId] || [];
  els.exampleMenu.innerHTML = list.map((ex, i) => `<button type="button" class="menu-item" data-idx="${i}">${RS.esc(ex.label)}</button>`).join('');
}

els.exampleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  els.exampleMenu.classList.toggle('is-open');
});
els.exampleMenu.addEventListener('click', (e) => {
  const item = e.target.closest('.menu-item');
  if (!item) return;
  const ex = RS_EXAMPLES[state.typeId][Number(item.dataset.idx)];
  loadExample(state.typeId, ex.data);
  els.exampleMenu.classList.remove('is-open');
  flashToast(`"${ex.label}" örneği yüklendi.`);
});
document.addEventListener('click', () => els.exampleMenu.classList.remove('is-open'));

document.getElementById('newBtn').addEventListener('click', () => {
  setType(state.typeId, RS.instantiate(state.typeId));
  flashToast('Yeni rapor oluşturuldu.');
});

/* ---------------------------------------------------------------- *
 * Form panel — schema driven
 * ---------------------------------------------------------------- */

const FIXED_TAIL_IDS = new Set(['hekimler', 'belge-ayarlari']);

/* Mirrors report-templates.js's arrangeSections() ordering logic, but over
   schema section objects, so the form always lists sections in the exact
   order they'll appear in the printed report. */
function arrangeSchemaSections(schema, d) {
  const order = d._sectionOrder || [];
  const map = new Map(schema.map((s) => [s.id, s]));
  const ordered = order.filter((id) => map.has(id)).map((id) => map.get(id));
  const usedIds = new Set(order);
  return [...ordered, ...schema.filter((s) => !usedIds.has(s.id))];
}

function renderForm() {
  const schema = RS_SCHEMAS[state.typeId];
  const d = state.data;
  const hidden = new Set(d._hiddenSections || []);
  const titles = d._sectionTitles || {};
  const content = arrangeSchemaSections(schema.filter((s) => !FIXED_TAIL_IDS.has(s.id)), d);
  const tail = schema.filter((s) => FIXED_TAIL_IDS.has(s.id));

  const renderSection = (section, i, total) => {
    const isHidden = hidden.has(section.id);
    const displayTitle = titles[section.id] || section.title;
    return `
    <fieldset class="form-section ${isHidden ? 'is-hidden' : ''}" data-section-id="${section.id}">
      <legend>
        <span class="section-move">
          <button type="button" class="section-move-up" data-id="${section.id}" ${i === 0 ? 'disabled' : ''} aria-label="Yukarı taşı">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </button>
          <button type="button" class="section-move-down" data-id="${section.id}" ${i === total - 1 ? 'disabled' : ''} aria-label="Aşağı taşı">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </button>
        </span>
        <input type="text" class="section-title-input" data-id="${section.id}" data-default="${RS.esc(section.title)}" value="${RS.esc(displayTitle)}" aria-label="Bölüm başlığı">
        <button type="button" class="section-toggle" data-id="${section.id}">${isHidden ? 'Göster' : 'Gizle'}</button>
      </legend>
      ${isHidden
        ? `<p class="section-hidden-note">Bu bölüm raporda gizlendi — girdiğin bilgiler korunuyor, "Göster" ile geri getirebilirsin.</p>`
        : section.fields.map((f) => renderField(f, d[f.key])).join('')}
    </fieldset>`;
  };

  const contentHtml = content.map((s, i) => renderSection(s, i, content.length)).join('');
  const tailHtml = tail.map((section) => `
    <fieldset class="form-section">
      <legend><span>${RS.esc(section.title)}</span></legend>
      ${section.fields.map((f) => renderField(f, d[f.key])).join('')}
    </fieldset>`).join('');

  const customized = hidden.size > 0 || (d._sectionOrder || []).length > 0 || Object.keys(titles).length > 0;
  const resetBar = customized
    ? `<button type="button" id="resetSectionLayout" class="reset-layout-btn">↺ Bölüm sırasını, başlıklarını ve gizlemeleri sıfırla</button>`
    : '';

  els.form.innerHTML = resetBar + contentHtml + tailHtml + renderCustomEditor(d.customSections || []);
}

function renderField(f, value) {
  const id = `f_${f.key}`;
  if (f.type === 'text') {
    return `<label class="field" for="${id}">${RS.esc(f.label)}${f.required ? ' <span class="req">*</span>' : ''}
      <input id="${id}" type="text" data-field="${f.key}" value="${RS.esc(value ?? '')}" placeholder="${RS.esc(f.placeholder ?? '')}">
    </label>`;
  }
  if (f.type === 'number') {
    return `<label class="field" for="${id}">${RS.esc(f.label)}
      <input id="${id}" type="number" data-field="${f.key}" value="${RS.esc(value ?? 0)}" min="0">
    </label>`;
  }
  if (f.type === 'textarea') {
    return `<label class="field" for="${id}">${RS.esc(f.label)}
      <textarea id="${id}" rows="${f.rows || 3}" data-field="${f.key}">${RS.esc(value ?? '')}</textarea>
    </label>`;
  }
  if (f.type === 'select') {
    return `<label class="field" for="${id}">${RS.esc(f.label)}
      <select id="${id}" data-field="${f.key}">
        ${f.options.map((o) => `<option value="${RS.esc(o)}" ${o === value ? 'selected' : ''}>${RS.esc(o)}</option>`).join('')}
      </select>
    </label>`;
  }
  if (f.type === 'list') {
    const items = value || [];
    return `<div class="field field--wide">
      <span class="field-label">${RS.esc(f.label)}</span>
      <div class="repeater" data-field="${f.key}" data-kind="list">
        ${items.map((it, i) => `
          <div class="repeater-row" data-row="${i}">
            <textarea rows="2" data-col="0" aria-label="${RS.esc(f.label)} ${i + 1}">${RS.esc(it)}</textarea>
            <button type="button" class="row-del" data-row="${i}" aria-label="Maddeyi sil">×</button>
          </div>`).join('')}
        <button type="button" class="row-add" data-add="1">+ Madde ekle</button>
      </div>
    </div>`;
  }
  if (f.type === 'kv-table' || f.type === 'data-table') {
    const rows = value || [];
    const cols = f.cols;
    return `<div class="field field--wide">
      <span class="field-label">${RS.esc(f.label)}</span>
      <div class="repeater repeater--table" data-field="${f.key}" data-kind="table" style="--cols:${cols.length}">
        <div class="repeater-head">${cols.map((c) => `<span>${RS.esc(c)}</span>`).join('')}<span></span></div>
        ${rows.map((row, ri) => `
          <div class="repeater-row" data-row="${ri}">
            ${cols.map((c, ci) => `<input type="text" data-col="${ci}" aria-label="${RS.esc(c)} — satır ${ri + 1}" value="${RS.esc(row[ci] ?? '')}">`).join('')}
            <button type="button" class="row-del" data-row="${ri}" aria-label="Satırı sil">×</button>
          </div>`).join('')}
        <button type="button" class="row-add" data-add="1">+ Satır ekle</button>
      </div>
    </div>`;
  }
  return '';
}

/* ---------------------------------------------------------------- *
 * Custom sections — user-defined extra blocks appended to any report,
 * beyond the fixed schema (paragraph / bullet list / free-form table).
 * ---------------------------------------------------------------- */

const CUSTOM_TYPE_LABELS = { paragraph: 'Metin', list: 'Madde Listesi', table: 'Tablo', box: 'Sonuç Kutusu' };

function blankCustomSection() {
  return { title: '', type: 'paragraph', text: '', items: [], cols: ['Sütun 1', 'Sütun 2'], rows: [], pageBreak: false, boxTone: 'info', boxLabel: '' };
}

function renderCustomEditor(sections) {
  return `
    <fieldset class="form-section form-section--custom">
      <legend>Özel Bölümler</legend>
      <p class="field-hint">Sabit alanların dışında rapora kendi başlığınla ek bölümler ekleyebilirsin — belgenin sonuna, imzalardan hemen önce eklenir.</p>
      ${sections.map((cs, ci) => renderCustomBlock(cs, ci, sections.length)).join('')}
      <button type="button" class="row-add" id="addCustomSection">+ Yeni Bölüm Ekle</button>
    </fieldset>`;
}

function renderCustomBlock(cs, ci, total) {
  let body = '';
  if (cs.type === 'paragraph') {
    body = `<textarea class="custom-text" data-ci="${ci}" rows="3" placeholder="Bölüm içeriği…" aria-label="Bölüm içeriği">${RS.esc(cs.text)}</textarea>`;
  } else if (cs.type === 'list') {
    body = `<div class="repeater" data-ci="${ci}" data-kind="custom-list">
      ${(cs.items || []).map((it, ii) => `
        <div class="repeater-row" data-ii="${ii}">
          <textarea rows="2" class="custom-item" data-ci="${ci}" data-ii="${ii}" aria-label="Madde ${ii + 1}">${RS.esc(it)}</textarea>
          <button type="button" class="row-del custom-item-del" data-ci="${ci}" data-ii="${ii}" aria-label="Maddeyi sil">×</button>
        </div>`).join('')}
      <button type="button" class="row-add custom-item-add" data-ci="${ci}">+ Madde ekle</button>
    </div>`;
  } else if (cs.type === 'table') {
    const cols = cs.cols || [];
    body = `
      <div class="custom-cols">
        <span class="field-label">Sütunlar</span>
        <div class="custom-cols-row">
          ${cols.map((c, coi) => `
            <span class="custom-col-chip">
              <input type="text" class="custom-col-input" data-ci="${ci}" data-coi="${coi}" value="${RS.esc(c)}" placeholder="Sütun ${coi + 1}" aria-label="Sütun ${coi + 1} başlığı">
              <button type="button" class="custom-col-del" data-ci="${ci}" data-coi="${coi}" aria-label="Sütunu sil">×</button>
            </span>`).join('')}
          <button type="button" class="custom-col-add" data-ci="${ci}">+ Sütun</button>
        </div>
      </div>
      <div class="repeater repeater--table" data-ci="${ci}" data-kind="custom-table" style="--cols:${cols.length || 1}">
        ${(cs.rows || []).map((row, ri) => `
          <div class="repeater-row" data-ri="${ri}">
            ${cols.map((c, coi) => `<input type="text" class="custom-cell" data-ci="${ci}" data-ri="${ri}" data-coi="${coi}" value="${RS.esc(row[coi] ?? '')}" aria-label="${RS.esc(c)} — satır ${ri + 1}">`).join('')}
            <button type="button" class="row-del custom-row-del" data-ci="${ci}" data-ri="${ri}" aria-label="Satırı sil">×</button>
          </div>`).join('')}
        <button type="button" class="row-add custom-row-add" data-ci="${ci}" ${cols.length ? '' : 'disabled'}>+ Satır ekle</button>
      </div>`;
  } else if (cs.type === 'box') {
    body = `
      <div class="custom-box-tone-row">
        <span class="field-label">Renk / Ton</span>
        <select class="custom-box-tone" data-ci="${ci}" aria-label="Kutu tonu">
          <option value="info" ${(!cs.boxTone || cs.boxTone === 'info') ? 'selected' : ''}>Bilgi (mavi)</option>
          <option value="success" ${cs.boxTone === 'success' ? 'selected' : ''}>Olumlu (yeşil)</option>
          <option value="danger" ${cs.boxTone === 'danger' ? 'selected' : ''}>Uyarı (kırmızı)</option>
        </select>
      </div>
      <input type="text" class="custom-box-label" data-ci="${ci}" placeholder="Üst etiket (opsiyonel — örn. RAPORLANAN İSTİRAHAT SÜRESİ)" value="${RS.esc(cs.boxLabel || '')}" aria-label="Kutu üst etiketi">
      <input type="text" class="custom-text" data-ci="${ci}" placeholder="Büyük sonuç/karar metni (örn. UYGUNDUR, 21 GÜN)" value="${RS.esc(cs.text || '')}" aria-label="Kutu büyük başlığı">
      <div class="repeater" data-ci="${ci}" data-kind="custom-list">
        ${(cs.items || []).map((it, ii) => `
          <div class="repeater-row" data-ii="${ii}">
            <textarea rows="2" class="custom-item" data-ci="${ci}" data-ii="${ii}" aria-label="Alt açıklama ${ii + 1}">${RS.esc(it)}</textarea>
            <button type="button" class="row-del custom-item-del" data-ci="${ci}" data-ii="${ii}" aria-label="Satırı sil">×</button>
          </div>`).join('')}
        <button type="button" class="row-add custom-item-add" data-ci="${ci}">+ Alt açıklama ekle</button>
      </div>`;
  }
  return `<div class="custom-block" data-ci="${ci}">
    <div class="custom-head">
      <div class="custom-move">
        <button type="button" class="custom-move-up" data-ci="${ci}" ${ci === 0 ? 'disabled' : ''} aria-label="Yukarı taşı">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </button>
        <button type="button" class="custom-move-down" data-ci="${ci}" ${ci === total - 1 ? 'disabled' : ''} aria-label="Aşağı taşı">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </button>
      </div>
      <input type="text" class="custom-title" data-ci="${ci}" placeholder="Bölüm başlığı (örn. Kaza Mekanizması)" value="${RS.esc(cs.title)}" aria-label="Bölüm başlığı">
      <select class="custom-type" data-ci="${ci}" aria-label="Bölüm türü">
        ${Object.entries(CUSTOM_TYPE_LABELS).map(([v, l]) => `<option value="${v}" ${cs.type === v ? 'selected' : ''}>${l}</option>`).join('')}
      </select>
      <button type="button" class="custom-del" data-ci="${ci}" aria-label="Bölümü sil">×</button>
    </div>
    <label class="custom-pagebreak">
      <input type="checkbox" class="custom-pagebreak-check" data-ci="${ci}" ${cs.pageBreak ? 'checked' : ''}>
      Yeni sayfadan başlasın
    </label>
    ${body}
  </div>`;
}

function ensureCustomSections() {
  if (!Array.isArray(state.data.customSections)) state.data.customSections = [];
  return state.data.customSections;
}

els.form.addEventListener('input', (e) => {
  if (e.target.classList.contains('section-title-input')) {
    const id = e.target.dataset.id;
    const titles = state.data._sectionTitles || (state.data._sectionTitles = {});
    if (e.target.value.trim() === '' || e.target.value === e.target.dataset.default) {
      delete titles[id];
    } else {
      titles[id] = e.target.value;
    }
    renderPreview();
    saveSession();
    return;
  }
  const custom = e.target.closest('.form-section--custom');
  if (custom) {
    const ci = Number(e.target.dataset.ci);
    const sections = ensureCustomSections();
    const cs = sections[ci];
    if (!cs) return;
    if (e.target.classList.contains('custom-title')) cs.title = e.target.value;
    else if (e.target.classList.contains('custom-text')) cs.text = e.target.value;
    else if (e.target.classList.contains('custom-box-label')) cs.boxLabel = e.target.value;
    else if (e.target.classList.contains('custom-pagebreak-check')) cs.pageBreak = e.target.checked;
    else if (e.target.classList.contains('custom-item')) cs.items[Number(e.target.dataset.ii)] = e.target.value;
    else if (e.target.classList.contains('custom-col-input')) cs.cols[Number(e.target.dataset.coi)] = e.target.value;
    else if (e.target.classList.contains('custom-cell')) {
      const ri = Number(e.target.dataset.ri), coi = Number(e.target.dataset.coi);
      cs.rows[ri] = cs.rows[ri] || [];
      cs.rows[ri][coi] = e.target.value;
    }
    renderPreview();
    saveSession();
    return;
  }
  const simple = e.target.closest('[data-field]:not(.repeater)');
  if (simple && simple.dataset.field && !simple.closest('.repeater')) {
    updateField(simple.dataset.field, simple.value);
    return;
  }
  const cell = e.target.closest('.repeater-row input, .repeater-row textarea');
  if (cell) {
    const repeater = cell.closest('.repeater');
    const key = repeater.dataset.field;
    const rowIdx = Number(cell.closest('.repeater-row').dataset.row);
    const colIdx = Number(cell.dataset.col);
    if (repeater.dataset.kind === 'list') {
      state.data[key][rowIdx] = cell.value;
    } else {
      state.data[key][rowIdx][colIdx] = cell.value;
    }
    renderPreview();
    saveSession();
  }
});

els.form.addEventListener('click', (e) => {
  const sectionToggle = e.target.closest('.section-toggle');
  if (sectionToggle) {
    const id = sectionToggle.dataset.id;
    const hidden = new Set(state.data._hiddenSections || []);
    if (hidden.has(id)) hidden.delete(id); else hidden.add(id);
    state.data._hiddenSections = Array.from(hidden);
    renderForm();
    renderPreview();
    saveSession();
    return;
  }
  const moveUp = e.target.closest('.section-move-up');
  const moveDown = e.target.closest('.section-move-down');
  if (moveUp || moveDown) {
    const schema = RS_SCHEMAS[state.typeId].filter((s) => !FIXED_TAIL_IDS.has(s.id));
    const order = arrangeSchemaSections(schema, state.data).map((s) => s.id);
    const id = (moveUp || moveDown).dataset.id;
    const i = order.indexOf(id);
    const j = moveUp ? i - 1 : i + 1;
    if (i >= 0 && j >= 0 && j < order.length) {
      [order[i], order[j]] = [order[j], order[i]];
      state.data._sectionOrder = order;
      renderForm();
      renderPreview();
      saveSession();
    }
    return;
  }
  if (e.target.closest('#resetSectionLayout')) {
    state.data._hiddenSections = [];
    state.data._sectionOrder = [];
    state.data._sectionTitles = {};
    renderForm();
    renderPreview();
    saveSession();
    flashToast('Bölüm düzeni sıfırlandı.');
    return;
  }
  if (e.target.closest('#addCustomSection')) {
    ensureCustomSections().push(blankCustomSection());
    renderForm();
    renderPreview();
    saveSession();
    els.form.querySelector('.custom-block:last-of-type .custom-title')?.focus();
    return;
  }
  const customBlock = e.target.closest('.form-section--custom .custom-block');
  if (customBlock) {
    const ci = Number(customBlock.dataset.ci);
    const sections = ensureCustomSections();
    const cs = sections[ci];
    if (e.target.closest('.custom-move-up')) {
      if (ci > 0) [sections[ci - 1], sections[ci]] = [sections[ci], sections[ci - 1]];
    } else if (e.target.closest('.custom-move-down')) {
      if (ci < sections.length - 1) [sections[ci + 1], sections[ci]] = [sections[ci], sections[ci + 1]];
    } else if (e.target.closest('.custom-del')) {
      sections.splice(ci, 1);
    } else if (e.target.closest('.custom-item-add')) {
      cs.items = cs.items || []; cs.items.push('');
    } else if (e.target.closest('.custom-item-del')) {
      cs.items.splice(Number(e.target.closest('.custom-item-del').dataset.ii), 1);
    } else if (e.target.closest('.custom-col-add')) {
      cs.cols = cs.cols || []; cs.cols.push(`Sütun ${cs.cols.length + 1}`);
      (cs.rows || []).forEach((r) => r.push(''));
    } else if (e.target.closest('.custom-col-del')) {
      const coi = Number(e.target.closest('.custom-col-del').dataset.coi);
      cs.cols.splice(coi, 1);
      (cs.rows || []).forEach((r) => r.splice(coi, 1));
    } else if (e.target.closest('.custom-row-add')) {
      cs.rows = cs.rows || []; cs.rows.push(new Array((cs.cols || []).length).fill(''));
    } else if (e.target.closest('.custom-row-del')) {
      cs.rows.splice(Number(e.target.closest('.custom-row-del').dataset.ri), 1);
    } else {
      return;
    }
    renderForm();
    renderPreview();
    saveSession();
    return;
  }
  const addBtn = e.target.closest('.row-add');
  const delBtn = e.target.closest('.row-del');
  if (addBtn) {
    const repeater = addBtn.closest('.repeater');
    const key = repeater.dataset.field;
    if (repeater.dataset.kind === 'list') state.data[key].push('');
    else state.data[key].push(new Array(repeater.style.getPropertyValue('--cols') | 0).fill(''));
    renderForm();
    renderPreview();
    saveSession();
    els.form.querySelector(`[data-field="${key}"] .repeater-row:last-of-type input, [data-field="${key}"] .repeater-row:last-of-type textarea`)?.focus();
  } else if (delBtn) {
    const repeater = delBtn.closest('.repeater');
    const key = repeater.dataset.field;
    const rowIdx = Number(delBtn.dataset.row);
    state.data[key].splice(rowIdx, 1);
    renderForm();
    renderPreview();
    saveSession();
  }
});

els.form.addEventListener('change', (e) => {
  if (e.target.classList.contains('custom-type')) {
    const ci = Number(e.target.dataset.ci);
    const sections = ensureCustomSections();
    const cs = sections[ci];
    if (!cs) return;
    cs.type = e.target.value;
    renderForm();
    renderPreview();
    saveSession();
    return;
  }
  if (e.target.classList.contains('custom-box-tone')) {
    const ci = Number(e.target.dataset.ci);
    const sections = ensureCustomSections();
    const cs = sections[ci];
    if (!cs) return;
    cs.boxTone = e.target.value;
    renderPreview();
    saveSession();
  }
});

/* ---------------------------------------------------------------- *
 * Preview
 * ---------------------------------------------------------------- */

const TR_FILENAME_MAP = { ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I', ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U' };
function suggestedFilename(ext) {
  const type = RS.TYPES[state.typeId];
  const raw = `${state.data.adSoyad || type.short}_${type.short}`;
  const clean = raw.replace(/[çÇğĞıİöÖşŞüÜ]/g, (c) => TR_FILENAME_MAP[c])
    .replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return `${clean}.${ext}`;
}

function renderPreview() {
  const type = RS.TYPES[state.typeId];
  els.sheet.innerHTML = type.render(state.data);
  els.reportTitleTag.textContent = `${type.short} · ${state.data.adSoyad || '—'}`;
  document.title = suggestedFilename('pdf').replace(/\.pdf$/, '');
}

function renderAll() {
  renderTypeNav();
  renderExampleMenu();
  renderForm();
  renderPreview();
}

/* ---------------------------------------------------------------- *
 * Zoom
 * ---------------------------------------------------------------- */

let zoomPct = 82;
function applyZoom() {
  els.sheet.style.transform = `scale(${zoomPct / 100})`;
  els.zoomValue.textContent = `${zoomPct}%`;
}
function fitZoom() {
  const container = els.paperWrap.parentElement;
  const cs = getComputedStyle(container);
  const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const available = container.clientWidth - padX;
  const sheetPx = els.sheet.getBoundingClientRect().width / (zoomPct / 100) || 794;
  zoomPct = Math.max(30, Math.min(140, Math.round((available / sheetPx) * 100)));
  applyZoom();
}
els.zoomIn.addEventListener('click', () => { zoomPct = Math.min(140, zoomPct + 8); applyZoom(); });
els.zoomOut.addEventListener('click', () => { zoomPct = Math.max(30, zoomPct - 8); applyZoom(); });
els.zoomValue.addEventListener('click', fitZoom);
applyZoom();

/* ---------------------------------------------------------------- *
 * Backup / restore — copies the current report's JSON to the
 * clipboard (script-driven file downloads are inert in this sandbox)
 * and can load a pasted JSON payload back in.
 * ---------------------------------------------------------------- */

let backupScope = 'current';
const BACKUP_HINTS = {
  current: 'Aşağıdaki metin şu an açık olan raporun tüm verisidir. <strong>Panoya Kopyala</strong> ile yedekleyip başka bir cihaza/tarayıcıya taşıyabilir, ya da bu kutuya başka bir yedeği yapıştırıp <strong>Bu Veriyi Yükle</strong> diyerek geri getirebilirsin.',
  all: 'Aşağıdaki metin geçmişteki <strong>tüm kayıtlı raporların</strong> listesidir. Panoya kopyalayıp tüm geçmişini yedekleyebilir, ya da başka bir cihazdan aldığın tam listeyi buraya yapıştırıp yükleyerek mevcut geçmişinin <strong>yerine koyabilirsin</strong> (mevcut geçmiş kayıtlarının üzerine yazılır).',
};
function fillBackupText() {
  els.backupText.value = backupScope === 'all'
    ? JSON.stringify(loadHistory(), null, 2)
    : JSON.stringify(state.data, null, 2);
  els.backupHint.innerHTML = BACKUP_HINTS[backupScope];
  els.backupStatus.hidden = true;
}
els.backupScope.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-scope]');
  if (!btn) return;
  backupScope = btn.dataset.scope;
  els.backupScope.querySelectorAll('button').forEach((b) => b.classList.toggle('is-active', b === btn));
  fillBackupText();
});
els.backupBtn.addEventListener('click', () => {
  backupScope = 'current';
  els.backupScope.querySelectorAll('button').forEach((b) => b.classList.toggle('is-active', b.dataset.scope === 'current'));
  fillBackupText();
  els.backupModal.hidden = false;
});
els.backupCopyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(els.backupText.value);
    els.backupStatus.hidden = false;
    els.backupStatus.className = 'is-ok';
    els.backupStatus.textContent = 'Panoya kopyalandı.';
  } catch {
    els.backupText.select();
    els.backupStatus.hidden = false;
    els.backupStatus.className = 'is-error';
    els.backupStatus.textContent = 'Otomatik kopyalanamadı — metin seçili, Ctrl/Cmd+C ile kopyalayabilirsin.';
  }
});
els.backupLoadBtn.addEventListener('click', () => {
  let parsed;
  try {
    parsed = JSON.parse(els.backupText.value);
  } catch {
    els.backupStatus.hidden = false;
    els.backupStatus.className = 'is-error';
    els.backupStatus.textContent = 'Geçersiz JSON — veri okunamadı.';
    return;
  }
  if (backupScope === 'all') {
    if (!Array.isArray(parsed)) {
      els.backupStatus.hidden = false;
      els.backupStatus.className = 'is-error';
      els.backupStatus.textContent = 'Geçersiz veri — bir kayıt listesi (dizi) bekleniyor.';
      return;
    }
    saveHistory(parsed);
    renderHistory();
    els.backupModal.hidden = true;
    flashToast(`${parsed.length} kayıt geçmişe yüklendi.`);
    return;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    els.backupStatus.hidden = false;
    els.backupStatus.className = 'is-error';
    els.backupStatus.textContent = 'Geçersiz veri — bir rapor nesnesi bekleniyor.';
    return;
  }
  state.data = parsed;
  renderAll();
  saveSession();
  els.backupModal.hidden = true;
  flashToast('Veri yüklendi.');
});
els.backupClose.addEventListener('click', () => { els.backupModal.hidden = true; });
els.backupModal.addEventListener('click', (e) => { if (e.target === els.backupModal) els.backupModal.hidden = true; });

/* ---------------------------------------------------------------- *
 * Theme toggle (light / dark) — a manual override on top of the
 * system-preference default, persisted per browser.
 * ---------------------------------------------------------------- */

const THEME_KEY = 'ssrs_theme_v1';
const ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/></svg>';
const ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/></svg>';

function effectiveTheme() {
  return document.documentElement.dataset.theme
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function paintThemeIcon() {
  els.themeToggle.innerHTML = effectiveTheme() === 'dark' ? ICON_SUN : ICON_MOON;
}
els.themeToggle.addEventListener('click', () => {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch {}
  paintThemeIcon();
});
(function bootTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') document.documentElement.dataset.theme = stored;
  } catch {}
  paintThemeIcon();
})();

/* ---------------------------------------------------------------- *
 * Print / PDF
 * ---------------------------------------------------------------- */

function checkRequiredFields() {
  const schema = RS_SCHEMAS[state.typeId];
  const missing = [];
  schema.forEach((section) => section.fields.forEach((f) => {
    if (f.required && !String(state.data[f.key] ?? '').trim()) missing.push(f.label);
  }));
  if (missing.length) flashToast(`Uyarı: ${missing.join(', ')} boş görünüyor.`);
  return missing.length === 0;
}

document.getElementById('printBtn').addEventListener('click', () => {
  checkRequiredFields();
  window.print();
});

/* ---------------------------------------------------------------- *
 * PNG export (html2canvas -> on-screen image; sandbox blocks scripted
 * downloads, so we surface a right-click-save affordance instead).
 * ---------------------------------------------------------------- */

document.getElementById('pngBtn').addEventListener('click', async () => {
  checkRequiredFields();
  els.pngFilename.textContent = suggestedFilename('png');
  els.pngModal.hidden = false;
  els.pngImg.hidden = true;
  els.pngStatus.hidden = false;
  els.pngStatus.textContent = 'Görüntü oluşturuluyor…';
  try {
    const canvas = await html2canvas(els.sheet, { scale: 2, backgroundColor: '#ffffff' });
    els.pngImg.src = canvas.toDataURL('image/png');
    els.pngImg.hidden = false;
    els.pngStatus.hidden = true;
  } catch (err) {
    els.pngStatus.textContent = 'Görüntü oluşturulamadı: ' + err.message;
  }
});

document.getElementById('pngClose').addEventListener('click', () => { els.pngModal.hidden = true; });
els.pngModal.addEventListener('click', (e) => { if (e.target === els.pngModal) els.pngModal.hidden = true; });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    els.pngModal.hidden = true;
    els.backupModal.hidden = true;
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    document.getElementById('saveBtn').click();
  }
});

/* ---------------------------------------------------------------- *
 * Mobile view toggle (form / preview)
 * ---------------------------------------------------------------- */

const viewToggle = document.getElementById('viewToggle');
if (viewToggle) {
  viewToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-view]');
    if (!btn) return;
    viewToggle.querySelectorAll('button').forEach((b) => b.classList.toggle('is-active', b === btn));
    document.body.dataset.mobileView = btn.dataset.view;
  });
}

/* ---------------------------------------------------------------- *
 * Boot
 * ---------------------------------------------------------------- */

(function boot() {
  document.body.dataset.mobileView = 'form';
  const session = loadSession();
  if (session && session.typeId && session.data && RS.TYPES[session.typeId]) {
    state.typeId = session.typeId;
    state.data = session.data;
  } else {
    state.data = RS.instantiate(state.typeId);
  }
  renderAll();
  renderHistory();
})();
