const isUpdateAwailable = () => {
  return window.update
}

const handleUpdate = () => {
  window.update && window.update()
}

export { handleUpdate }
export default isUpdateAwailable
