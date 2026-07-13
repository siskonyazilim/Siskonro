@echo off
echo Siskon Next.js Projesi Baslatiliyor...
echo.

REM Node modules yoksa, yukle
if not exist "node_modules" (
  echo Dependencies yukleniyor...
  call npm install
)

echo.
echo Sunucu baslaniyor: http://localhost:3000
echo Kontrolu sonlandir: Ctrl + C
echo.

call npm run dev
pause
