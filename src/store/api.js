// api.js

export async function fetchRoomDetailsFromAPI(roomId) {
  // Replace with your actual API endpoint
  const response = await fetch(`/api/rooms/${roomId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch room details for room ${roomId}`);
  }
  const data = await response.json();
  return {
    endpoints: data.endpoints
  };
}
