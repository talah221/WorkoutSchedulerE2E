import React from 'react'

export default function Activity({ txt, numToShow, maxProgress, imgUrl, subtitle }) {
    return (
        <div className="new-activity">
            <img src={imgUrl} alt={txt} />
            <div className="activity-details">
                <h4>{txt}<span>{numToShow}</span></h4>
                <h5>{subtitle}</h5>
                <progress value={numToShow} title={numToShow} max={maxProgress} />
            </div>
        </div>
    )
}
