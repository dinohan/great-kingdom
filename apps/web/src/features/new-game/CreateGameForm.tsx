function CreateGameForm() {
  return (
    <form>
      <label htmlFor="title">
        <span>Game name</span>
      </label>
      <input
        id="title"
        type="text"
        placeholder="Game name"
      />
    </form>
  )
}

export default CreateGameForm
