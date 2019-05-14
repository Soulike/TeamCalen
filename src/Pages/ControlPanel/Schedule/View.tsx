import React from 'react';
import ScheduleOverview from './Components/ScheduleOverview';
import NewSchedulePanel from './Components/NewSchedulePanel';
import ControlPanelContent from '../../../Components/ControlPanelContent';

function Schedule()
{
    return (
        <ControlPanelContent midPartComponent={
            <ScheduleOverview />
        } rightPartComponent={
            <NewSchedulePanel />
        } />
    );
}

export default React.memo(Schedule);