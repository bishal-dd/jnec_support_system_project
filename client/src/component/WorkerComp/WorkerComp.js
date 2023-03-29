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
          <input type="checkbox" id="" value="" className=''/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>2</td>
            <td>Issue 2</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>3</td>
            <td>Issue 3</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>4</td>
            <td>Issue 4</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>5</td>
            <td>Issue 5</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>6</td>
            <td>Issue 6</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>7</td>
            <td>Issue 7</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>8</td>
            <td>Issue 8</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>9</td>
            <td>Issue 9</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
          <tr>
            <td>10</td>
            <td>Issue 10</td>
          <input type="checkbox" id="" value=""/>Solve
          <input type="checkbox" id="" value=""/> Not solve
          </tr>
        </tbody>
      </table>
    </div>
  )
}

