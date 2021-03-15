import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useStore } from 'react-redux'
import { useHistory } from 'react-router'
import Activity from '../cmps/Activity'

export default function Profile() {
    const history = useHistory()
    const store = useStore()
    const { loggedInUser } = store.getState().user
    const [futureClasses, setFutureClasses] = useState([])
    const [lastMonthClasses, setMonthClasses] = useState([])
    const [avgClasses, setAvgClasses] = useState(0)

    // onInit / componentDidMount:
    useEffect(() => {


        if (!loggedInUser){
            return history.push('/')
        }
        getFutureClasses()
        get30DayClasses()
        // getAverageClasses()
    }, [])


    function getFutureClasses() {
        const presentTimestamp = Date.now()
        const futureClasses = loggedInUser.allTimeClasses.filter(timestamp => timestamp > presentTimestamp)
        setFutureClasses(futureClasses)

    }
    function get30DayClasses() {
        const monthAgoTimestamp = Date.now() - 1000 * 60 * 60 * 24 * 30 // Returns month's ago timestamp.
        const lastMonthClasses = loggedInUser.allTimeClasses.filter(timestamp => timestamp > monthAgoTimestamp && timestamp < Date.now()) // Returns an array with Classes that scheduled between month ago till now.
        setMonthClasses(lastMonthClasses);

    }


    // Updates average classes per week : 
    useEffect(() => {
        const monthClasses = lastMonthClasses.length;
        const avgClasses = (monthClasses / 30) * 7
        setAvgClasses((avgClasses.toFixed(2)))
    }, [lastMonthClasses])

    return (
        <section>
            <div className="profile-page main-container">
                <div className="activity-container">
                    <h1 >My Activity</h1>
                    <div className="upcoming-classes">
                        <Activity txt='Upcoming Classes: ' numToShow={futureClasses.length}
                            maxProgress={futureClasses.length}
                            imgUrl={'https://cdn1.iconfinder.com/data/icons/business-office-41/64/x-33-512.png'}
                            subtitle='Future Scheduled Classes'
                        />
                    </div>
                    <div className="attended-classes">
                        <Activity txt='Attended Classes: ' numToShow={lastMonthClasses.length}
                            maxProgress={lastMonthClasses.length}
                            imgUrl={'https://cdn4.iconfinder.com/data/icons/settings-5/63/history-512.png'}
                            subtitle='Over the past 30 days'
                        />
                    </div>
                    <div className="avg-classes">
                        <Activity txt='Average Classes/Week: ' numToShow={avgClasses}
                            maxProgress={7}
                            imgUrl={'https://cdn3.iconfinder.com/data/icons/data-analytics-neon-vol-1/256/Average-512.png'}
                            subtitle='Over the past 30 days'
                        />
                    </div>
                </div>


            </div>
        </section>
    )
}
