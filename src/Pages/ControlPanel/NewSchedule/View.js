import React from 'react';
import ControlPanelContainer from '../../../ComponentContainer/ControlPanelContainer';
import ScheduleOverview from './Components/ScheduleOverview';
import NewSchedulePanel from './Components/NewSchedulePanel';

function NewSchedule()
{
    return (
        <ControlPanelContainer midPartComponent={
            <ScheduleOverview />
        } rightPartComponent={
            <NewSchedulePanel />
        } />
    );
}

export default NewSchedule;