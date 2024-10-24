import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';

function CustomTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent>22/10/2024 09:30 am</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Event One</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>14/06/2024 10:00 am</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Event Two</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>01/01/2024 11:00 am</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Event Three</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default CustomTimeline;
