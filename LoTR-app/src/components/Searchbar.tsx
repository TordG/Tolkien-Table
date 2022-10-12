interface IOwnProps {
  handleSearchChange: (event: any) => void;
}
const Searchbar = ({ handleSearchChange }: IOwnProps) => {
  return (
    <div>
      <input onChange={handleSearchChange} placeholder="Search characters" />
    </div>
  );
};

export default Searchbar;
