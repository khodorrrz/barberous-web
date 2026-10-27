// Run using browser_run_code (filename) against the local preview.
async (page) => {
  await page.route('**/*', route => route.continue());
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const expected = {hairBeard:'$20',haircut:'$13',beardTrim:'$7',juniorHaircut:'$10',hairStyling:'$5',basicColor:'$100',keratin:'$50',beardColor:'$15',faceMask:'$7',eyebrows:'$6',wax:'$7',grooming:'$30'};
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { await Promise.all([...document.images].map(img => { img.loading='eager'; return img.decode().catch(() => {}); })); });
  check(await page.locator('html').getAttribute('lang') === 'en', 'English must be the default');
  check(await page.locator('img[src*="haircut-"], .gallery, #work, a[href="#work"]').count() === 0, 'Haircut imagery and gallery links must be removed');
  check(await page.locator('.owner-portrait, img[src*="elie-chehade-portrait"]').count() === 0, 'Barber portrait must be removed');
  check(await page.locator('.barber-bio').count() === 2, 'Keep both barber introductions');
  check(await page.locator('.menu-category').count() === 4, 'Four categories required');
  check(await page.locator('.menu-item').count() === 12, 'Twelve services required');
  const sizes = [];
  for (const lang of ['en','ar']) {
    if (lang === 'ar') await page.locator('.language-switch').click();
    check(await page.locator('html').getAttribute('dir') === (lang === 'ar' ? 'rtl' : 'ltr'), 'Wrong direction');
    const rows = await page.locator('.menu-item').evaluateAll(nodes => nodes.map(node => ({key:node.dataset.whatsapp,price:node.querySelector('.menu-price').textContent,dir:node.querySelector('.menu-price').dir,label:node.querySelector('[data-i18n]').textContent,url:node.href})));
    for (const row of rows) {
      check(row.price === expected[row.key], `${lang} wrong price for ${row.key}`);
      check(row.dir === 'ltr', 'Price direction must remain LTR');
      const url = new URL(row.url), message = url.searchParams.get('text');
      check(url.hostname === 'wa.me' && url.pathname === '/96170576915', 'Wrong WhatsApp recipient');
      check(message.includes(row.label) && !message.includes('undefined') && !message.includes('{service}'), `${lang} wrong request for ${row.key}`);
    }
    const bundle = await page.locator('[data-whatsapp="grooming"] small').textContent();
    check(lang === 'en' ? ['Haircut','beard','nails','face mask'].every(word => bundle.includes(word)) : ['الشعر','اللحية','الأظافر','وجه'].every(word => bundle.includes(word)), 'Package contents missing');
    for (const width of [320,375,390,760,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      const size = await page.evaluate(() => ({viewport:document.documentElement.clientWidth,body:document.documentElement.scrollWidth}));
      check(size.body <= size.viewport, `${lang} overflow at ${width}`);
      const columns = await page.locator('.menu-category-inner').first().evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
      check(columns === (width<=760 ? 1 : 2), `Wrong menu columns at ${width}`);
      if (width<=760) {
        const sections = await page.locator('.menu-category').evaluateAll(nodes => nodes.map(node => ({left:node.getBoundingClientRect().left,right:node.getBoundingClientRect().right,gap:parseFloat(getComputedStyle(node).marginBottom),border:getComputedStyle(node).borderTopWidth})));
        check(sections.every(section => section.left>=15.5 && section.right<=width-15.5 && section.gap>=14 && parseFloat(section.border)>=0.5), `Mobile categories need visible boundaries and spacing at ${width}`);
      }
      sizes.push(`${lang}:${width}`);
    }
    const shades = await page.locator('.menu-category').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
    check(shades[0] === 'rgb(24, 24, 24)' && shades[2] === shades[0] && shades[1] !== shades[0] && shades[3] === shades[1], 'Charcoal must alternate across categories');
    await page.setViewportSize({width:390,height:844});
    await page.locator('.menu-toggle').click();
    check(await page.locator('#mobile-nav').isVisible(), 'Mobile menu must open');
    await page.keyboard.press('Escape');
    check(await page.locator('#mobile-nav').isHidden(), 'Escape must close menu');
    await page.locator('.menu-toggle').click();
    await page.locator('#mobile-nav a[href="#services"]').click();
    check(await page.locator('#mobile-nav').isHidden(), 'Navigation must close menu');
    check(await page.locator('.mobile-book').count() === 0, 'Fixed mobile bar must stay removed');
    await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`C:/Users/khodor/Desktop/Barberous/barberous-web/.impeccable/qa/${lang}-mobile.png`,fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`C:/Users/khodor/Desktop/Barberous/barberous-web/.impeccable/qa/${lang}-desktop.png`,fullPage:true});
  }
  await page.reload();
  check(await page.locator('html').getAttribute('lang') === 'ar', 'Language must persist');
  await page.locator('.language-switch').click();
  check((await page.locator('h1').textContent()).includes('Your style.'), 'English restoration failed');
  check(!errors.length, errors.join('; '));
  return {status:'PASS',categories:4,services:12,prices:Object.values(expected),sizes,checks:['all USD prices in both languages','12 localized service requests','package contents','haircut imagery removed','reference charcoal','mobile navigation','RTL and persistence','no overflow or browser errors']};
}
