export interface Coordinate {
  latitude: number
  longitude: number
}

const EARTH_RADIUS_IN_KILOMETERS = 6371
const DEGREES_TO_RADIANS = Math.PI / 180

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = from.latitude * DEGREES_TO_RADIANS
  const toRadian = to.latitude * DEGREES_TO_RADIANS

  const theta = from.longitude - to.longitude
  const radTheta = theta * DEGREES_TO_RADIANS

  const cosineDistance =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  return Math.acos(Math.min(Math.max(cosineDistance, -1), 1)) *
    EARTH_RADIUS_IN_KILOMETERS
}
