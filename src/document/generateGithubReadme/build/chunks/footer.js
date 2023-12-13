
export default async props => {

  const payload = []

  payload.push({
    h2: 'Resources'
  })

  payload.push({
    h3: 'Servable Documentation'
  })
  payload.push({
    p: 'You can find here the complete [servable documentation](https://documentation.servablecommunity.com/) with guides and api reference.'
  })

  payload.push({
    h3: 'Servable Registry'
  })
  payload.push({
    p: 'You can find other Servable  protocols at the [Servable registry](https://registry.servablecommunity.com/)'
  })


  payload.push({
    h3: 'License'
  })
  payload.push({
    p: 'MIT © [servable-community](https://github.com/servable-community)'
  })

  return { payload, name: 'Footer', id: 'footer', }
}
