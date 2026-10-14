# uso: python3 tests/mkicons.py X Y SIZE  (recorte cuadrado en raw/corona_icon.png)
import sys; from PIL import Image, ImageFilter
x,y,s=map(int,sys.argv[1:4]); im=Image.open('raw/corona_icon.png').convert('RGB').crop((x,y,x+s,y+s))
big=im.resize((1024,1024),Image.LANCZOS).filter(ImageFilter.UnsharpMask(2,60,2))
import os; os.makedirs('icons',exist_ok=True)
for n,z in [('icon-v2-512',512),('icon-v2-192',192),('apple-touch-icon-v2',180),('favicon-v2',64)]:
    big.resize((z,z),Image.LANCZOS).save(f'icons/{n}.png',optimize=True)
bg=big.resize((512,512)).filter(ImageFilter.GaussianBlur(30)); bg.paste(big.resize((400,400),Image.LANCZOS),(56,56))
bg.save('icons/icon-v2-maskable-512.png',optimize=True)
