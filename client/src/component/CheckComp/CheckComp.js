import React from 'react';
import "./checkcomp.css";

export default function CheckComp() {
  return (
    <div id="check-container">
      <form className='check-form text-center'>
      <h3 className=''>Check Status</h3>
      <label className='mb-2'>Ticket Number</label><br />
      <input id="ticket-number"name="ticket-number"
            rows="4"class="rounded-2 mb-2"></input>
      <div className='d-grid'>
      <button className='btn btn-primary'>
        check
      </button>
      </div>
      </form>
    </div>
  )
}
