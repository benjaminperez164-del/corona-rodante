import asyncio, sys, json
from playwright.async_api import async_playwright
URL='http://127.0.0.1:8811/index.html'
ARGS=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']
lv=int(sys.argv[1]); secs=float(sys.argv[2]) if len(sys.argv)>2 else 6
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS)
        pg = await (await b.new_context(viewport={'width':800,'height':450})).new_page()
        pg.on('pageerror', lambda e: print('ERR', e))
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        await pg.evaluate(f"__game.start({lv})"); await pg.wait_for_timeout(300)
        out = await pg.evaluate("""(secs)=>{const g=__game; g.manual(true); g.bot(true); const r=[]; 
          for(let k=0;k<secs*120;k++){ g.step(1); if(k%6==0){const s=g.state(); r.push([+(k/120).toFixed(2), s.pos, g.G.bot? g.G.bot.i:0, s.grounded?1:0, s.dead?1:0, g.ball.vel.toArray().map(v=>+v.toFixed(1))]);} if(g.G.state!=='play')break;} return r;}""", secs)
        for row in out: print(row)
        await b.close()
asyncio.run(main())
