import buildProtocol from './build/protocol/index.js'
import writeProtocol from './write/protocol/index.js'


export default async props => {
  const { path, write = false, includeAuxiliary = true } = props
  const item = await buildProtocol({ path })
  if (write) {
    const written = await writeProtocol({ item, path, includeAuxiliary })
  }

  return item
}
