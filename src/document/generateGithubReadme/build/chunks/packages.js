import _githubPackage from "./_githubPackage.js"

export default async props => {
  const { packages, } = props
  const payload = []


  const otherpackages = packages.filter(a => a.type !== 'main')
  if (!otherpackages || !otherpackages.length) {
    return { payload, name: 'Packages', id: 'packages', }
  }

  payload.push({
    h3: 'Companion packages'
  })

  otherpackages.forEach(p => {
    if (!p.repository) {
      return
    }

    payload.push(_githubPackage({ username: p.username, name: p.name }))
  })

  return { payload, name: 'Packages', id: 'packages', }
}
