import asyncio, sys
from playwright.async_api import async_playwright
URL='http://127.0.0.1:8811/index.html'
ARGS=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']
# uso: shot.py nivel segundos_bot salida [w h]
lv=int(sys.argv[1]); secs=float(sys.argv[2]); out=sys.argv[3]
w=int(sys.argv[4]) if len(sys.argv)>4 else 960; h=int(sys.argv[5]) if len(sys.argv)>5 else 540
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS)
        pg = await (await b.new_context(viewport={'width':w,'height':h})).new_page()
        pg.on('pageerror', lambda e: print('ERR', e))
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        await pg.evaluate(f"__game.start({lv})"); await pg.wait_for_timeout(300)
        await pg.evaluate("__game.manual(true); __game.bot(true)")
        await pg.evaluate(f"__game.step({int(secs*120)})")
        await pg.evaluate("__game.G.bot=null; __game.input.override={x:0,z:0}; __game.manual(false)")
        await pg.wait_for_timeout(1500)
        print(await pg.evaluate("__game.state()"))
        await pg.screenshot(path=out)
        await b.close()
asyncio.run(main())
