import handleProtocolInClass from './handleProtocolInClass.js'
import adaptProtocolPayload from '../../../../../../utils/adaptProtocolPayload.js'
import extractProtocolsProtocols from './extractProtocolsProtocols.js'
import cleanProtocols from '../../../../../../utils/cleanProtocols.js'


export default async (props) => {
  const {
    protocol,
    item,
    protocolsPayloadLibrary,
    options
  } = props

  const { className } = item

  try {

    const _class = await protocol.loader.getClass({ className })
    // if (!_class) {
    //     return { item }
    // }

    let classProtocols = await protocol.loader.classProtocols({
      className,
      withProtocolsProtocols: false
    })

    if (!classProtocols || !classProtocols.length) {
      // console.log('noclassProtocols', protocol.id)
      return { item }
    }

    classProtocols = classProtocols.map(adaptProtocolPayload)

    if (!classProtocols || !classProtocols.length) {
      return { item }
    }

    let protocolsProtocols = await extractProtocolsProtocols({ ...props, classProtocols })
    let protocols = cleanProtocols([...classProtocols, ...protocolsProtocols])


    let _item = { ...item }
    const Bluebird = (await import("bluebird")).default
    await Bluebird.Promise.mapSeries(protocols,
      async (protocolItem) => {
        const protocol = await protocolsPayloadLibrary(protocolItem)
        _item = await handleProtocolInClass({
          protocol,
          item: _item
        })
      })
    return {
      item: _item,
      protocolsProtocols,
      classProtocols,
      protocols,
      _class
    }
  } catch (e) {
    console.error(e)
  }

  return { item }
}
