
/**
 * Sleep for a certain number of milliseconds
 */
 let wait =  (ms) => {
  return new Promise( res => setTimeout(res, ms))
}

module.exports = {
  wait: wait
}