export default function cloudflareLoaderImage({src, width, quality}: {src: string, width: string | number, quality?: number}){
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto']
  return `https://tuanpc.site/cdn-cgi/image/${params.join(',')}/${src}`
}