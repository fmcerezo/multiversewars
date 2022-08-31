import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

export default function RecordsScreen(props) {
    document.title = "Multiverse wars - Records";

    return  <div className="container" style={{
                height: '100vh'
            }}>
                <div className="row h-75">
                    <div className="col-6 offset-3 rounded" style={{
                    backgroundColor: 'lightgrey',
                    border: '10px solid black'
                }}>
                        <h1 className="text-center">Records</h1>
                        <ol className="px-5 mx-5">
                        {props.records.map((record, index) => <li key={index + record.name}>{record.name} - {record.points}</li>)}
                        </ol>
                        <p className="mt-5 text-center"><Card.Link href="/">Play game</Card.Link></p>
                    </div>
                </div>
            </div>
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch("process.env.API_URL/api/v1/records?sortField=points&sortType=desc");
    const data = await res.json();
  
    // Pass data to the page via props
    return { props: data };
}