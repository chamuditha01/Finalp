import React from 'react';
import './index.css'

function AutoRotatableCard({ numberOfAppointments }) {
    return (
        <div>
            <a href="/appoi" className="a7">
                <div className="auto-rotatable-card">{numberOfAppointments}</div>
            </a>
        </div>
    );
}

export default AutoRotatableCard;
