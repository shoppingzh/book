const modules = import.meta.glob('./*.{png,jpg}', { eager: true, import: 'default' })

function basename(filename: string) {
  if (!filename) return filename
  const parts = filename.split('.')
  return parts.slice(0, parts.length - 1).join('.')
}

export default Object.entries(modules).reduce((map, [path, module]) => {
  const parts = path.split('/')
  map[basename(parts[parts.length - 1])] = module
  return map
}, {} as Record<string, string>)
