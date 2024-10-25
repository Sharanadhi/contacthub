import React from 'react';
import {  Stack, Chip } from '@mui/material';
import { FaAngleRight } from 'react-icons/fa';

function ContactStages({ currentStage }) {
  const stages = [
    { label: "New", color: "primary" },
    { label: "Open", color: "info" },
    { label: "In Progress", color: "secondary" },
    { label: "Open Deals", color: "warning" },
    { label: "Closed", color: "success" }
  ];

  const getChipColor = (stage) => {
    const stageIndex = stages.findIndex(s => s.label === stage);
    const currentStageIndex = stages.findIndex(s => s.label === currentStage);
    return stageIndex <= currentStageIndex ? stages[stageIndex].color : "default";
  };

  return (
      
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {stages.map((stage, index) => (
          <React.Fragment key={stage.label}>
            <Chip label={stage.label} color={getChipColor(stage.label)} size="small" />
            {index < stages.length - 1 && <FaAngleRight />}
          </React.Fragment>
        ))}
      </Stack>

  );
}

export default ContactStages;
