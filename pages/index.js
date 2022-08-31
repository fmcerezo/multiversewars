import 'bootstrap/dist/css/bootstrap.min.css';
import Game from '../classes/Game';

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch("process.env.API_URL/api/v1/characters");
    const data = await res.json();
  
    // Pass data to the page via props
    return { props: data };
}

export default Game;