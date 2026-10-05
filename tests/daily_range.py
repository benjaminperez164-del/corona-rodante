import asyncio, sys
from datetime import date, timedelta
from playwright.async_api import async_playwright
URL='http://127.0.0.1:8811/index.html'
ARGS=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
N = int(sys.argv[1]) if len(sys.argv)>1 else 30
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS)
        pg = await (await b.new_context(viewport={'width':960,'height':540})).new_page()
        errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(2000)
        await pg.evaluate("__game.resetSave()")
        start = date(2026, 10, 5)
        fails=[]
        for i in range(N):
            d = (start + timedelta(days=i)).isoformat()
            info = await pg.evaluate(f"__game.startDaily('{d}')")
            await pg.wait_for_timeout(200)
            await pg.evaluate("__game.manual(true)")
            r = await pg.evaluate("__game.runBot(300)")
            await pg.evaluate("__game.manual(false)")
            ok = r.get('state')=='won'
            print(f"{d} base={info['baseIndex']:2d} {info['name'][:22]:22s} twist={info['twist']} -> {r.get('state')} t={r.get('time')} d={r.get('deaths')}")
            if not ok: fails.append((d, r))
        print('FAILS', len(fails), fails[:5])
        print('errors', errs[:10])
        await b.close()
        if fails: sys.exit(1)
asyncio.run(main())
