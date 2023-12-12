
export default async props => {
  const { path, extraction, mainPackage, index } = props
  const payload = []


  if (!mainPackage || !mainPackage.usage) {
    return { payload, name: 'Usage', id: 'usage', }
  }

  const { howTo, template, parameters } = mainPackage.usage
  payload.push({
    h2: 'Usage'
  })

  payload.push({
    h3: 'Template'
  })

  payload.push({
    code: {
      "language": "json",
      "content": JSON.stringify(template)
    }
  })

  payload.push({
    h3: 'Parameters'
  })

  // payload.push({
  //   code: {
  //     "language": "json",
  //     "content": JSON.stringify(parameters)
  //   }
  // })

  if (parameters && parameters.length) {
    const rows = []
    parameters.forEach(param => {
      const { id, prompt, } = param
      const { type, name, message, vacuity, validators } = prompt
      rows.push([
        type,
        id,
        message ? message : "",
        prompt.default ? prompt.default : "",
        vacuity ? vacuity : ""
      ])
    })
    if (rows && rows.length) {
      payload.push({
        table: {
          headers: ["type", "id", "Message", "Default value", "vacuity"],
          rows
        }
      })
    }
  } else {
    payload.push({
      p: 'No parameters'
    })
  }

  return { payload, name: 'Usage', id: 'usage', }
}
