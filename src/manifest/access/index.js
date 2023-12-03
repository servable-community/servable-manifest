import extract from '../extract/index.js'
import accessChildInTreeWithRoute from './accessChildInTreeWithRoute.js'
import sanitizePath from 'path-sanitizer'



export default async (props) => {
  const {
    path,
    extraction,
    variant,
    mimeType,
    item,
    type,
    formatData = true
  } = props

  if (!props.extraction && path) {
    props.extraction = await extract({ path: `/${sanitizePath(path)}`, dataTemplateType: type })
  }

  if (!props.extraction) {
    return null
  }

  const { reference, tree } = props.extraction
  const result = accessChildInTreeWithRoute({ item, tree })
  if (!result) {
    return null
  }

  if (formatData && result.data) {
    switch (result.type) {
      default: break
      case 'file': {
        if (!result.data.length) {
          break
        }
        if (mimeType) {
          let candidates = result.data.filter(a => a.mimeType === mimeType)
          result.data = candidates
        }
        if (variant) {
          let candidates = result.data.filter(a => a.variant === variant)
          if (candidates && candidates.length) {
            result.data = candidates[0]
          } else {
            result.data = null
          }
        }
        else {
          result.data = result.data[0]
        }
      } break
    }
  }

  return result
}
