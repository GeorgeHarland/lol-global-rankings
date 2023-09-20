'use client';

import React, { useState, useEffect } from 'react';
import TeamProfileContainer from '@/components/TeamProfileContainer';
import { getTeamData } from '@/services/teamServices';

const TeamPage = () => {
  return <TeamProfileContainer />;
};

export default TeamPage;
