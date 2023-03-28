import React from 'react';
import "./checkcomp.css";

export default function CheckComp() {
  return (
    <div id="check-container">
      <form className='check-form text-center'>
      <h3 className=''>Check Status</h3>
      <label className=''>Ticket Number</label><br />
      <textarea id="ticket-number"name="ticket-number"
            rows="4"class="rounded-3"></textarea><br />
      <button className='btn btn-primary'>
        check
      </button>
      </form>
    </div>
  )
}
