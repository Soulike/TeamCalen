import React from 'react';
import ControlPanelContainer from '../../../ComponentContainer/ControlPanelContainer';
import ScheduleOverview from './Components/ScheduleOverview';

function NewSchedule()
{
    return (
        <ControlPanelContainer midPartComponent={
            <ScheduleOverview />
        } rightPartComponent={null} />
    );
}

export default NewSchedule;