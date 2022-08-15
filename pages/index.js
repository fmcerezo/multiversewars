import 'bootstrap/dist/css/bootstrap.min.css';
import Game from '../classes/Game';

export async function getServerSideProps() {
    // Fetch data from external API
    /*const res = await fetch(`https://.../data`)
    const data = await res.json()*/
    const data = {
        enemies: [
            { name: "vampire", points: 1},
            { name: "demon", points: 2},
        ]    
    };
  
    // Pass data to the page via props
    return { props: { data } }
}

export default Game;