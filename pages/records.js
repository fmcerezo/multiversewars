import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ReactPaginate from 'react-paginate';
import RegisterController from "../controllers/RegisterController";

export default function RecordsScreen() {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(null);

    useEffect(() => {
        document.title = "Multiverse wars - Records";
        fetchRecords(page);
    }, [page]);

    const pageChangeHandler = (event) => {
        setPage(event.selected + 1);
    };

    async function fetchRecords(page) {
        const data = await RegisterController.fetch(page);
        setRecords(data);
    }

    if (records != null) {
        return  <div className="container" style={{
                    height: '100vh'
                }}>
                    <div className="row h-75">
                        <div className="col-6 offset-3 rounded" style={{
                        backgroundColor: 'lightgrey',
                        border: '10px solid black'
                    }}>
                            <h1 className="text-center">Records</h1>
                            <Records
                                meta={records.records.meta}
                                result={records.records.result}
                                page={page}
                                pageChangeHandler={pageChangeHandler}
                            />
                            <p className="mt-5 text-center"><Card.Link href="/">Play game</Card.Link></p>
                        </div>
                    </div>
                </div>
    }
}

function Records(props) {
    if (props.meta.totalCount > 0) {
        const firstRecordPos = (props.page - 1) * process.env.LIST_RECORDS_PER_PAGE;
        const showPagination = props.meta.totalCount > props.meta.perPage;

        return  <div>
                    <ol className="px-5 mx-5 my-5">
                        {props.result.map((record, index) =><li 
                                                                type="none" 
                                                                key={index + record.name}>
                                                                {firstRecordPos + index + 1} 
                                                                &nbsp;{record.name} - {record.points}
                                                            </li>)}
                    </ol>
                    {showPagination ? 
                    <ReactPaginate
                        containerClassName={'pagination justify-content-center'}
                        activeClassName={'active'}
                        previousLabel='&laquo;'
                        nextLabel='&raquo;'
                        breakLabel={'...'}
                        breakLinkClassName={'page-link'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}

                        initialPage={props.meta.currentPage - 1}
                        pageCount={props.meta.pageCount}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={2}
                        onPageChange={props.pageChangeHandler}
                    /> : ''}
                </div>;
    } else {
        return  <div className="my-5 text-center">No records yet. Be the first one!</div>;
    }
}