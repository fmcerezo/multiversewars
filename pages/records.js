import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

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
        const res = await fetch(process.env.API_URL + `/api/v1/records?sortField=points&sortType=desc&page=${page}&perPage=${process.env.LIST_RECORDS_PER_PAGE}`);
        const data = await res.json();
        setRecords(data);
    }

    if (records != null) {
        const firstRecordPos = (page - 1) * process.env.LIST_RECORDS_PER_PAGE;

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

                            {records.records.result.map((record, index) => <li type="none" key={index + record.name}>{firstRecordPos + index + 1} {record.name} - {record.points}</li>)}
                            </ol>
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

                                initialPage={records.records.meta.currentPage - 1}
                                pageCount={records.records.meta.pageCount}
                                marginPagesDisplayed={3}
                                pageRangeDisplayed={2}
                                onPageChange={pageChangeHandler}
                            />
                            <p className="mt-5 text-center"><Card.Link href="/">Play game</Card.Link></p>
                        </div>
                    </div>
                </div>
    }
}