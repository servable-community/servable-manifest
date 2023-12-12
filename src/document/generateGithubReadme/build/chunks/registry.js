
export default async props => {
  const { path, extraction, mainPackage, index } = props
  const payload = []


  if (!index.data.module || !index.data.module.registry) {
    return { payload, name: 'Registry', id: 'registry', }
  }

  const { name, description, id, version, } = mainPackage
  payload.push({
    h3: 'Available in Servable registry'
  })

  // payload.push({
  //   img: {
  //     source: 'https://api.cdn.registry.servablecommunity.com/assets/logo.png'
  //   }
  // })

  payload.push({
    p: '<img src="https://cdn.registry.servablecommunity.com/assets/logo.png" alt="drawing" style="width:50px;" />'
  })

  payload.push({
    p: `${id} is available at [servable registry](https://registry.servablecommunity.com/protocol/${index.data.module.registry.id}).`
  })

  payload.push({
    p: '**Use in your servable project:**'
  })

  payload.push({
    code: {
      "language": "bash",
      "content": `yo servable -t useprotocol --protocolid ${index.data.module.registry.id}`
    }
  })

  return { payload, name: 'Registry', id: 'registry', }
}