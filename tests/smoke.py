import asyncio, json, sys
from playwright.async_api import async_playwright
URL='http://127.0.0.1:8811/index.html'
ARGS=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS)
        ctx = await b.new_context(viewport={'width':1280,'height':720})
        pg = await ctx.new_page(); errs=[]
        pg.on('console', lambda m: errs.append((m.type, m.text)) if m.type in ('error','warning') else None)
        pg.on('pageerror', lambda e: errs.append(('pageerror', str(e))))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.screenshot(path='screenshots/_smoke_title.png')
        await pg.evaluate("__game.resetSave()")
        for lv in [int(a) for a in sys.argv[1:]] or list(range(56)):
            await pg.evaluate(f"__game.start({lv})"); await pg.wait_for_timeout(600)
            await pg.evaluate("__game.manual(true)")
            r = await pg.evaluate("__game.runBot(300)")
            print('level', lv, r)
            await pg.evaluate("__game.manual(false)")
            await pg.wait_for_timeout(1800)
            await pg.screenshot(path=f'screenshots/_smoke_l{lv}.png')
        print('errors', errs[:20])
        await b.close()
asyncio.run(main())
