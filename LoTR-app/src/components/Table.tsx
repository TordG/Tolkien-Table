import { iCharacter } from "../App";

interface IOwnProps {
  characters: Array<iCharacter>;
  handleSortClick: () => void;
  ascending: boolean;
  search: string;
  handleNameClick: (char: iCharacter) => void;
}

const checkIfKnown = (str: string) => {
  return str && !(str === "NaN") ? str : "Unknown";
};

const Table = ({
  characters,
  handleSortClick,
  ascending,
  search,
  handleNameClick,
}: IOwnProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={handleSortClick}>Name{ascending ? "▲" : "▼"}</th>
          <th>Race</th>
          <th>Gender</th>
          <th>wikiUrl</th>
          <th>Birth</th>
        </tr>
      </thead>
      <tbody>
        {characters
          .filter((character) => {
            return character.name.toLowerCase().includes(search);
          })
          .map((character) =>
            character.name !== "MINOR_CHARACTER" ? (
              <tr key={character._id}>
                <td onClick={() => handleNameClick(character)}>
                  {character.name}
                </td>
                <td>{checkIfKnown(character.race)}</td>
                <td>{checkIfKnown(character.gender)}</td>
                <td>
                  {character.wikiUrl ? (
                    <a href={character.wikiUrl}>
                      Learn more about {character.name} at LoTR Wiki
                    </a>
                  ) : (
                    `No wiki page for ${character.name}`
                  )}
                </td>
                <td>{checkIfKnown(character.birth)}</td>
              </tr>
            ) : null
          )}
      </tbody>
    </table>
  );
};

export default Table;
