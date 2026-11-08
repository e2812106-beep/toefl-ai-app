// ===== GRAMMAR SECTION (grammar.js) =====
// Loaded by index.html before the main script. It uses the app's own helpers (app, go, swap, goBack, esc, mcard, rs, GEN, guard, GP, saveGP).
// Content lives in JSON files: grammar/index.json (topics, lesson titles and levels, used by the library and the search)
// and one file per big topic, for example grammar/present-tenses.json (lessons, practice, tests, midterms, final exam).
const GRV = "1"; // bump (and in index.html: grammar.js?v=) when a grammar file changes in a way that must show at once

(function () {
  const css = `
.gr-search{width:100%;padding:13px 18px;font:inherit;color:var(--ink);background:var(--surface);border:1.5px solid var(--line);border-radius:999px;margin:6px 0 14px}
.gr-search:focus-visible,.gr-pill:focus-visible,.gr-t:focus-visible,.gr-row:focus-visible,.gr-hit:focus-visible,.gr-tok:focus-visible,.gr-in:focus-visible,.gr-ta:focus-visible,.gr-step:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.gr-fl{margin:0 0 12px}.gr-fl b{display:block;margin:0 0 8px;font-size:15px}
.gr-chips{display:flex;flex-wrap:wrap;gap:8px}
.gr-pill{padding:7px 16px;border:1.5px solid var(--line);border-radius:999px;background:var(--surface);color:var(--ink);font:600 15px Inter,system-ui,sans-serif;cursor:pointer}
.gr-pill.on{background:var(--dg);border-color:var(--dg);color:#fff}
.gr-pill.st{cursor:default;padding:5px 12px;font-size:14px}
.gr-cnt{display:flex;justify-content:space-between;align-items:baseline;margin:18px 0 10px;border-top:1px solid var(--line);padding-top:14px}
.gr-tc{margin:0 0 12px}
.gr-t{display:flex;flex-direction:column;align-items:flex-start;gap:6px;width:100%;padding:14px 16px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:14px;font:inherit;text-align:left;cursor:pointer}
.gr-t:hover,.gr-row:hover,.gr-hit:hover{border-color:var(--teal)}
.gr-th{display:flex;justify-content:space-between;align-items:center;width:100%;color:var(--dg)}
.gr-n{font:600 13px Inter,system-ui,sans-serif;background:rgba(50,133,104,.14);border-radius:999px;padding:3px 10px;color:var(--ink)}
.gr-tt{font:700 19px/1.2 Inter,system-ui,sans-serif}
.gr-td{color:var(--muted);font-size:15px}
.gr-pg{font-size:14px;color:var(--teal);font-weight:600}
.gr-hit{display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;margin:6px 0 0;padding:10px 14px;background:var(--surface);border:1px solid var(--line);border-radius:10px;font:inherit;color:var(--ink);text-align:left;cursor:pointer}
.gr-lv{display:inline-block;padding:2px 9px;border-radius:999px;font:700 13px/1.5 Inter,system-ui,sans-serif;white-space:nowrap}
.gr-a{background:#d9efe3;color:#12633f}.gr-b{background:#dbe8fb;color:#1f4f9a}.gr-c{background:#f3e6c8;color:#7a5a05}
.gr-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 12px;color:var(--muted);font-size:15px}
.gr-prog{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:0 0 18px}
.gr-prog .top{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.gr-pb{height:10px;background:var(--line);border-radius:999px;overflow:hidden;margin:8px 0}.gr-pb div{height:100%;background:var(--teal);border-radius:999px}
.gr-h2{font:700 20px Inter,system-ui,sans-serif;margin:20px 0 10px}
.gr-row{display:block;width:100%;margin:0 0 10px;padding:13px 16px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:14px;font:inherit;text-align:left;cursor:pointer}
.gr-row.off{opacity:.6;cursor:default}.gr-row.off:hover{border-color:var(--line)}
.gr-rh{display:flex;align-items:center;gap:10px}.gr-rh b{flex:1;font-size:17px}
.gr-ck{color:var(--teal);flex:none;width:22px;height:22px}
.gr-rd{display:block;color:var(--muted);font-size:15px;margin:4px 0 0}
.gr-st{display:block;font-size:14px;font-weight:600;color:var(--muted);margin-top:6px}.gr-st.ok{color:var(--teal)}
.gr-tag{padding:3px 11px;border-radius:999px;font:700 13px/1.5 Inter,system-ui,sans-serif;white-space:nowrap}
.gr-tg-m{background:#fde8d6;color:#9a4a0c}.gr-tg-f{background:#ece3f8;color:#5a35a0}
.gr-steps{display:flex;gap:6px;margin:12px 0 16px}
.gr-step{flex:1;padding:10px 6px;border:1.5px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);font:600 15px Inter,system-ui,sans-serif;cursor:pointer}
.gr-step.on{background:var(--teal);border-color:var(--teal);color:#fff}
.gr-sec{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:0 0 12px}
.gr-sec h2{font:700 20px/1.3 Inter,system-ui,sans-serif;margin:0 0 8px;color:var(--dg)}
.gr-sec h3{font:700 16px Inter,system-ui,sans-serif;margin:14px 0 6px;color:var(--dg)}
.gr-sec p{margin:0 0 10px}.gr-sec ul{margin:0 0 10px;padding-left:20px}.gr-sec li{margin:0 0 4px}
.gr-eg{background:color-mix(in srgb,var(--teal) 7%,var(--surface));border:1px solid var(--line);border-left:4px solid var(--teal);border-radius:8px;padding:10px 12px;margin:0 0 10px}
.gr-sec .gr-eg p{margin:0 0 6px}.gr-sec .gr-eg p:last-child{margin:0}
.gr-egl{font-size:14px;color:var(--muted);margin:0 0 6px}
.gr-tw{overflow-x:auto;margin:0 0 10px}
.gr-tb{border-collapse:collapse;width:100%;font-size:15px}.gr-tb th,.gr-tb td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}.gr-tb th{background:rgba(50,133,104,.1)}
.gr-mis{border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin:0 0 8px}.gr-sec .gr-mis p{margin:0 0 4px}.gr-mis p:last-child{margin:0}
.gr-w{color:var(--bad)}.gr-r{color:var(--teal);font-weight:600}
.gr-sr{position:absolute;left:-9999px}
.gr-note{font-size:14px;color:var(--muted);background:rgba(50,133,104,.1);border-radius:8px;padding:8px 10px;margin:0 0 10px}
.gr-it{padding:2px 0 10px;border-bottom:1px solid var(--line);margin:0 0 6px}
.gr-fb{margin:8px 0 0;padding:8px 12px;border-left:4px solid var(--bad);background:rgba(0,0,0,.03);border-radius:6px;font-size:15px}.gr-fb.ok{border-left-color:#2e9e5b}.gr-fb.nt{border-left-color:var(--teal)}
.gr-in{font:inherit;color:var(--ink);background:var(--surface);border:0;border-bottom:2px solid var(--teal);padding:2px 4px;margin:0 2px;text-align:center;max-width:100%}
.gr-in.gr-full{display:block;width:100%;margin:8px 0 0;text-align:left;border:1.5px solid var(--line);border-radius:8px;padding:10px 12px}
.gr-in.ok{border-bottom-color:#2e9e5b}.gr-in.bad{border-bottom-color:var(--bad)}
.gr-ta{width:100%;min-height:120px;padding:10px 12px;font:inherit;color:var(--ink);background:var(--surface);border:1.5px solid var(--line);border-radius:10px;margin:6px 0 0}
.gr-built{min-height:50px;border:1.5px dashed var(--line);border-radius:10px;padding:8px 8px 2px;margin:8px 0}
.gr-tok{padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit;cursor:pointer;margin:0 6px 6px 0}
.gr-tok.used{visibility:hidden}
.gr-warnbox{border:1.5px solid #e2a15f;background:#fdf1e4;color:#6b3a07;border-radius:10px;padding:10px 12px;margin:0 0 12px}
`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
  document.body.insertAdjacentHTML("afterbegin",
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol><symbol id="i-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5"/></symbol></svg>');
})();

// ----- small helpers -----
const GRLV = ["A1", "A2", "B1", "B2", "C1"];
const grEm = (s) => esc(s).replace(/\*([^*]+)\*/g, "<b>$1</b>"); // *word* becomes bold
const grN = (s) => String(s == null ? "" : s).toLowerCase().replace(/[\u2018\u2019`]/g, "'").replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ").trim();
function grShuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function grLevels(s) { // "A1", "A2-B1" or "A2–B1" becomes a list of levels
  const m = String(s || "").toUpperCase().match(/[ABC][12]/g) || [];
  if (!m.length) return [];
  const a = GRLV.indexOf(m[0]), b = GRLV.indexOf(m[m.length - 1]);
  return GRLV.slice(Math.min(a, b), Math.max(a, b) + 1);
}
function grLvText(s) { const l = grLevels(s); return l.length > 1 ? l[0] + "\u2013" + l[l.length - 1] : (l[0] || ""); }
const grChip = (s) => { const t = grLvText(s); return t ? `<span class="gr-lv gr-${t[0].toLowerCase()}">${t}</span>` : ""; };
const grCheck = '<svg class="mi gr-ck" aria-hidden="true"><use href="#i-check"/></svg>';

// ----- data -----
let GRI = null; const GRT = {};
async function grJSON(p) { const r = await fetch(p + "?v=" + GRV); if (!r.ok) throw new Error("http " + r.status); return r.json(); }
async function grIndex() {
  if (GRI) return GRI;
  const j = await grJSON("grammar/index.json");
  if (!j || !Array.isArray(j.topics)) throw new Error("bad data");
  return GRI = j;
}
async function grTopicData(id) {
  if (GRT[id]) return GRT[id];
  const t = (await grIndex()).topics.find((x) => x.id === id);
  if (!t) throw new Error("no topic");
  const j = await grJSON(t.file);
  if (!j || !Array.isArray(j.lessons)) throw new Error("bad data");
  return GRT[id] = j;
}
function grFail(title, retry) {
  app.innerHTML = `<h1>${esc(title)}</h1><div class="card warn">Couldn't load this part of the grammar section. Check your connection and try again.</div><div class="row"><button class="btn alt" id="bk">Back</button><button class="btn" id="rt">Try again</button></div>`;
  document.getElementById("bk").onclick = goBack;
  document.getElementById("rt").onclick = retry;
}
const grLoading = (t) => { app.innerHTML = `<h1>${esc(t)}</h1><div class="card"><span class="muted">Loading\u2026</span></div>`; };

// ----- progress (stored in GP, synced with the account; one record per lesson or assessment id) -----
// record: {t: last change, o: time first opened, pr: [practice set ids done], sc: last test score in percent, ok: 1 once the test was passed}
function grSet(id, fn) {
  const r = GP[id] && typeof GP[id] == "object" ? GP[id] : { t: 0, o: 0, pr: [], sc: null, ok: 0 };
  if (!Array.isArray(r.pr)) r.pr = [];
  const before = JSON.stringify(r);
  fn(r);
  if (JSON.stringify(r) !== before || !GP[id]) { r.t = Date.now(); GP[id] = r; saveGP(); }
}
const grRec = (id) => (GP[id] && typeof GP[id] == "object" ? GP[id] : null);
function grDone(l) {
  const r = grRec(l.id);
  if (!r) return false;
  if (l.test && (l.test.items || []).length) return !!r.ok;
  return !!r.o && (l.practice || []).every((p) => (r.pr || []).includes(p.id));
}
function grStatus(l) {
  const r = grRec(l.id);
  if (grDone(l)) return { c: "ok", t: "Completed" + (r && r.ok ? " \u00B7 Test passed" : "") };
  if (r && (r.o || r.sc != null || (r.pr || []).length)) return { c: "", t: "In progress" + (r.sc != null ? " \u00B7 Last test " + Math.round(r.sc) + "%" : "") };
  return { c: "", t: "Not started" };
}
const grAsHas = (a) => (a.items || []).length > 0;
function grAsStatus(a) {
  const r = grRec(a.id);
  if (!grAsHas(a)) return { c: "", t: "Coming soon" };
  if (r && r.ok) return { c: "ok", t: "Passed \u00B7 " + Math.round(r.sc) + "%" };
  if (r && r.sc != null) return { c: "", t: "Last score " + Math.round(r.sc) + "% \u00B7 not passed yet" };
  return { c: "", t: "Not taken yet" };
}

// ----- Grammar tab: the four parts -----
function grMenu() {
  rs("grammar");
  app.innerHTML = `<h1>Grammar</h1>${mcard('id="gl"', "list", "Grammar library", "Find a topic and study it")}${mcard('id="gk"', "grad", "Course", "A step-by-step grammar course", " dim")}${mcard('id="gx"', "exam", "Exam", "Test your grammar", " dim")}${mcard('id="gp"', "shuffle", "Random practice", "Mixed grammar exercises", " dim")}`;
  document.getElementById("gl").onclick = () => go(grLib);
  ["gk", "gx", "gp"].forEach((id) => { document.getElementById(id).onclick = (e) => comingSoon(e.currentTarget); });
}

// ----- Library: search, level filter, topic cards -----
let grQ = "", grL = "All";
function grMatch(t, q, lv) {
  const ls = t.lessons || [], ql = q.trim().toLowerCase();
  const byLv = (l) => lv === "All" || grLevels(l.level).includes(lv);
  if (lv !== "All" && !ls.some(byLv)) return null;
  let hit = [];
  if (ql) {
    const tm = (t.title + " " + (t.desc || "")).toLowerCase().includes(ql);
    hit = ls.filter((l) => l.title.toLowerCase().includes(ql) && byLv(l));
    if (!tm && !hit.length) return null;
  }
  return { hit };
}
async function grLib() {
  rs("gLib");
  const tok = GEN;
  grLoading("Grammar library");
  let idx;
  try { idx = await grIndex(); } catch (e) { if (tok === GEN) grFail("Grammar library", () => swap(grLib)); return; }
  if (tok !== GEN) return;
  app.innerHTML = `<h1>Grammar library</h1><p class="muted">Explore English grammar, one topic at a time.</p>
<input class="gr-search" id="grq" type="search" placeholder="Search grammar topics\u2026" value="${esc(grQ)}" autocomplete="off" spellcheck="false" aria-label="Search grammar topics">
<div class="gr-fl"><b>Filter by level</b><div class="gr-chips" id="grf">${["All", ...GRLV].map((l) => `<button class="gr-pill${l === grL ? " on" : ""}" data-l="${l}" aria-pressed="${l === grL}">${l}</button>`).join("")}</div></div>
<div class="gr-cnt"><b>Grammar topics</b><span class="muted" id="grn"></span></div><div id="grl"></div><div class="row"><button class="btn alt" id="bk">Back</button></div>`;
  const paint = () => {
    const out = [];
    idx.topics.forEach((t) => {
      const m = grMatch(t, grQ, grL);
      if (!m) return;
      const ls = t.lessons || [], n = ls.length;
      const levels = GRLV.filter((x) => ls.some((l) => grLevels(l.level).includes(x)));
      const done = ls.filter((l) => grRec(l.id) && grRec(l.id).ok).length;
      out.push(`<div class="gr-tc"><button class="gr-t" data-t="${esc(t.id)}"><span class="gr-th"><svg class="mi" aria-hidden="true"><use href="#i-${esc(t.icon || "book")}"/></svg><span class="gr-n">${n} ${n === 1 ? "lesson" : "lessons"}</span></span><span class="gr-tt">${esc(t.title)}</span><span class="gr-td">${esc(t.desc || "")}</span><span class="gr-chips">${levels.map(grChip).join("")}</span>${done ? `<span class="gr-pg">${done} of ${n} completed</span>` : ""}</button>${m.hit.map((l) => `<button class="gr-hit" data-t="${esc(t.id)}" data-l="${esc(l.id)}"><span>${esc(l.title)}</span>${grChip(l.level)}</button>`).join("")}</div>`);
    });
    document.getElementById("grn").textContent = out.length + (out.length === 1 ? " topic" : " topics");
    document.getElementById("grl").innerHTML = out.length ? out.join("") : '<div class="card">No topics found. Try another word or another level.</div>';
    app.querySelectorAll(".gr-t").forEach((b) => b.onclick = () => go(() => grTopic(b.dataset.t)));
    app.querySelectorAll(".gr-hit").forEach((b) => b.onclick = () => go(() => grLesson(b.dataset.t, b.dataset.l, "learn")));
  };
  paint();
  document.getElementById("grq").oninput = (e) => { grQ = e.target.value; paint(); };
  document.getElementById("grf").onclick = (e) => {
    const b = e.target.closest(".gr-pill"); if (!b) return;
    grL = b.dataset.l;
    app.querySelectorAll("#grf .gr-pill").forEach((x) => { const on = x.dataset.l === grL; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
    paint();
  };
  document.getElementById("bk").onclick = goBack;
}

// ----- Big topic page -----
async function grTopic(id) {
  rs("gLib");
  const tok = GEN;
  let d = GRT[id];
  if (!d) { grLoading("Grammar"); try { d = await grTopicData(id); } catch (e) { if (tok === GEN) grFail("Grammar", () => swap(() => grTopic(id))); return; } }
  if (tok !== GEN) return;
  scrollTo(0, 0);
  const ls = d.lessons, as = d.assessments || [];
  const done = ls.filter(grDone).length, n = ls.length;
  const real = as.filter(grAsHas), passed = real.filter((a) => grRec(a.id) && grRec(a.id).ok).length;
  const finished = n > 0 && done === n && passed === real.length;
  const levels = GRLV.filter((x) => ls.some((l) => grLevels(l.level).includes(x)));
  const pct = n ? Math.round(100 * done / n) : 0;
  app.innerHTML = `<h1>${esc(d.title)}</h1><p class="muted" style="margin:0 0 8px">${esc(d.desc || "")}</p><div class="gr-chips" style="margin:0 0 14px">${levels.map(grChip).join("")}</div>
<div class="gr-prog"><div class="top"><b>Your progress</b><span class="muted">${done} / ${n}</span></div><div class="gr-pb" role="progressbar" aria-label="Topic progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div style="width:${pct}%"></div></div><span class="muted">You've completed ${done} ${done === 1 ? "mini-topic" : "mini-topics"}.${real.length ? " Assessments passed: " + passed + " of " + real.length + "." : ""}</span>${finished ? '<p class="ok" style="margin:8px 0 0"><b>Topic completed \u2713</b></p>' : ""}</div>
<h2 class="gr-h2" style="margin-top:0">Mini-topics</h2>
${n ? ls.map((l, i) => { const s = grStatus(l); return `<button class="gr-row" data-i="${i}"><span class="gr-rh">${grChip(l.level)}<b>${i + 1}. ${esc(l.title)}</b>${grDone(l) ? grCheck : ""}</span><span class="gr-rd">${esc(l.desc || "")}</span><span class="gr-st ${s.c}">${s.t}</span></button>`; }).join("") : '<div class="card">The lessons are coming soon.</div>'}
${as.length ? '<h2 class="gr-h2">Assessments</h2>' + as.map((a, i) => { const s = grAsStatus(a), has = grAsHas(a); return `<button class="gr-row${has ? "" : " off"}" data-a="${i}"${has ? "" : " disabled"}><span class="gr-rh"><b>${esc(a.title)}</b><span class="gr-tag ${a.kind === "final" ? "gr-tg-f" : "gr-tg-m"}">${esc(a.afterLabel || (a.kind === "final" ? "Final assessment" : "Midterm"))}</span></span><span class="gr-rd">${esc(a.desc || "")}</span>${a.note ? `<span class="gr-rd">${esc(a.note)}</span>` : ""}<span class="gr-st ${s.c}">${s.t}</span></button>`; }).join("") : ""}
<div class="row"><button class="btn alt" id="bk">Back</button></div>`;
  app.querySelectorAll("[data-i]").forEach((b) => b.onclick = () => go(() => grLesson(id, ls[+b.dataset.i].id, "learn")));
  app.querySelectorAll("[data-a]").forEach((b) => b.onclick = () => go(() => grAssess(id, as[+b.dataset.a].id)));
  document.getElementById("bk").onclick = goBack;
}

// ----- Lesson blocks -----
function grBlock(b) {
  const x = b.x;
  switch (b.t) {
    case "p": return `<p>${grEm(x)}</p>`;
    case "h": return `<h3>${esc(x)}</h3>`;
    case "ul": return `<ul>${x.map((i) => `<li>${grEm(i)}</li>`).join("")}</ul>`;
    case "eg": return `<div class="gr-eg">${b.label ? `<div class="gr-egl">${esc(b.label)}</div>` : ""}${x.map((s) => `<p>${grEm(s)}</p>`).join("")}</div>`;
    case "note": return `<div class="gr-note">${grEm(x)}</div>`;
    case "chips": return `<div class="gr-chips" style="margin:0 0 10px">${x.map((s) => `<span class="gr-pill st">${esc(s)}</span>`).join("")}</div>`;
    case "tips": return `<ul>${x.map((i) => `<li>${grEm(i)}</li>`).join("")}</ul>`;
    case "table": return `<div class="gr-tw"><table class="gr-tb"><thead><tr>${b.head.map((h) => `<th>${grEm(h)}</th>`).join("")}</tr></thead><tbody>${x.map((r) => `<tr>${r.map((c) => `<td>${grEm(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    case "mistakes": return x.map((m) => `<div class="gr-mis"><p class="gr-w"><span aria-hidden="true">\u2717</span><span class="gr-sr">Wrong: </span> ${esc(m[0])}</p><p class="gr-r"><span aria-hidden="true">\u2713</span><span class="gr-sr">Correct: </span> ${esc(m[1])}</p><p class="muted">${grEm(m[2])}</p></div>`).join("");
    default: return "";
  }
}

// ----- Lesson page: Learn, Practice, Test -----
async function grLesson(tid, lid, stage) {
  rs("gLib");
  const tok = GEN;
  let d = GRT[tid];
  if (!d) { grLoading("Grammar"); try { d = await grTopicData(tid); } catch (e) { if (tok === GEN) grFail("Grammar", () => swap(() => grLesson(tid, lid, stage))); return; } }
  if (tok !== GEN) return;
  const i = d.lessons.findIndex((x) => x.id === lid), l = d.lessons[i];
  if (!l) { swap(() => grTopic(tid)); return; }
  scrollTo(0, 0);
  grSet(lid, (r) => { if (!r.o) r.o = Date.now(); });
  const r = grRec(lid) || {}, ps = l.practice || [], tst = l.test || { items: [] }, pass = tst.pass || 70;
  const go2 = (s) => swap(() => grLesson(tid, lid, s));
  const steps = [["learn", "1. Learn"], ["practice", "2. Practice"], ["test", "3. Test"]];
  let body = "";
  if (stage === "practice") {
    body = `<p class="muted">Practice what you have just learned. Your answers are checked straight away.</p>${ps.length ? ps.map((p, k) => { const dn = (r.pr || []).includes(p.id); return `<button class="gr-row" data-p="${k}"><span class="gr-rh"><b>${esc(p.title)}</b>${dn ? grCheck : ""}</span><span class="gr-rd">${(p.items || []).length} exercises</span><span class="gr-st ${dn ? "ok" : ""}">${dn ? "Done" : "Not done yet"}</span></button>`; }).join("") : '<div class="card">Practice exercises are coming soon.</div>'}<div class="row"><button class="btn alt" id="bk">Back</button><button class="btn" id="nx">Go to the test \u203A</button></div>`;
  } else if (stage === "test") {
    const has = (tst.items || []).length > 0;
    body = `<div class="card"><b>Mini-test</b><p class="muted" style="margin:6px 0 0">${has ? `${tst.items.length} questions. Pass mark: ${pass}%.` : "The test is coming soon."}</p>${r.sc != null ? `<p style="margin:8px 0 0">Last score: <b>${Math.round(r.sc)}%</b> \u00B7 <span class="${r.ok ? "ok" : "warn"}">${r.ok ? "Passed" : "Not passed yet"}</span></p>` : ""}</div><div class="row"><button class="btn alt" id="bk">Back</button>${has ? `<button class="btn" id="st">${r.sc != null ? "Retake the test" : "Start the test"}</button>` : ""}</div>`;
  } else {
    stage = "learn";
    body = `${(l.sections || []).map((s) => `<section class="gr-sec">${s.h ? `<h2>${esc(s.h)}</h2>` : ""}${(s.b || []).map(grBlock).join("")}</section>`).join("") || '<div class="card">This lesson is coming soon.</div>'}<div class="row"><button class="btn alt" id="bk">Back</button><button class="btn" id="nx">Go to practice \u203A</button></div>`;
  }
  app.innerHTML = `<h1 style="margin-bottom:6px">${esc(l.title)}</h1><div class="gr-meta">${grChip(l.level)}<span>Mini-topic ${i + 1} of ${d.lessons.length}</span></div>
<div class="gr-steps" role="group" aria-label="Lesson steps">${steps.map((s) => `<button class="gr-step${s[0] === stage ? " on" : ""}" data-s="${s[0]}"${s[0] === stage ? ' aria-current="step"' : ""}>${s[1]}</button>`).join("")}</div>${body}`;
  app.querySelectorAll("[data-s]").forEach((b) => b.onclick = () => { if (b.dataset.s !== stage) go2(b.dataset.s); });
  const bk = document.getElementById("bk"); if (bk) bk.onclick = goBack;
  const nx = document.getElementById("nx"); if (nx) nx.onclick = () => go2(stage === "learn" ? "practice" : "test");
  app.querySelectorAll("[data-p]").forEach((b) => b.onclick = () => {
    const p = ps[+b.dataset.p];
    go(() => grRunPage({ kind: "practice", title: p.title, intro: p.intro, items: p.items, onCheck: () => grSet(lid, (x) => { if (!x.pr.includes(p.id)) x.pr.push(p.id); }) }));
  });
  const st = document.getElementById("st");
  if (st) st.onclick = () => go(() => grRunPage({ kind: "test", title: l.title + ": test", intro: `${tst.items.length} questions. Pass mark: ${pass}%.`, items: tst.items, pass, onCheck: (ok, tot, pc, passed) => grSet(lid, (x) => { x.sc = Math.round(pc * 10) / 10; if (passed) x.ok = 1; }) }));
}

// ----- Midterms and final exam -----
async function grAssess(tid, aid) {
  rs("gLib");
  const tok = GEN;
  let d = GRT[tid];
  if (!d) { grLoading("Grammar"); try { d = await grTopicData(tid); } catch (e) { if (tok === GEN) grFail("Grammar", () => swap(() => grAssess(tid, aid))); return; } }
  if (tok !== GEN) return;
  const a = (d.assessments || []).find((x) => x.id === aid);
  if (!a || !grAsHas(a)) { swap(() => grTopic(tid)); return; }
  scrollTo(0, 0);
  const final = a.kind === "final", pass = a.pass || (final ? 80 : 70);
  const need = a.after === "all" || (final && !a.after) ? d.lessons.map((x) => x.id) : (a.after || []);
  const lack = need.filter((id) => { const l = d.lessons.find((x) => x.id === id); return !l || !grDone(l); });
  const r = grRec(aid), s = grAsStatus(a);
  app.innerHTML = `<h1>${esc(a.title)}</h1><p class="muted">${esc(a.desc || "")}</p>
${lack.length ? `<div class="gr-warnbox"><b>Heads up.</b> ${esc(a.note || "This assessment is recommended after the related mini-topics.")} You haven't completed all of them yet. You can still start, but some questions may be difficult.</div>` : ""}
<div class="card"><b>${a.items.length} questions</b><p class="muted" style="margin:6px 0 0">Pass mark: ${pass}%.</p>${r && r.sc != null ? `<p style="margin:8px 0 0">${esc(s.t)}</p>` : ""}</div>
<div class="row"><button class="btn alt" id="bk">Back</button><button class="btn" id="st">${r && r.sc != null ? "Retake" : "Start"}</button></div>`;
  document.getElementById("bk").onclick = goBack;
  document.getElementById("st").onclick = () => swap(() => grRunPage({ kind: final ? "final" : "midterm", title: a.title, intro: `${a.items.length} questions. Pass mark: ${pass}%.`, items: a.items, pass, onCheck: (ok, tot, pc, passed) => grSet(aid, (x) => { x.sc = Math.round(pc * 10) / 10; if (passed) x.ok = 1; }) }));
}

// ----- Exercises: choice, typed, order, write -----
function grTokens(it) {
  const words = String(it.answer).trim().split(/\s+/), base = words.concat(it.extra || []);
  let t = grShuffle(base), k = 0;
  while (words.length > 1 && !(it.extra || []).length && t.join(" ") === words.join(" ") && k++ < 8) t = grShuffle(base);
  return t;
}
function grItem(it, i, toks) {
  const q = it.q || "";
  if (it.t === "choice") return `<div class="gr-it" data-i="${i}"><div class="q">${i + 1}. ${grEm(q)}</div>${it.options.map((o, k) => `<button class="opt" data-i="${i}" data-k="${k}"><b>${"ABCD"[k]}.</b> ${grEm(o)}</button>`).join("")}<div class="gr-fb" hidden></div></div>`;
  if (it.t === "typed") {
    const len = Math.max(...(it.answers || [it.answer]).map((a) => String(a).length)) + 2;
    const inline = q.includes("___");
    const inp = `<input class="gr-in${inline ? "" : " gr-full"}" data-in="${i}" size="${Math.min(len, 22)}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer for question ${i + 1}">`;
    return `<div class="gr-it" data-i="${i}"><div class="q">${i + 1}. ${inline ? grEm(q).replace("___", inp) : grEm(q)}</div>${inline ? "" : inp}<div class="gr-fb" hidden></div></div>`;
  }
  if (it.t === "order") return `<div class="gr-it" data-i="${i}"><div class="q">${i + 1}. ${grEm(q || "Put the words in the correct order.")}</div><div class="gr-ord" data-i="${i}"><div class="gr-built" aria-label="Your sentence"></div><div class="gr-bank"></div></div><div class="gr-fb" hidden></div></div>`;
  if (it.t === "write") return `<div class="gr-it" data-i="${i}"><div class="q">${i + 1}. ${grEm(q)}</div><textarea class="gr-ta" data-ta="${i}" aria-label="Your answer for question ${i + 1}"></textarea><div class="gr-fb" hidden></div></div>`;
  return "";
}
function grRunPage(cfg) {
  rs("gLib");
  const items = cfg.items, test = cfg.kind !== "practice";
  const ans = items.map(() => null), toks = items.map((it) => it.t === "order" ? grTokens(it) : null);
  let done = false;
  guard = test ? "test" : false;
  app.innerHTML = `<h1>${esc(cfg.title)}</h1>${cfg.intro ? `<p class="muted">${esc(cfg.intro)}</p>` : ""}${items.map((it, i) => grItem(it, i, toks[i])).join("")}<div class="card" id="grs" hidden></div><div class="row"><button class="btn" id="grck">Check answers</button></div><div class="row"><button class="btn alt" id="grbk">Back</button></div>`;
  const orderDraw = (i) => {
    const box = app.querySelector(`.gr-ord[data-i="${i}"]`), s = ans[i] || [];
    box.querySelector(".gr-built").innerHTML = s.map((j) => `<button class="gr-tok" data-j="${j}">${esc(toks[i][j])}</button>`).join("");
    box.querySelector(".gr-bank").innerHTML = toks[i].map((w, j) => `<button class="gr-tok${s.includes(j) ? " used" : ""}" data-j="${j}"${s.includes(j) ? ' tabindex="-1" aria-hidden="true"' : ""}>${esc(w)}</button>`).join("");
  };
  items.forEach((it, i) => {
    if (it.t !== "order") return;
    ans[i] = []; orderDraw(i);
    app.querySelector(`.gr-ord[data-i="${i}"]`).onclick = (e) => {
      const b = e.target.closest(".gr-tok"); if (!b || done) return;
      const j = +b.dataset.j;
      if (b.closest(".gr-built")) ans[i] = ans[i].filter((x) => x !== j);
      else if (!ans[i].includes(j)) ans[i].push(j);
      orderDraw(i);
    };
  });
  app.querySelectorAll(".opt[data-k]").forEach((b) => b.onclick = () => {
    if (done) return;
    const i = +b.dataset.i; ans[i] = +b.dataset.k;
    app.querySelectorAll(`.opt[data-i="${i}"]`).forEach((x) => x.classList.toggle("sel", x === b));
  });
  document.getElementById("grbk").onclick = goBack;
  document.getElementById("grck").onclick = (ev) => {
    if (done) return;
    done = true; ev.target.disabled = true;
    let ok = 0, tot = 0;
    items.forEach((it, i) => {
      const el = app.querySelector(`.gr-it[data-i="${i}"]`), fb = el.querySelector(".gr-fb");
      let good = null, correct = "", mine = "";
      if (it.t === "choice") {
        good = ans[i] === it.answer; correct = "ABCD"[it.answer] + ". " + it.options[it.answer];
        el.querySelectorAll(".opt").forEach((x) => { const k = +x.dataset.k; x.classList.add("locked"); x.classList.remove("sel"); if (k === it.answer) x.classList.add("good"); else if (k === ans[i]) x.classList.add("bad"); });
      } else if (it.t === "typed") {
        const inp = el.querySelector(".gr-in"), acc = (it.answers || [it.answer]);
        mine = inp.value.trim(); good = acc.map(grN).includes(grN(mine)); correct = acc[0];
        inp.disabled = true; inp.classList.add(good ? "ok" : "bad");
      } else if (it.t === "order") {
        const built = (ans[i] || []).map((j) => toks[i][j]).join(" "), acc = (it.answers || [it.answer]);
        good = acc.map(grN).includes(grN(built)); correct = acc[0]; mine = built;
        el.querySelectorAll(".gr-tok").forEach((x) => { x.disabled = true; });
      } else if (it.t === "write") {
        el.querySelector(".gr-ta").disabled = true;
      }
      fb.hidden = false;
      if (good === null) {
        fb.className = "gr-fb nt";
        fb.innerHTML = `<b>Model answer</b><br>${grEm(it.model || "")}${it.explain ? `<br>${grEm(it.explain)}` : ""}`;
      } else {
        tot++; if (good) ok++;
        fb.className = "gr-fb" + (good ? " ok" : "");
        fb.innerHTML = `<b>${good ? "Correct." : "Not quite."}</b>${good ? "" : ` Correct answer: <b>${esc(correct)}</b>.${it.t === "choice" ? "" : ` Your answer: ${esc(mine || "(empty)")}.`}${it.t === "choice" && ans[i] == null ? " You didn't choose an answer." : ""}`}${it.explain ? ` ${grEm(it.explain)}` : ""}`;
      }
    });
    const pc = tot ? 100 * ok / tot : 0, passed = test && tot > 0 && pc >= cfg.pass - 1e-9;
    if (cfg.onCheck) cfg.onCheck(ok, tot, pc, passed);
    guard = false;
    const sc = document.getElementById("grs"); sc.hidden = false;
    const again = `<div class="row" style="margin:12px 0 0"><button class="btn alt" id="gra">${test ? "Retake" : "Try again"}</button></div>`;
    sc.innerHTML = test
      ? `<div class="big">${ok} / ${tot}</div><p class="muted" style="margin:6px 0 0">${Math.round(pc)}% \u00B7 pass mark ${cfg.pass}%</p><p class="${passed ? "ok" : "warn"}" style="margin:8px 0 0"><b>${passed ? "Passed \u2713" : "Not passed yet"}</b>${passed ? "" : " Read the feedback below, then try again."}</p>${again}`
      : `<b>Score: ${ok} / ${tot}</b>${again}`;
    document.getElementById("gra").onclick = () => swap(() => grRunPage(cfg));
    if (typeof shell == "function") shell();
    if (sc.scrollIntoView) sc.scrollIntoView({ block: "center" });
  };
}
