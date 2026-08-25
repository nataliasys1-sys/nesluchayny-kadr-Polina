# Локальный просмотр сайта — двойной клик или: powershell -ExecutionPolicy Bypass -File start-site.ps1
$root = $PSScriptRoot
$port = 3000

for ($p = 3000; $p -le 3010; $p++) {
  try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://127.0.0.1:$p/")
    $listener.Start()
    $port = $p
    break
  } catch {
    if ($p -eq 3010) { Write-Host "Не удалось найти свободный порт." -ForegroundColor Red; pause; exit 1 }
  }
}

$url = "http://127.0.0.1:$port/"
Write-Host ""
Write-Host "  Сайт запущен: $url" -ForegroundColor Green
Write-Host "  Папка: $root"
Write-Host "  Закройте это окно, чтобы остановить сервер."
Write-Host ""

Start-Process $url

function Get-Mime([string]$path) {
  switch -Regex ($path.ToLower()) {
    '\.css$' { return 'text/css; charset=utf-8' }
    '\.js$' { return 'application/javascript; charset=utf-8' }
    '\.html$' { return 'text/html; charset=utf-8' }
    '\.png$' { return 'image/png' }
    '\.jpe?g$' { return 'image/jpeg' }
    '\.webp$' { return 'image/webp' }
    default { return 'application/octet-stream' }
  }
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath)
  if ($path -eq '/') { $path = '/index.html' }
  $file = Join-Path $root ($path.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar))
  if (Test-Path $file -PathType Leaf) {
    $bytes = [IO.File]::ReadAllBytes($file)
    $ctx.Response.ContentType = Get-Mime $file
    $ctx.Response.StatusCode = 200
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
    $msg = [Text.Encoding]::UTF8.GetBytes("404: $path")
    $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $ctx.Response.Close()
}
