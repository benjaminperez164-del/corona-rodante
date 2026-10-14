import asyncio
from playwright.async_api import async_playwright
URL='http://127.0.0.1:8811/index.html?nofs'
ARGS=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS, timeout=600000)
        for name,w,h in [('portrait',390,844),('land',844,390)]:
            ctx = await b.new_context(viewport={'width':w,'height':h}, has_touch=True, is_mobile=True)
            await ctx.add_init_script("localStorage.setItem('__x','1')")
            pg = await ctx.new_page(); errs=[]
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.on('console', lambda m: m.type=='error' and errs.append(m.text))
            pg.set_default_timeout(300000); await pg.goto(URL, timeout=300000); await pg.wait_for_timeout(2500)
            await pg.evaluate("try{const s=JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>k.includes('corona'))||'{}'))}catch(e){}")
            await pg.evaluate("document.getElementById('btn-portrait')&&document.getElementById('btn-portrait').click(); const t=document.getElementById('tutorial'); ")
            await pg.wait_for_timeout(500)
            info = await pg.evaluate("""(ids)=>ids.map(i=>{const r=document.getElementById(i).getBoundingClientRect();return [i,Math.round(r.top),Math.round(r.bottom),Math.round(r.height),Math.round(r.width)]})""", ['btn-play','btn-practice','btn-daily','btn-shop','btn-achievements','btn-options'])
            print(name,'title',info)
            await pg.screenshot(path=f'screenshots/v05_menu_{name}.png')
            await pg.evaluate("__game.startPractice()"); await pg.wait_for_timeout(600)
            await pg.evaluate("document.getElementById('tutorial').click()")
            await pg.evaluate("__game.manual(true); __game.step(240,{x:0.3,z:-1})")
            await pg.evaluate("__game.input.override={x:0,z:0}; __game.manual(false)")
            await pg.wait_for_timeout(1500)
            print(name, await pg.evaluate("__game.state()"))
            await pg.screenshot(path=f'screenshots/v05_patio_{name}.png')
            # caída forzada: debe reaparecer al centro sin muerte
            await pg.evaluate("__game.teleport(0,-20,-15); __game.manual(true); __game.step(10)")
            print(name,'after fall', await pg.evaluate("__game.state()"))
            await pg.evaluate("__game.manual(false); __game.pause()"); await pg.wait_for_timeout(600)
            info = await pg.evaluate("""(ids)=>ids.map(i=>{const r=document.getElementById(i).getBoundingClientRect();return [i,Math.round(r.top),Math.round(r.bottom),Math.round(r.height),Math.round(r.width)]})""", ['btn-resume','btn-restart','btn-levels','btn-pause-opts','btn-exit'])
            print(name,'pause',info)
            await pg.screenshot(path=f'screenshots/v05_pausa_{name}.png')
            await pg.click('#btn-exit'); await pg.wait_for_timeout(800)
            print(name,'exit', await pg.evaluate("__game.state()"))
            await pg.evaluate("__game.start(3)"); await pg.wait_for_timeout(500)
            await pg.evaluate("__game.pause()"); await pg.wait_for_timeout(500)
            await pg.screenshot(path=f'screenshots/v05_pausa_nivel_{name}.png')
            print(name,'ERRORS',errs)
            await ctx.close()
        await b.close()
asyncio.run(main())
