import Api from '../api';

export default (redis, prefix) => {
  const team = new Api.Team(redis);
  const teamMembers = new Api.TeamMembersSet(redis);

  return [
    [
      'post',
      `${prefix}/addTeam`,
      (request) => team.set(request.body)
    ],
    [
      'get',
      `${prefix}/getTeam`,
      (request) => team.get(request.query)
    ],
    [
      'post',
      `${prefix}/addTeamMembers`,
      (request) => teamMembers.set(request.body)
    ],
    [
      'get',
      `${prefix}/getTeamMembers`,
      (request) => teamMembers.get(request.query)
    ]
  ];
};