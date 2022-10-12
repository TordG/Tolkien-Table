interface IOwnProps {
  handleOnClick: (event: any) => void;
}

const Checkboxes = ({ handleOnClick }: IOwnProps) => {
  return (
    <div>
      <label>
        Filter options &emsp;
        <input type="checkbox" value="Elf" onClick={handleOnClick}></input>
        Elf
      </label>
      &emsp;
      <label>
        <input type="checkbox" value="Human" onClick={handleOnClick}></input>
        Human
      </label>
      &emsp;
      <label>
        <input type="checkbox" value="Hobbit" onClick={handleOnClick}></input>
        Hobbit
      </label>
      &emsp;
      <label>
        <input type="checkbox" value="Dwarf" onClick={handleOnClick}></input>
        Dwarf
      </label>
      &emsp;
      <label>
        <input
          type="checkbox"
          value="Uruk-hai,Orc"
          onClick={handleOnClick}
        ></input>
        Orc
      </label>
      &emsp;
    </div>
  );
};

export default Checkboxes;
