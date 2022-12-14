import Game from '../components/Game';

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(process.env.API_URL + "/api/v1/characters");
    const data = await res.json();
  
    // Pass data to the page via props
    return { props: { characters: data.characters.result } };
}

export default Game;