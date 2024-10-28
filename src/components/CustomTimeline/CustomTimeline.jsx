import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';

function CustomTimeline({ logs }) {
  console.log(logs);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (logs.length === 0) {
    return <h2 className='text-center'>No activities yet</h2>;
  }

  return (
    <Timeline position="right">
      {logs.map((log, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent><b>{formatDate(log.created_at)}</b></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index < logs.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent><b>{`${log.user_name}`}</b> updated <q>{log.log_data}</q></TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default CustomTimeline;
