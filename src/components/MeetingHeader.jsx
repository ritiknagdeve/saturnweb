import React from 'react';
import HeaderTitle from './HeaderTitle';
import DateDisplay from './DateDisplay';
import ParticipantsList from './ParticipantsList';
import MeetingTypeTag from './MeetingTypeTag';
import SaveButton from './SaveButton';

const MeetingHeader = ({
  onSaveClick,
  participants,
  meetingTitle,
  meetingType
}) => (
  <div className="h-auto min-h-[68px] bg-white flex items-center justify-between flex-wrap sm:flex-nowrap px-2 sm:px-0">
    <div className="flex items-center flex-1 gap-2 overflow-x-auto pr-4 flex-wrap py-2" style={{ paddingLeft: '4rem' }}>
      <HeaderTitle title={meetingTitle} />
      <DateDisplay />
      <ParticipantsList participants={participants} />
      <MeetingTypeTag type={meetingType} />
    </div>
    <div className="px-4 py-2 w-full sm:w-auto flex justify-end">
      <SaveButton onClick={onSaveClick} />
    </div>
  </div>
);

export default MeetingHeader; 