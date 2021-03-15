import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clubService } from '../services/clubService'
export default function Membership({ id, exp, isAdmin }) {

    const [currMembership, setCurrMembership] = useState(null)


    //Component did mount
    useEffect(() => {
        if (!currMembership) setMembership()
    })

    async function setMembership() {
        const membershipFromService = await clubService.getById(id)
        console.log('setMembership -> membershipFromService', membershipFromService)
        setCurrMembership(membershipFromService)
    }

    function getDate() {
        return new Date(exp).toLocaleDateString()
    }
    return (
        <React.Fragment>
            {currMembership && <div className="membership-container">
                <img src={currMembership.imageUrl} alt={currMembership.title} />
                <div className="membership-title">
                    <h3>
                        {currMembership.title}
                    </h3>
                    <h5>
                        {currMembership.subtitle}
                    </h5>
                </div>
                <div className="club-details">
                    <p>Expiration Date: {getDate()}</p>
                    {isAdmin && <p><Link to={`/control/${id}`}>Admin Panel </Link></p>}
                    <Link to="/schedule">Schedule </Link>
                </div>
            </div>}
        </React.Fragment>
    )
}
