const mapping: Record<string, string> = {
  companies: 'company',
  music: 'music',
  rooms: 'room',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
