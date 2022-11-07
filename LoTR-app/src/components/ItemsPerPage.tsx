interface IOwnProps {
  setDisplayLimit: (number: number) => void;
}

const ItemsPerPage = ({ setDisplayLimit }: IOwnProps) => {
  return (
    <div>
      <select
        onChange={(e) =>
          Number(e.target.value) > 0
            ? setDisplayLimit(Number(e.target.value))
            : null
        }
      >
        <option>10</option>
        <option>20</option>
      </select>
      &emsp;
    </div>
  );
};

export default ItemsPerPage;
