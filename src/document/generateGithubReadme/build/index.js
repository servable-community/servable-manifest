import { ProtocolEnum } from "../../../manifest/enums.js"
// import append from "../utils/builder/append.js"
import access from '../../../manifest/access/index.js'
import buildSeed from '../../chunks/build/protocol/seed.js'
import buildProtocolClass from '../../chunks/build/protocol/class.js'
import buildConfig from '../../chunks/build/protocol/config.js'
import buildLiveClasses from '../../chunks/build/protocol/liveClasses.js'
import buildAfterInit from '../../chunks/build/protocol/afterInit.js'
import buildBeforeInit from '../../chunks/build/protocol/beforeInit.js'
import buildFunctions from '../../chunks/build/protocol/functions.js'
import buildSchema from '../../chunks/build/protocol/schema.js'
import buildSystem from '../../chunks/build/protocol/system.js'
import buildLib from '../../chunks/build/protocol/lib.js'
import buildGithubTags from './chunks/githubTags.js'
import buildRegistry from './chunks/registry.js'
import buildInstall from './chunks/install.js'
import buildUsage from './chunks/usage.js'
import buildTriggers from '../../chunks/build/protocol/triggers.js'


export default async props => {
  const { path, includeChunksInMain = true } = props
  let payload = []
  const chunks = {}
  let extraction = null
  let githubPackageName = null
  let npmPackageName = null
  let mainPackage = null

  let index = await access({
    item: ProtocolEnum.Index,
    extraction,
    path
  })

  if (index && index.data && index.data.module) {
    const { packages } = index.data.module
    mainPackage = packages.filter(a => a.type === 'main')[0]
    const { name, description, id, version, } = mainPackage

    payload.push({ h1: `${name} protocol` })
    payload.push({ p: `${id}, #${version}` })

    npmPackageName = id
    if (mainPackage.github && mainPackage.github.id) {
      githubPackageName = mainPackage.github.id
    } else if (npmPackageName) {
      githubPackageName = npmPackageName.replace('@')
    }
  }

  let icon = await access({
    item: ProtocolEnum.Assets.Icon,
    // variant: ProtocolEnum.Assets.Icon.variants.x2,
    mimeType: ProtocolEnum.Assets.Icon.mimeTypes.SVG,
    extraction,
    path
  })

  // if (icon && icon.data && icon.data.module) {
  if (icon && icon.data && icon.data.module) {
    const data = icon.data.module.replace('<svg ', '<svg width="100px" height="100px" ')
    payload.push({
      // p: icon.data.module,
      p: data
    })
  }
  else {
    icon = await access({
      item: ProtocolEnum.Assets.Icon,
      variant: ProtocolEnum.Assets.Icon.variants.x2,
      mimeType: ProtocolEnum.Assets.Icon.mimeTypes.PNG,
      extraction,
      path
    })
    if (icon && icon.data && icon.data.module && icon.data.module.base64) {
      payload.push({
        img: {
          title: 'icon',
          source: `${icon.data.module.base64}`,
          alt: 'icon',
          style: { width: "20px" }
        }
      })
    }
  }

  chunks.githubTags = await buildGithubTags({ path, npmPackageName, githubPackageName })
  // payload.push({ h2: chunks.githubTags.name })
  payload = payload.concat(chunks.githubTags.payload)


  chunks.registry = await buildRegistry({ path, mainPackage, index })
  // payload.push({ h2: chunks.githubTags.name })
  payload = payload.concat(chunks.registry.payload)




  if (index && index.data && index.data.documentation) {
    payload.push({ p: index.data.documentation })
    // payload.push({ p: '' })
  } else if (index && index.data && index.data.module) {
    payload.push({ p: description })
  }

  chunks.install = await buildInstall({ path, npmPackageName, githubPackageName })
  // payload.push({ h2: chunks.githubTags.name })
  payload = payload.concat(chunks.install.payload)

  chunks.usage = await buildUsage({ path, mainPackage, index })
  // payload.push({ h2: chunks.githubTags.name })
  payload = payload.concat(chunks.usage.payload)

  payload.push({ hr: `` })
  payload.push({ p: `*Generated documentation below*` })

  chunks.seed = await buildSeed({ path })
  payload.push({ h2: chunks.seed.name })
  payload = payload.concat(chunks.seed.payload)



  chunks.protocolClass = await buildProtocolClass({ path })
  payload.push({ h2: chunks.protocolClass.name })
  payload = payload.concat(chunks.protocolClass.payload)

  chunks.beforeInit = await buildBeforeInit({ path })
  payload.push({ h2: chunks.beforeInit.name })
  payload = payload.concat(chunks.beforeInit.payload)

  chunks.afterInit = await buildAfterInit({ path })
  payload.push({ h2: chunks.afterInit.name })
  payload = payload.concat(chunks.afterInit.payload)

  chunks.config = await buildConfig({ path })
  payload.push({ h2: chunks.config.name })
  payload = payload.concat(chunks.config.payload)

  chunks.functions = await buildFunctions({ path })
  payload.push({ h2: chunks.functions.name })
  payload = payload.concat(chunks.functions.payload)

  chunks.liveClasses = await buildLiveClasses({ path })
  payload.push({ h2: chunks.liveClasses.name })
  payload = payload.concat(chunks.liveClasses.payload)

  chunks.schema = await buildSchema({ path })
  payload.push({ h2: chunks.schema.name })
  payload = payload.concat(chunks.schema.payload)

  chunks.system = await buildSystem({ path })
  payload.push({ h2: chunks.system.name })
  payload = payload.concat(chunks.system.payload)

  chunks.lib = await buildLib({ path })
  payload.push({ h2: chunks.lib.name })
  payload = payload.concat(chunks.lib.payload)

  chunks.triggers = await buildTriggers({ path })
  payload.push({ h2: chunks.triggers.name })
  payload = payload.concat(chunks.triggers.payload)

  payload = payload.filter(a => a)




  return {
    payload,
    chunks,
  }
}
