/*  SFI Spec Search — client-side, no backend needed  */
(function () {
  var input = document.getElementById('sfi-search-input');
  var btn = document.getElementById('sfi-search-btn');
  var results = document.getElementById('sfi-search-results');
  var count = document.getElementById('sfi-search-count');
  if (!input || !btn || typeof SFI_SPECS === 'undefined') return;

  function doSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q) {
      results.style.display = 'none';
      count.style.display = 'none';
      return;
    }

    var terms = q.split(/\s+/);
    var matches = SFI_SPECS.filter(function (s) {
      var blob = (
        s.product_name + ' ' +
        s.category + ' ' +
        s.subcategory + ' ' +
        s.spec_numbers.join(' ') + ' ' +
        s.effective_date
      ).toLowerCase();
      return terms.every(function (t) { return blob.indexOf(t) !== -1; });
    });

    count.style.display = 'block';
    count.textContent = matches.length + ' result' + (matches.length !== 1 ? 's' : '') + ' found';

    if (matches.length === 0) {
      results.style.display = 'block';
      results.innerHTML = '<p style="color:#888; font-size:13px; padding:8px 0;">No specs matched your search. Try a different keyword.</p>';
      return;
    }

    var html = '<table style="width:100%; border-collapse:collapse; font-size:13px;">';
    html += '<tr style="background:#e8f0f8; font-weight:bold; color:#333;">';
    html += '<td style="padding:8px 10px; border-bottom:2px solid #269cd8;">Spec</td>';
    html += '<td style="padding:8px 10px; border-bottom:2px solid #269cd8;">Product</td>';
    html += '<td style="padding:8px 10px; border-bottom:2px solid #269cd8;">Category</td>';
    html += '<td style="padding:8px 10px; border-bottom:2px solid #269cd8;">Effective Date</td>';
    html += '<td style="padding:8px 10px; border-bottom:2px solid #269cd8;">Links</td>';
    html += '</tr>';

    matches.forEach(function (s, i) {
      var bg = i % 2 === 0 ? '#fff' : '#f9fbfd';
      var specNums = s.spec_numbers.map(function (n) { return 'SFI ' + n; }).join(', ');

      var links = [];
      if (s.spec_pdfs.length > 0) {
        links.push('<a href="https://www.sfifoundation.com/wp-content/pdfs/specs/' + s.spec_pdfs[0] + '" target="_blank" style="color:#269cd8; text-decoration:none;">Spec PDF</a>');
      }
      if (s.manufacturer_pdfs.length > 0) {
        links.push('<a href="https://www.sfifoundation.com/wp-content/pdfs/manufacturers/' + encodeURIComponent(s.manufacturer_pdfs[0]) + '" target="_blank" style="color:#269cd8; text-decoration:none;">Manufacturers</a>');
      }

      html += '<tr style="background:' + bg + ';">';
      html += '<td style="padding:7px 10px; border-bottom:1px solid #eee; white-space:nowrap; font-weight:bold; color:#269cd8;">' + specNums + '</td>';
      html += '<td style="padding:7px 10px; border-bottom:1px solid #eee; color:#444;">' + s.product_name + '</td>';
      html += '<td style="padding:7px 10px; border-bottom:1px solid #eee; color:#888;">' + s.category + '</td>';
      html += '<td style="padding:7px 10px; border-bottom:1px solid #eee; color:#888; white-space:nowrap;">' + (s.effective_date || '—') + '</td>';
      html += '<td style="padding:7px 10px; border-bottom:1px solid #eee;">' + (links.join(' | ') || '—') + '</td>';
      html += '</tr>';
    });

    html += '</table>';
    results.innerHTML = html;
    results.style.display = 'block';
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') doSearch();
  });

  // Clear results when input is emptied
  input.addEventListener('input', function () {
    if (!input.value.trim()) {
      results.style.display = 'none';
      count.style.display = 'none';
    }
  });
})();
