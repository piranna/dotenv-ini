const {readFileSync} = require("fs")
const {resolve} = require("path")

const {parse} = require('ini')


function loadIntoEnv(parsed)
{
  const {env} = process
  for(const key in parsed)
    if(!env.hasOwnProperty(key))
    {
      const value = parsed[key]

      env[key] = typeof value === 'string' ? value : JSON.stringify(value)
    }
}


module.exports = function dotenvIni(
  {
    encoding = 'utf8',
    intoEnv = true,
    path = '.env.ini'
  } = {}
){
  try
  {
    const parsed = parse(readFileSync(path, {encoding}))

    intoEnv !== false && loadIntoEnv(parsed)

    return {parsed}
  }
  catch(error)
  {
    return {error}
  }
}
