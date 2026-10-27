// Run with the browser_run_code tool (filename) against the local preview.
async (page) => {
  // Routing disables the HTTP cache so a local edit is always under test.
  await page.route('**/*', route => route.continue());
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { await Promise.all([...document.images].map(img => { img.loading='eager'; return img.decode().catch(() => {}); })); });
  check(await page.locator('html').getAttribute('lang') === 'en', 'English must be the default');
  const imageCount = await page.locator('.gallery img').count();
  check(imageCount === 6, 'Gallery must include all six photos');
  const links = await page.locator('[data-whatsapp]').evaluateAll(nodes => nodes.map(n => ({service:n.dataset.whatsapp,url:n.href})));
  check(links.every(link => new URL(link.url).pathname === '/96170576915'), 'All WhatsApp links use the supplied number');
  for (const service of ['haircut','beard','wax']) {
    const link = links.find(link => link.service === service);
    check(new URL(link.url).searchParams.get('text').includes(service === 'wax' ? 'facial waxing' : service), 'Service message missing: '+service);
  }
  check(await page.locator('a[href^="https://maps.app.goo.gl/9kXkQLaUTHoh73pz9"]').count() === 1, 'Supplied map destination missing');
  check(await page.locator('a[href="tel:+96170576915"]').count() === 1, 'Phone number missing');
  check(await page.locator('a[href="https://www.instagram.com/barberous.byelie/"]').count() === 2, 'Instagram must appear in hero and contact');
  const sizes = [];
  for (const lang of ['en','ar']) {
    if (lang === 'ar') await page.locator('.language-switch').click();
    check(await page.locator('html').getAttribute('dir') === (lang === 'ar' ? 'rtl' : 'ltr'), 'Wrong document direction');
    for (const width of [320,375,390,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      const dimensions = await page.evaluate(() => ({viewport:document.documentElement.clientWidth,body:document.documentElement.scrollWidth}));
      check(dimensions.body <= dimensions.viewport, `${lang} overflows at ${width}: ${dimensions.body}`);
      // HTML source dimensions must not override the responsive display crop.
      const crops = await page.locator('.gallery img, .owner-portrait img').evaluateAll(nodes => nodes.map(img => ({ratio:img.clientWidth/img.clientHeight,height:img.clientHeight,expected:img.closest('.owner-portrait') ? 4/5 : innerWidth<=760 ? 3/4 : null})));
      check(crops.every(item => item.height>90 && item.height<650 && (item.expected===null || Math.abs(item.ratio-item.expected)<0.015)), `${lang} image crops wrong at ${width}`);
      const columns = await page.locator('.gallery').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
      check(columns===(width<=760 ? 2 : 4), `Wrong gallery column count at ${width}`);
      sizes.push(`${lang}:${width}`);
    }
    await page.setViewportSize({width:390,height:844});
    await page.locator('.menu-toggle').click();
    check(await page.locator('#mobile-nav').isVisible(), 'Mobile menu must open');
    await page.keyboard.press('Escape');
    check(await page.locator('#mobile-nav').isHidden(), 'Escape must close menu');
    check(await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false', 'Menu state must match visibility');
    await page.locator('.menu-toggle').click();
    await page.locator('#mobile-nav a[href="#services"]').click();
    check(await page.locator('#mobile-nav').isHidden(), 'Navigation must close menu');
    check(await page.locator('.mobile-book').isVisible(), 'Mobile booking action missing');
    await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`C:/Users/khodor/Desktop/Barberous/barberous-web/.impeccable/qa/${lang}-mobile.png`,fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`C:/Users/khodor/Desktop/Barberous/barberous-web/.impeccable/qa/${lang}-desktop.png`,fullPage:true});
  }
  check((await page.locator('h1').innerText()).includes('أسلوبك.'), 'Arabic headline missing');
  const arabicMessage = await page.locator('[data-whatsapp="haircut"]').getAttribute('href');
  check(new URL(arabicMessage).searchParams.get('text').includes('قصّ الشعر'), 'Arabic WhatsApp request missing');
  await page.reload();
  check(await page.locator('html').getAttribute('lang') === 'ar', 'Language choice must survive reload');
  await page.locator('.language-switch').click();
  check((await page.locator('h1').textContent()).includes('Your style.'), 'English restoration failed');
  await page.evaluate(async () => { await Promise.all([...document.images].map(img => { img.loading='eager'; return img.decode().catch(() => {}); })); });
  const brokenImages = await page.locator('img').evaluateAll(nodes => nodes.filter(img => !img.complete || !img.naturalWidth).map(img => img.src));
  check(!brokenImages.length, 'Broken images: '+brokenImages.join(', '));
  const loadedFonts = await page.evaluate(() => ({latin:document.fonts.check('600 16px Manrope'),arabic:document.fonts.check('400 16px "Noto Sans Arabic"')}));
  check(loadedFonts.latin && loadedFonts.arabic, 'Self-hosted fonts failed to load');
  check(!errors.length, 'Browser errors: '+errors.join('; '));
  await page.goto('http://127.0.0.1:4173/');
  return {status:'PASS',sizes,photos:imageCount,whatsappLinks:links.length,checks:['English default','RTL Arabic','language persistence','12 responsive width/language combinations','mobile menu, Escape and navigation','service-specific WhatsApp messages','correct map and phone','all images loaded','both fonts loaded','no browser errors'],loadedFonts};
}
