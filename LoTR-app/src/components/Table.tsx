import { iCharacter } from "../App";

interface IOwnProps {
  characters: Array<iCharacter>;
  handleSortClick: () => void;
  ascending: boolean;
  search: string;
  handleNameClick: (char: iCharacter) => void;
}

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
          .map((character) => (
            <tr key={character._id}>
              <td onClick={() => handleNameClick(character)}>
                {character.name}
              </td>
              <td>{character.race}</td>
              <td>{character.gender}</td>
              <td>
                {character.wikiUrl ? (
                  <a href={character.wikiUrl} target="_blank">
                    Learn more about {character.name} at LoTR Wiki
                  </a>
                ) : (
                  `No wiki page for ${character.name}`
                )}
              </td>
              <td>{character.birth}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
