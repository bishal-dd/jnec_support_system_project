import React from 'react';
import './workercomp.css';

export default function WorkerComp() {
  return (
    <div id="container" className=''>
      <table className='table-container text-center
       bg-light'>
        <thead className='table-items p-2 text-center'>
        <tr>
          <th>SL No:</th>
          <th>Issues</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody> 
          <tr>
            <td>1</td>
            <td>Issue 1</td>
          <button type="checkbox" id="" value="" className='btn btn-primary mb-2 mt-2'>Solved</button>
          </tr>
          <tr>
            <td>2</td>
            <td>Issue 2</td>
          <button type="checkbox" id="" className='btn btn-primary mb-2' value="">Solved</button>
          </tr>
          <tr>
            <td>3</td>
            <td>Issue 3</td>
          <button type="checkbox" id="" className='btn btn-primary mb-2' value="">Solved</button>
          </tr>
          <tr>
            <td>4</td>
            <td>Issue 4</td>
          <button type="checkbox" id="" className='btn btn-primary mb-2' value="">Solved</button>
          
          </tr>
          <tr>
            <td>5</td>
            <td>Issue 5</td>
          <button type="checkbox" id="" className='btn btn-primary mb-2' value="">Solved</button>
          </tr>
          <tr>
            <td>6</td>
            <td>Issue 6</td>
          <button type="checkbox" id="" className='btn btn-primary mb-2' value="">Solved</button>
          </tr>
          <tr>
            <td>7</td>
            <td>Issue 7</td>
          <button type="checkbox" id="" className='btn btn-primary mb-2' value="">Solved</button>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

